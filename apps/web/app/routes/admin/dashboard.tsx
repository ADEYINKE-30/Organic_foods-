import { Link } from 'react-router';
import type { Route } from './+types/dashboard';
import { getDashboardStats } from '~/lib/admin-data';
import { useAdminStore } from '~/store/admin.store';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Dashboard — FreshMart Admin' }];
}

export async function loader() {
  return getDashboardStats();
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    delivered: 'bg-emerald-100 text-emerald-700',
    shipped: 'bg-blue-100 text-blue-700',
    processing: 'bg-amber-100 text-amber-700',
    pending: 'bg-gray-100 text-gray-700',
    cancelled: 'bg-red-100 text-red-700',
  };
  return map[status] ?? map.pending;
}

export default function AdminDashboard({ loaderData }: Route.ComponentProps) {
  const orders = useAdminStore((s) => s.orders);
  const products = useAdminStore((s) => s.products);
  const { totalSales, totalOrders, totalCustomers, salesSeries } = loaderData;
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 8).length;
  const maxRevenue = Math.max(...salesSeries.map((p) => p.revenue), 1);

  const metrics = [
    { label: 'Total Sales', value: `$${totalSales.toLocaleString()}`, hint: '+12% vs last month', color: 'text-emerald-600' },
    { label: 'Total Orders', value: totalOrders, hint: `${orders.length} recent`, color: 'text-blue-600' },
    { label: 'Customers', value: totalCustomers, hint: 'Active buyers', color: 'text-violet-600' },
    { label: 'Low Stock', value: lowStock, hint: 'Needs restock', color: 'text-amber-600' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Store performance overview</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">{m.label}</p>
            <p className={`mt-2 text-3xl font-bold ${m.color}`}>{m.value}</p>
            <p className="mt-1 text-xs text-gray-400">{m.hint}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Revenue (30 days)</h2>
            <span className="text-xs text-gray-400">USD</span>
          </div>
          <div className="flex h-48 items-end gap-1">
            {salesSeries.map((point) => (
              <div key={point.date} className="group relative flex flex-1 flex-col items-center justify-end">
                <div
                  className="w-full rounded-t bg-emerald-500/80 transition-all group-hover:bg-emerald-600"
                  style={{ height: `${(point.revenue / maxRevenue) * 100}%`, minHeight: 4 }}
                  title={`${point.date}: $${point.revenue}`}
                />
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-gray-400">
            <span>{salesSeries[0]?.date}</span>
            <span>{salesSeries[salesSeries.length - 1]?.date}</span>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-semibold text-gray-900">Top selling</h2>
          <ul className="space-y-3">
            {products.slice(0, 5).map((product, i) => (
              <li key={product.id} className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-500">
                  {i + 1}
                </span>
                <img src={product.image} alt="" className="h-10 w-10 rounded-lg object-contain" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">{product.name}</p>
                  <p className="text-xs text-gray-500">${product.price.toFixed(2)} · Stock {product.stock}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="font-semibold text-gray-900">Recent orders</h2>
          <Link to="/admin/orders" className="text-sm font-medium text-emerald-600 hover:underline">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-5 py-3">Order</th>
                <th className="px-5 py-3">Customer</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="border-t border-gray-100">
                  <td className="px-5 py-3 font-medium">{order.id}</td>
                  <td className="px-5 py-3">{order.customer}</td>
                  <td className="px-5 py-3">{order.date}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusBadge(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 font-semibold">${order.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
