import { Link } from 'react-router';
import { Icon } from '~/components/icons/Icon';
import { Offcanvas } from '~/components/ui/Offcanvas';
import { useCartStore } from '~/store/cart.store';

interface CartOffcanvasProps {
  open: boolean;
  onClose: () => void;
}

export function CartOffcanvas({ open, onClose }: CartOffcanvasProps) {
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  return (
    <Offcanvas
      position="end"
      open={open}
      onClose={onClose}
      headerClassName="justify-content-between"
      title={
        <div className="flex items-center gap-2">
          <Icon id="cart" width={20} height={20} className="text-primary" />
          <h4 className="text-lg font-semibold text-gray-900">Your Cart</h4>
          {items.length > 0 && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
              {items.length}
            </span>
          )}
        </div>
      }
    >
      {items.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center py-10 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <Icon id="shopping-bag" width={28} height={28} className="text-gray-400" />
          </div>
          <p className="font-medium text-gray-900">Your cart is empty</p>
          <p className="mt-1 text-sm text-gray-500">Add fresh organic products to get started.</p>
          <Link to="/products" onClick={onClose} className="btn-primary mt-6">
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="flex h-full flex-col">
          <ul className="flex-1 space-y-3 overflow-y-auto pr-1">
            {items.map((item) => (
              <li key={item.productId} className="card flex gap-3 p-3">
                <div className="min-w-0 flex-1">
                  <h6 className="truncate font-medium text-gray-900">{item.name}</h6>
                  <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      <Icon id="minus" width={14} height={14} />
                    </button>
                    <span className="min-w-6 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <Icon id="plus" width={14} height={14} />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    type="button"
                    className="mt-2 text-xs text-red-500 hover:underline"
                    onClick={() => removeItem(item.productId)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 border-t border-gray-200 pt-4">
            <div className="mb-4 flex items-center justify-between text-lg font-semibold">
              <span>Total</span>
              <span className="text-primary">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="grid gap-2">
              <Link to="/checkout" onClick={onClose} className="btn-primary w-full py-3 text-center">
                Checkout
              </Link>
              <Link
                to="/cart"
                onClick={onClose}
                className="block w-full rounded-lg border border-gray-300 py-3 text-center text-sm font-medium hover:bg-gray-50"
              >
                View cart
              </Link>
            </div>
          </div>
        </div>
      )}
    </Offcanvas>
  );
}
