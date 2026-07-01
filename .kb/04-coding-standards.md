> **Self-Update Protocol:** AI agents MUST update this file after every significant change.
> Append a dated bullet to the `## Change Log` section at the bottom.

# 04 — Coding Standards

## Layer Rules

| Layer | CAN | CANNOT |
|---|---|---|
| Route handler | Call services, return responses, use req/res | Business logic, direct DB queries |
| Service | Business logic, call Drizzle, call external APIs | Know about req/res, return HTTP status |
| Drizzle schema | Define tables, relations, types | Business logic |
| Middleware | Auth, validate, log | Database queries beyond user lookup |
| Frontend routes | Load data via loader, call API | Direct DB access |
| Frontend components | Render UI, call hooks | API calls directly (use hooks/queries) |

---

## Validation Pattern (Always Use This)

```typescript
// ✅ CORRECT — Zod schema in packages/validators, middleware in route
// packages/validators/src/product.ts
import { z } from 'zod';
export const createProductSchema = z.object({
  name: z.string().min(1).max(255),
  price: z.number().positive(),
  categoryId: z.string().uuid(),
  stockQuantity: z.number().int().min(0),
});

// apps/server/src/routes/products.ts
import { validate } from '../middleware/validate.js';
import { createProductSchema } from '@freshmart/validators';
router.post('/', adminMiddleware, validate(createProductSchema), async (req, res) => {
  const data = req.body; // already typed and validated
  const product = await productService.create(data);
  res.json({ success: true, data: product });
});

// ❌ WRONG — Manual validation, trusting req.body directly
router.post('/', async (req, res) => {
  if (!req.body.name) return res.status(400).json({ error: 'Name required' });
  const product = await db.insert(products).values(req.body); // NEVER trust raw body
});
```

---

## Error Handling Pattern

```typescript
// ✅ CORRECT — Throw AppError in service, catch in errorHandler middleware
// apps/server/src/lib/errors.ts
export class AppError extends Error {
  constructor(public code: string, public message: string, public statusCode: number) {
    super(message);
  }
}

// In service:
if (!product) throw new AppError('PRODUCT_NOT_FOUND', 'Product not found', 404);

// In errorHandler middleware:
if (err instanceof AppError) {
  return res.status(err.statusCode).json({
    success: false,
    error: { code: err.code, message: err.message }
  });
}

// ❌ WRONG — try/catch in every route, inconsistent error format
router.get('/:id', async (req, res) => {
  try {
    const product = await getProduct(req.params.id);
    if (!product) return res.status(404).json({ error: 'not found' }); // inconsistent
  } catch (e) {
    res.status(500).json({ error: 'Something went wrong' }); // useless
  }
});
```

---

## Drizzle Query Pattern

```typescript
// ✅ CORRECT — Use Drizzle ORM with proper typing
import { db } from '../config/db.js';
import { products, categories } from '@freshmart/db';
import { eq, and, ilike } from 'drizzle-orm';

const result = await db
  .select()
  .from(products)
  .leftJoin(categories, eq(products.categoryId, categories.id))
  .where(and(
    eq(products.isDeleted, false),
    ilike(products.name, `%${search}%`)
  ))
  .limit(12)
  .offset((page - 1) * 12);

// ❌ WRONG — Raw SQL string (bypasses type safety)
const result = await db.execute(`SELECT * FROM products WHERE name LIKE '%${search}%'`);
// ALSO WRONG — SQL injection risk above
```

---

## Authentication Pattern

```typescript
// ✅ CORRECT — Verify JWT in middleware before route handler
// apps/server/src/middleware/auth.ts
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ success: false, error: { code: 'NO_TOKEN' } });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    const user = await db.select().from(users).where(eq(users.id, payload.sub)).limit(1);
    if (!user[0]) return res.status(401).json({ success: false, error: { code: 'USER_NOT_FOUND' } });
    req.user = user[0];
    next();
  } catch {
    return res.status(401).json({ success: false, error: { code: 'INVALID_TOKEN' } });
  }
};

// ❌ WRONG — Skipping DB lookup after JWT verify
const payload = jwt.verify(token, secret);
req.user = payload; // WRONG: user might be deleted or role changed
next();
```

---

## Email Pattern (Brevo REST API Only)

```typescript
// ✅ CORRECT — Brevo REST API with fetch
// apps/server/src/services/email.service.ts
export async function sendOrderConfirmation(user: User, order: Order) {
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': process.env.BREVO_API_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: { email: process.env.BREVO_SENDER_EMAIL, name: process.env.BREVO_SENDER_NAME },
      to: [{ email: user.email, name: `${user.firstName} ${user.lastName}` }],
      subject: `Order Confirmed — #${order.orderNumber}`,
      htmlContent: buildOrderConfirmationHtml(order),
    }),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new AppError('EMAIL_FAILED', `Brevo error: ${JSON.stringify(err)}`, 500);
  }
}

// ❌ WRONG — Using nodemailer or any other email library
import nodemailer from 'nodemailer'; // FORBIDDEN in this project
```

---

## Cloudinary Image Upload Pattern

```typescript
// ✅ CORRECT — Upload via cloudinary SDK after multer temp storage
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

export async function uploadProductImage(buffer: Buffer, productId: string) {
  return new Promise<string>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: 'freshmart/products', public_id: productId, resource_type: 'image' },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve(result.secure_url);
      }
    ).end(buffer);
  });
}

// ❌ WRONG — Storing base64 image in database
product.imageData = req.body.imageBase64; // NEVER store images in DB
```

---

## Frontend Data Loading Pattern (React Router v7)

```typescript
// ✅ CORRECT — Use loader for server-side data
// apps/web/app/routes/products._index.tsx
import type { Route } from './+types/products._index';

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const page = url.searchParams.get('page') ?? '1';
  const data = await apiClient.get(`/products?page=${page}`);
  return { products: data.data, meta: data.meta };
}

export default function ProductsPage({ loaderData }: Route.ComponentProps) {
  const { products, meta } = loaderData;
  // render...
}

// ❌ WRONG — useEffect for data fetching in React Router v7
export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  useEffect(() => { fetch('/api/products').then(...) }, []); // WRONG pattern for RR v7
}
```

## Frontend Mutation Pattern (React Router v7)

```typescript
// ✅ CORRECT — useFetcher for cart add (no page navigation)
// components/product/ProductCard.tsx
import { useFetcher } from 'react-router';

export function ProductCard({ product }: { product: Product }) {
  const fetcher = useFetcher();
  const isAdding = fetcher.state !== 'idle';

  return (
    <div className="product-item">
      {/* ...product display... */}
      <fetcher.Form method="post" action="/cart/add">
        <input type="hidden" name="productId" value={product.id} />
        <input type="number" name="quantity" defaultValue={1} className="form-control border-dark-subtle input-number quantity" />
        <button type="submit" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart" disabled={isAdding}>
          <svg width="18" height="18"><use href="#cart" /></svg>
          {isAdding ? 'Adding...' : 'Add to Cart'}
        </button>
      </fetcher.Form>
    </div>
  );
}

// ✅ CORRECT — Form for navigation mutations (checkout, login)
import { Form } from 'react-router';

export default function LoginPage() {
  return (
    <Form method="post">
      <input type="email" name="email" />
      <input type="password" name="password" />
      <button type="submit">Login</button>
    </Form>
  );
}

// ❌ WRONG — axios/fetch calls in component event handlers
function LoginPage() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/auth/login', { email, password }); // WRONG
  };
}
```

## ProductCard Component Structure

The product card HTML from the template must be reproduced exactly in `ProductCard.tsx`:

```typescript
// ✅ CORRECT — matches .product-item HTML structure exactly
export function ProductCard({ product }: { product: Product }) {
  const fetcher = useFetcher();
  
  return (
    <div className="col">
      <div className="product-item">
        <figure>
          <Link to={`/products/${product.slug}`} title={product.name}>
            <img src={product.images[0]} alt={product.name} className="tab-image" />
          </Link>
        </figure>
        <div className="d-flex flex-column text-center">
          <h3 className="fs-6 fw-normal">{product.name}</h3>
          <div>
            <StarRating rating={product.ratingAvg} />
            <span>({product.ratingCount})</span>
          </div>
          <div className="d-flex justify-content-center align-items-center gap-2">
            {product.comparePrice && <del>${product.comparePrice.toFixed(2)}</del>}
            <span className="text-dark fw-semibold">${product.price.toFixed(2)}</span>
            {product.comparePrice && (
              <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">
                {Math.round((1 - product.price / product.comparePrice) * 100)}% OFF
              </span>
            )}
          </div>
          <div className="button-area p-3 pt-0">
            <fetcher.Form method="post" action="/cart/add">
              <input type="hidden" name="productId" value={product.id} />
              <div className="row g-1 mt-2">
                <div className="col-3">
                  <input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue={1} min={1} max={99} />
                </div>
                <div className="col-7">
                  <button type="submit" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart">
                    <svg width="18" height="18"><use href="#cart" /></svg> Add to Cart
                  </button>
                </div>
                <div className="col-2">
                  {/* wishlist button */}
                </div>
              </div>
            </fetcher.Form>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## Naming Conventions

| Item | Convention | Example |
|---|---|---|
| Files | kebab-case | `product.service.ts` |
| Components | PascalCase | `ProductCard.tsx` |
| Functions | camelCase | `createOrder()` |
| DB tables | snake_case | `order_items` |
| Env vars | SCREAMING_SNAKE | `STRIPE_SECRET_KEY` |
| Zod schemas | camelCase + Schema suffix | `createProductSchema` |
| Routes (Express) | kebab-case | `/api/cart-items` |
| Routes (React Router) | dot notation | `products.$slug.tsx` |

## HTTP Status Code Rules

| Situation | Status |
|---|---|
| Success with data | 200 |
| Resource created | 201 |
| No content (delete) | 204 |
| Validation error | 422 |
| Unauthorized (no token) | 401 |
| Forbidden (wrong role) | 403 |
| Not found | 404 |
| Conflict (duplicate email) | 409 |
| Server error | 500 |

## Change Log
- 2026-06-24 · Scaffolded by generate-specs.mjs
- 2026-06-24 · Added React Router v7 mutation pattern, useFetcher pattern, ProductCard component structure
