import { useMemo, useState } from 'react';
import type { Route } from './+types/orders._index';
import { useAdminStore } from '~/store/admin.store';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Orders — FreshMart Admin' }];
}

const columns = [
  { key: 'pending', label: 'New', color: 'border-blue-300 bg-blue-50' },
  { key: 'processing', label: 'Processing', color: 'border-amber-300 bg-amber-50' },
  { key: 'shipped', label: 'Shipped', color: 'border-indigo-300 bg-indigo-50' },
  { key: 'delivered', label: 'Delivered', color: 'border-emerald-300 bg-emerald-50' },
  { key: 'cancelled', label: 'Cancelled', color: 'border-red-300 bg-red-50' },
] as const;

type Status = (typeof columns)[number]['key'];

const badge: Record<Status, string> = {
  pending: 'bg-blue-100 text-blue-700',
  processing: 'bg-amber-100 text-amber-700',
  shipped: 'bg-indigo-100 text-indigo-700',
  delivered: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default function AdminOrdersPage() {
  const orders = useAdminStore((s) => s.orders);
  const updateOrderStatus = useAdminStore((s) => s.updateOrderStatus);
  const [view, setView] = useState<'kanban' | 'table'>('kanban');
  const [selected, setSelected] = useState<string | null>(null);

  const selectedOrder = useMemo(
    () => orders.find((o) => o.id === selected) ?? null,
    [orders, selected],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-sm text-gray-500">Drag status updates via Kanban or edit in detail</p>
        </div>
        <div className="flex rounded-lg border border-gray-200 bg-white p-1">
          <button
            type="button"
            onClick={() => setView('kanban')}
            className={`rounded-md px-3 py-1.5 text-sm font-medium ${view === 'kanban' ? 'bg-emerald-600 text-white' : 'text-gray-600'}`}
          >
            Kanban
          </button>
          <button
            type="button"
            onClick={() => setView('table')}
            className={`rounded-md px-3 py-1.5 text-sm font-medium ${view === 'table' ? 'bg-emerald-600 text-white' : 'text-gray-600'}`}
          >
            Table
          </button>
        </div>
      </div>

      {view === 'kanban' ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-5">
          {columns.map((col) => {
            const items = orders.filter((o) => o.status === col.key);
            return (
              <div key={col.key} className={`min-h-[280px] rounded-xl border-2 border-dashed p-3 ${col.color}`}>
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-sm font-bold text-gray-800">{col.label}</h2>
                  <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold">{items.length}</span>
                </div>
                <div className="space-y-2">
                  {items.map((order) => (
                    <button
                      key={order.id}
                      type="button"
                      onClick={() => setSelected(order.id)}
                      className="w-full rounded-xl border border-gray-200 bg-white p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <p className="font-semibold text-gray-900">{order.id}</p>
                      <p className="mt-1 text-xs text-gray-500">{order.customer}</p>
                      <p className="mt-2 text-sm font-bold text-emerald-700">${order.total.toFixed(2)}</p>
                      <select
                        value={order.status}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as Status)}
                        className="mt-2 w-full rounded border border-gray-200 px-2 py-1 text-xs"
                      >
                        {columns.map((c) => (
                          <option key={c.key} value={c.key}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <button type="button" className="font-medium text-emerald-600 hover:underline" onClick={() => setSelected(order.id)}>
                      {order.id}
                    </button>
                  </td>
                  <td className="px-4 py-3">{order.customer}</td>
                  <td className="px-4 py-3">{order.date}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${badge[order.status as Status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold">${order.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold">{selectedOrder.id}</h2>
                <p className="text-sm text-gray-500">{selectedOrder.date}</p>
              </div>
              <button type="button" onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-700">
                ✕
              </button>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-gray-500">Customer</dt>
                <dd className="font-medium">{selectedOrder.customer}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Email</dt>
                <dd className="font-medium">{selectedOrder.email}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Items</dt>
                <dd className="font-medium">{selectedOrder.items}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Total</dt>
                <dd className="font-medium">${selectedOrder.total.toFixed(2)}</dd>
              </div>
            </dl>
            <div className="mt-5">
              <label className="mb-1 block text-sm font-medium">Update status</label>
              <select
                value={selectedOrder.status}
                onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value as Status)}
                className="w-full rounded-lg border px-3 py-2"
              >
                {columns.map((c) => (
                  <option key={c.key} value={c.key}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              className="mt-4 w-full rounded-lg border border-gray-300 py-2 text-sm font-medium hover:bg-gray-50"
              onClick={() => window.print()}
            >
              Print invoice
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
