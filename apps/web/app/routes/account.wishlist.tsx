import { Link } from 'react-router';
import type { Route } from './+types/account.wishlist';
import { PageHeader } from '~/components/ui/PageHeader';
import { EmptyState } from '~/components/ui/EmptyState';
import { useWishlistStore } from '~/store/wishlist.store';
import { useCartStore } from '~/store/cart.store';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Wishlist — FreshMart' }];
}

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);
  const removeItem = useWishlistStore((s) => s.removeItem);
  const addItem = useCartStore((s) => s.addItem);

  return (
    <section className="page-section">
      <div className="container-lg">
        <PageHeader
          title="Wishlist"
          description="Products you've saved for later."
          breadcrumbs={[
            { label: 'Home', to: '/' },
            { label: 'Account', to: '/account' },
            { label: 'Wishlist' },
          ]}
        />
        {items.length === 0 ? (
          <EmptyState
            title="Your wishlist is empty"
            description="Tap the heart on any product to save it here."
            action={<Link to="/products" className="btn-primary">Browse products</Link>}
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div key={item.productId} className="card p-4">
                <Link to={`/products/${item.slug}`}>
                  <img src={item.image} alt={item.name} className="mx-auto h-32 object-contain" />
                  <h3 className="mt-3 font-semibold text-gray-900">{item.name}</h3>
                </Link>
                <p className="mt-1 font-bold text-primary">${item.price.toFixed(2)}</p>
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    className="btn-primary flex-1 text-sm"
                    onClick={() =>
                      addItem({ productId: item.productId, name: item.name, price: item.price })
                    }
                  >
                    Add to cart
                  </button>
                  <button
                    type="button"
                    className="btn-secondary text-sm"
                    onClick={() => removeItem(item.productId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
