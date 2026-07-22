import { Link } from 'react-router';
import type { Route } from './+types/cart';
import { EmptyState } from '~/components/ui/EmptyState';
import { Icon } from '~/components/icons/Icon';
import { PageHeader } from '~/components/ui/PageHeader';
import { useCartStore } from '~/store/cart.store';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Cart — FreshMart' }];
}

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <section className="page-section">
      <div className="container-lg">
        <PageHeader
          title="Shopping Cart"
          description="Review your items before checkout."
          breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Cart' }]}
        />

        {items.length === 0 ? (
          <EmptyState
            title="Your cart is empty"
            description="Discover fresh organic groceries and add them to your cart."
            action={
              <Link to="/products" className="btn-primary">
                Continue shopping
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
            <div className="xl:col-span-8">
              <div className="table-shell">
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th className="hidden sm:table-cell">Price</th>
                      <th>Qty</th>
                      <th>Subtotal</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.productId}>
                        <td className="font-medium text-gray-900">{item.name}</td>
                        <td className="hidden sm:table-cell">${item.price.toFixed(2)}</td>
                        <td>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              className="qty-btn"
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              aria-label="Decrease quantity"
                            >
                              <Icon id="minus" width={12} height={12} />
                            </button>
                            <span className="min-w-6 text-center text-sm">{item.quantity}</span>
                            <button
                              type="button"
                              className="qty-btn"
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              aria-label="Increase quantity"
                            >
                              <Icon id="plus" width={12} height={12} />
                            </button>
                          </div>
                        </td>
                        <td className="font-semibold">${(item.price * item.quantity).toFixed(2)}</td>
                        <td>
                          <button
                            type="button"
                            className="text-sm text-red-500 hover:underline"
                            onClick={() => removeItem(item.productId)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <aside className="xl:col-span-4">
              <div className="card sticky top-28 p-6">
                <h2 className="mb-4 text-lg font-semibold">Order summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-primary">Free</span>
                  </div>
                </div>
                <div className="my-4 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                <Link to="/checkout" className="btn-primary-lg block w-full text-center">
                  Proceed to checkout
                </Link>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
