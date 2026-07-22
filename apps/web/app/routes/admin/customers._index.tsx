import { useMemo, useState } from 'react';
import type { Route } from './+types/customers._index';
import { mockCustomers } from '~/lib/admin-data';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Customers — FreshMart Admin' }];
}

export default function AdminCustomersPage() {
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return mockCustomers.filter(
      (c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q),
    );
  }, [search]);

  const selected = mockCustomers.find((c) => c.id === selectedId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <p className="text-sm text-gray-500">{mockCustomers.length} registered customers</p>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or email..."
        className="w-full max-w-md rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500"
      />

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Orders</th>
              <th className="px-4 py-3">Total spent</th>
              <th className="px-4 py-3">Last order</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((customer) => (
              <tr
                key={customer.id}
                className="cursor-pointer border-t border-gray-100 hover:bg-gray-50"
                onClick={() => setSelectedId(customer.id)}
              >
                <td className="px-4 py-3 font-medium text-emerald-700">{customer.name}</td>
                <td className="px-4 py-3">{customer.email}</td>
                <td className="px-4 py-3">{customer.orders}</td>
                <td className="px-4 py-3 font-semibold">${customer.totalSpent.toFixed(2)}</td>
                <td className="px-4 py-3">{customer.lastOrder}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex justify-between">
              <h2 className="text-lg font-bold">{selected.name}</h2>
              <button type="button" onClick={() => setSelectedId(null)}>
                ✕
              </button>
            </div>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-gray-500">Email</dt>
                <dd className="font-medium">{selected.email}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Joined</dt>
                <dd className="font-medium">{selected.joined}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Orders</dt>
                <dd className="font-medium">{selected.orders}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Lifetime value</dt>
                <dd className="font-medium">${selected.totalSpent.toFixed(2)}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}
