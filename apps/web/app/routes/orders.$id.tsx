import { Link } from 'react-router';
import type { Route } from './+types/orders.$id';
import { PageHeader } from '~/components/ui/PageHeader';
import { fetchOrder } from '~/lib/catalog';

export async function loader({ params }: Route.LoaderArgs) {
  const order = await fetchOrder(params.id);
  return { order };
}

export function meta({ loaderData }: Route.MetaArgs) {
  const order = loaderData?.order;
  return [{ title: order ? `Order ${order.id} — FreshMart` : 'Order — FreshMart' }];
}

export default function OrderDetailPage({ loaderData }: Route.ComponentProps) {
  const { order } = loaderData;

  if (!order) {
    return (
      <section className="page-section">
        <div className="container-lg text-center">
          <h1 className="text-3xl font-bold">Order not found</h1>
          <Link to="/orders" className="btn-primary mt-6 inline-flex">
            Back to orders
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="container-lg mx-auto max-w-2xl">
        <PageHeader
          title={`Order ${order.id}`}
          breadcrumbs={[
            { label: 'Home', to: '/' },
            { label: 'Orders', to: '/orders' },
            { label: order.id },
          ]}
        />
        <div className="card p-6">
          <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {[
              { label: 'Date', value: order.date },
              { label: 'Status', value: order.status },
              { label: 'Items', value: String(order.items) },
              { label: 'Total', value: `$${order.total.toFixed(2)}` },
            ].map((row) => (
              <div key={row.label}>
                <dt className="text-sm text-gray-500">{row.label}</dt>
                <dd className="mt-1 text-base font-semibold capitalize text-gray-900">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
