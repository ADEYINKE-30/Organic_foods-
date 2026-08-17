import type { Route } from './+types/newsletter._index';
import { mockSubscribers } from '~/lib/admin-data';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Newsletter — FreshMart Admin' }];
}

export default function AdminNewsletterPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Newsletter</h1>
        <p className="text-sm text-gray-500">{mockSubscribers.length} subscribers</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Subscribed</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockSubscribers.map((sub) => (
              <tr key={sub.id} className="border-t border-gray-100">
                <td className="px-4 py-3 font-medium">{sub.email}</td>
                <td className="px-4 py-3">{sub.subscribedAt}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
