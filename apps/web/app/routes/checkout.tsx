import { FormEvent, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import type { Route } from './+types/checkout';
import { useCartStore } from '~/store/cart.store';
import { useAddressStore } from '~/store/address.store';
import { useAdminStore } from '~/store/admin.store';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Checkout — FreshMart' }];
}

const steps = ['Cart', 'Shipping', 'Payment', 'Confirm'] as const;

export default function CheckoutPage() {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const clearCart = useCartStore((state) => state.clearCart);
  const addresses = useAddressStore((s) => s.addresses);
  const coupons = useAdminStore((s) => s.coupons);

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal' | 'cod'>('stripe');
  const [guest, setGuest] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');

  const defaultAddress = useMemo(
    () => addresses.find((a) => a.isDefault) ?? addresses[0],
    [addresses],
  );

  const shipping = totalPrice >= 50 ? 0 : 4.99;
  const grandTotal = Math.max(0, totalPrice - discount + shipping);

  function applyCoupon() {
    const found = coupons.find(
      (c) => c.code.toUpperCase() === couponCode.trim().toUpperCase() && c.isActive,
    );
    if (!found) {
      setCouponError('Invalid or expired coupon.');
      setDiscount(0);
      return;
    }
    if (totalPrice < found.minOrder) {
      setCouponError(`Minimum order $${found.minOrder} required.`);
      setDiscount(0);
      return;
    }
    setCouponError('');
    setDiscount(found.type === 'percentage' ? (totalPrice * found.value) / 100 : found.value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < 3) {
      setStep((s) => s + 1);
      return;
    }
    clearCart();
    navigate('/thank-you');
  }

  if (items.length === 0) {
    return (
      <section className="page-section">
        <div className="container-lg mx-auto max-w-lg text-center">
          <h1 className="text-3xl font-bold">No items to checkout</h1>
          <Link to="/products" className="btn-primary mt-6 inline-flex">Shop products</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#F9FAFB] py-8 md:py-12">
      <div className="container-lg max-w-5xl">
        <div className="mb-8 text-center">
          <Link to="/" className="font-heading text-xl font-bold text-primary">FreshMart</Link>
          <p className="mt-1 text-sm text-body">Secure checkout</p>
        </div>

        <ol className="mb-8 flex items-center justify-center gap-2 sm:gap-4">
          {steps.map((label, index) => {
            const n = index;
            const done = step > n || (n === 0 && step >= 1);
            const active = step === n || (n === 0 && step === 1);
            return (
              <li key={label} className="flex items-center gap-2">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                    done || active ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {done && n < step ? '✓' : n + 1}
                </span>
                <span className={`hidden text-sm font-medium sm:inline ${active ? 'text-primary' : 'text-gray-500'}`}>
                  {label}
                </span>
                {index < steps.length - 1 && <span className="mx-1 hidden h-px w-6 bg-gray-300 sm:block" />}
              </li>
            );
          })}
        </ol>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            {step === 1 && (
              <div className="card space-y-4 p-6">
                <h2 className="text-lg font-semibold">Shipping</h2>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={guest} onChange={(e) => setGuest(e.target.checked)} />
                  Checkout as guest
                </label>
                {defaultAddress && !guest ? (
                  <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm">
                    <p className="font-semibold">{defaultAddress.label}</p>
                    <p className="mt-1 text-body">
                      {defaultAddress.street}, {defaultAddress.city}, {defaultAddress.state}{' '}
                      {defaultAddress.postalCode}
                    </p>
                    <Link to="/account/addresses" className="mt-2 inline-block text-primary hover:underline">
                      Change address
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input required placeholder="First name" className="form-input" />
                    <input required placeholder="Last name" className="form-input" />
                    <input required type="email" placeholder="Email" className="form-input sm:col-span-2" />
                    <input required placeholder="Address" className="form-input sm:col-span-2" />
                    <input required placeholder="City" className="form-input" />
                    <input required placeholder="ZIP code" className="form-input" />
                  </div>
                )}
                <button type="submit" className="btn-primary-lg w-full">Continue to payment</button>
              </div>
            )}

            {step === 2 && (
              <div className="card space-y-4 p-6">
                <h2 className="text-lg font-semibold">Payment</h2>
                <div className="grid gap-3">
                  {(
                    [
                      ['stripe', 'Credit card (Stripe)'],
                      ['paypal', 'PayPal'],
                      ['cod', 'Cash on delivery'],
                    ] as const
                  ).map(([value, label]) => (
                    <label
                      key={value}
                      className={`card cursor-pointer p-4 ${paymentMethod === value ? 'ring-2 ring-primary' : ''}`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        className="mr-2"
                        checked={paymentMethod === value}
                        onChange={() => setPaymentMethod(value)}
                      />
                      {label}
                    </label>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button type="button" className="btn-secondary" onClick={() => setStep(1)}>Back</button>
                  <button type="submit" className="btn-primary-lg flex-1">Review order</button>
                </div>
              </div>
            )}

            {step >= 3 && (
              <div className="card space-y-4 p-6">
                <h2 className="text-lg font-semibold">Confirm order</h2>
                <p className="text-sm text-body">
                  Payment: <strong className="capitalize text-gray-900">{paymentMethod}</strong>
                  {guest ? ' · Guest checkout' : ''}
                </p>
                <ul className="divide-y divide-gray-100 text-sm">
                  {items.map((item) => (
                    <li key={item.productId} className="flex justify-between py-2">
                      <span>{item.name} × {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex gap-2">
                  <button type="button" className="btn-secondary" onClick={() => setStep(2)}>Back</button>
                  <button type="submit" className="btn-primary-lg flex-1">Place order · ${grandTotal.toFixed(2)}</button>
                </div>
              </div>
            )}
          </div>

          <aside className="lg:col-span-5">
            <div className="card sticky top-8 p-6">
              <h2 className="mb-4 text-lg font-semibold">Order summary</h2>
              <ul className="mb-4 max-h-48 space-y-2 overflow-y-auto text-sm">
                {items.map((item) => (
                  <li key={item.productId} className="flex justify-between">
                    <span className="pr-2 text-gray-700">{item.name} × {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="mb-3 flex gap-2">
                <input
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Coupon code"
                  className="form-input"
                />
                <button type="button" onClick={applyCoupon} className="btn-secondary shrink-0">
                  Apply
                </button>
              </div>
              {couponError && <p className="mb-2 text-xs text-red-500">{couponError}</p>}
              <div className="space-y-2 border-t border-gray-200 pt-4 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount</span><span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-gray-200 pt-3 text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </section>
  );
}
