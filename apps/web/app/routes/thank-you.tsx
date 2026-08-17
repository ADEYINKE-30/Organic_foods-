import { Link } from 'react-router';
import type { Route } from './+types/thank-you';
import { Icon } from '~/components/icons/Icon';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Thank You — FreshMart' }];
}

export default function ThankYouPage() {
  return (
    <section className="page-section">
      <div className="container-lg mx-auto max-w-2xl text-center">
        <div className="card mx-auto max-w-lg px-6 py-12">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon id="check" width={36} height={36} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Thank you for your order!</h1>
          <p className="mt-4 text-gray-600">
            Your order has been placed successfully. You will receive a confirmation email shortly.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/orders" className="btn-primary">
              View orders
            </Link>
            <Link to="/products" className="btn-secondary">
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
