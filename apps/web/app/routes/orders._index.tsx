import { Link } from 'react-router';
import type { Route } from './+types/orders._index';
import { PageHeader } from '~/components/ui/PageHeader';
import { fetchOrders } from '~/lib/catalog';
import type { OrderSummary } from '~/lib/mock-data';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Orders — FreshMart' }];
}

export async function loader() {
  const orders = await fetchOrders();
  return { orders };
}

function statusClass(status: OrderSummary['status']) {
  return `status-badge status-${status}`;
}

export default function OrdersPage({ loaderData }: Route.ComponentProps) {
  const { orders } = loaderData;

  return (
    <section className="page-section">
      <div className="container-lg">
        <PageHeader
          title="Order History"
          description="Track and review your past orders."
          breadcrumbs={[
            { label: 'Home', to: '/' },
            { label: 'Account', to: '/account' },
            { label: 'Orders' },
          ]}
        />
        <div className="table-shell">
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th className="hidden sm:table-cell">Items</th>
                  <th>Total</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="font-semibold text-gray-900">{order.id}</td>
                    <td>{order.date}</td>
                    <td>
                      <span className={statusClass(order.status)}>{order.status}</span>
                    </td>
                    <td className="hidden sm:table-cell">{order.items}</td>
                    <td className="font-semibold">${order.total.toFixed(2)}</td>
                    <td>
                      <Link to={`/orders/${order.id}`} className="text-sm font-semibold text-primary hover:underline">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
