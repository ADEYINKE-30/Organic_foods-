> **Self-Update Protocol:** AI agents MUST update this file after every significant change.
> Append a dated bullet to the `## Change Log` section at the bottom.

# 06 — Testing Strategy

## Test Layers

| Layer | Tool | Scope |
|---|---|---|
| Unit | Vitest | Services (isolated), validators, utilities |
| Integration | Vitest + Supertest | API endpoints against test DB |
| Type checking | tsc --noEmit | All packages |
| Lint | ESLint | All packages |

## Running Tests

```bash
pnpm typecheck         # TypeScript across all packages
pnpm lint              # ESLint across all packages
pnpm test              # All tests
pnpm test:unit         # Unit tests only
pnpm test:integration  # Integration tests only
pnpm test:watch        # Watch mode during development
```

## Test File Locations

```
apps/server/src/
  routes/__tests__/
    auth.test.ts
    products.test.ts
    cart.test.ts
    orders.test.ts
  services/__tests__/
    order.service.test.ts
    coupon.service.test.ts
    email.service.test.ts
packages/validators/src/__tests__/
  auth.test.ts
  product.test.ts
```

## Critical Test Cases (Must Pass Before Deploy)

### Auth Endpoints
- [ ] POST /auth/register — valid data creates user, returns 201
- [ ] POST /auth/register — duplicate email returns 409
- [ ] POST /auth/register — invalid email format returns 422
- [ ] POST /auth/register — password < 8 chars returns 422
- [ ] POST /auth/login — valid credentials return tokens
- [ ] POST /auth/login — wrong password returns 401
- [ ] POST /auth/login — nonexistent user returns 401
- [ ] POST /auth/forgot-password — valid email queues Brevo call
- [ ] POST /auth/reset-password — expired token returns 400
- [ ] Protected route — no token returns 401
- [ ] Protected route — expired token returns 401

### Product Endpoints
- [ ] GET /products — returns paginated list, excludes soft-deleted
- [ ] GET /products?category=X — filters by category
- [ ] GET /products?search=apple — full-text search works
- [ ] GET /products/:id — returns product with category
- [ ] GET /products/:id — nonexistent ID returns 404
- [ ] POST /products — admin creates product, returns 201
- [ ] POST /products — non-admin gets 403
- [ ] DELETE /products/:id — soft deletes (isDeleted=true)
- [ ] GET /products after soft delete — deleted item not in results

### Cart Endpoints
- [ ] POST /cart/add — adds item to cart
- [ ] POST /cart/add — out-of-stock product returns 400
- [ ] PATCH /cart/:itemId — updates quantity
- [ ] DELETE /cart/:itemId — removes item
- [ ] POST /cart/coupon — valid coupon applies discount
- [ ] POST /cart/coupon — expired coupon returns 400
- [ ] POST /cart/coupon — discount capped at 50% of subtotal

### Order Endpoints
- [ ] POST /orders/create — creates order, decrements stock, clears cart
- [ ] POST /orders/create — empty cart returns 400
- [ ] GET /orders — returns only authenticated user's orders
- [ ] GET /orders/:id — user cannot access other user's order (403)
- [ ] PATCH /orders/:id/status — admin can advance status
- [ ] PATCH /orders/:id/status — status regression returns 400
- [ ] POST /orders/:id/cancel — pending order can be cancelled
- [ ] POST /orders/:id/cancel — shipped order cannot be cancelled

### Business Rule Tests (orderService.test.ts)
- [ ] Coupon discount never exceeds 50% of subtotal
- [ ] Stock decrements only on order creation (not cart add)
- [ ] Price in order_items matches product price at order time (not current price)
- [ ] Order status machine: cannot skip states, cannot go backwards

## Mocking Templates

```typescript
// Mock Brevo in email tests
vi.mock('../services/email.service.js', () => ({
  sendOrderConfirmation: vi.fn().mockResolvedValue(undefined),
  sendPasswordReset: vi.fn().mockResolvedValue(undefined),
}));

// Mock Stripe in payment tests
vi.mock('stripe', () => ({
  default: vi.fn().mockImplementation(() => ({
    paymentIntents: {
      create: vi.fn().mockResolvedValue({ id: 'pi_test', client_secret: 'pi_test_secret' }),
    },
  })),
}));

// Mock Cloudinary in upload tests
vi.mock('cloudinary', () => ({
  v2: {
    uploader: {
      upload_stream: vi.fn().mockImplementation((opts, cb) => {
        cb(null, { secure_url: 'https://res.cloudinary.com/test/image.jpg' });
        return { end: vi.fn() };
      }),
    },
  },
}));
```

## Definition of Done (Per Feature)

A feature is complete when:
- [ ] All endpoint tests pass
- [ ] Business rule tests pass
- [ ] TypeScript compiles with zero errors
- [ ] ESLint reports zero errors
- [ ] STATE.md updated
- [ ] Change log updated
- [ ] UI matches original HTML design (for frontend)

## Change Log
- 2026-06-24 · Scaffolded by generate-specs.mjs
