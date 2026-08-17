import { useState } from 'react';
import { Link } from 'react-router';
import type { Route } from './+types/products.$slug';
import { Icon } from '~/components/icons/Icon';
import { PageHeader } from '~/components/ui/PageHeader';
import { ProductGrid } from '~/components/product/ProductGrid';
import { StarRating } from '~/components/ui/StarRating';
import { fetchProduct, fetchRelatedProducts } from '~/lib/catalog';
import { useCartStore } from '~/store/cart.store';

export async function loader({ params }: Route.LoaderArgs) {
  const product = await fetchProduct(params.slug);
  if (!product) return { product: null, related: [] };
  const related = await fetchRelatedProducts(product);
  return { product, related };
}

export function meta({ loaderData }: Route.MetaArgs) {
  const product = loaderData?.product;
  return [{ title: product ? `${product.name} — FreshMart` : 'Product — FreshMart' }];
}

export default function ProductPage({ loaderData }: Route.ComponentProps) {
  const { product, related } = loaderData;
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <section className="page-section">
        <div className="container-lg text-center">
          <h1 className="text-3xl font-bold">Product not found</h1>
          <Link to="/products" className="btn-primary mt-6 inline-flex">
            Back to shop
          </Link>
        </div>
      </section>
    );
  }

  const gallery = [
    product.image,
    '/images/product-thumbnail-1.jpg',
    '/images/product-thumbnail-2.jpg',
    '/images/product-thumbnail-3.jpg',
  ];

  return (
    <section className="page-section">
      <div className="container-lg">
        <PageHeader
          title={product.name}
          breadcrumbs={[
            { label: 'Home', to: '/' },
            { label: 'Shop', to: '/products' },
            { label: product.name },
          ]}
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <div className="card overflow-hidden p-4">
              <img
                src={gallery[activeImage] ?? product.image}
                alt={product.name}
                className="mx-auto max-h-[420px] w-full object-contain"
              />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {gallery.map((src, index) => (
                <button
                  key={`${src}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`card overflow-hidden p-2 ${activeImage === index ? 'ring-2 ring-primary' : ''}`}
                >
                  <img src={src} alt="" className="h-20 w-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <StarRating reviewCount={product.reviewCount} />
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              <del className="text-lg text-gray-400">${product.comparePrice.toFixed(2)}</del>
              {product.discount && (
                <span className="rounded-full bg-danger/10 px-3 py-1 text-xs font-bold text-danger">
                  {product.discount}
                </span>
              )}
            </div>
            <p className="mt-5 leading-relaxed text-gray-600">
              Fresh organic product sourced from trusted farms. Perfect for everyday meals and healthy
              living. 100% quality guaranteed with fast doorstep delivery.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-xl border border-gray-300">
                <button
                  type="button"
                  className="qty-btn rounded-none border-0"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  <Icon id="minus" width={14} height={14} />
                </button>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                  className="w-14 border-x border-gray-300 bg-transparent py-2 text-center text-sm outline-none"
                />
                <button
                  type="button"
                  className="qty-btn rounded-none border-0"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  <Icon id="plus" width={14} height={14} />
                </button>
              </div>
              <button
                type="button"
                className="btn-primary-lg inline-flex flex-1 items-center justify-center gap-2 sm:flex-none"
                onClick={() =>
                  addItem(
                    { productId: product.id, name: product.name, price: product.price },
                    quantity,
                  )
                }
              >
                <Icon id="cart" width={18} height={18} />
                Add to Cart
              </button>
              <button type="button" className="icon-btn border border-gray-300" aria-label="Add to wishlist">
                <Icon id="heart" width={18} height={18} />
              </button>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="section-title mb-6">Related products</h2>
            <ProductGrid products={related} />
          </div>
        )}
      </div>
    </section>
  );
}
