import { FormEvent, useState } from 'react';
import type { Route } from './+types/coupons._index';
import { useAdminStore } from '~/store/admin.store';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Coupons — FreshMart Admin' }];
}

export default function AdminCouponsPage() {
  const coupons = useAdminStore((s) => s.coupons);
  const addCoupon = useAdminStore((s) => s.addCoupon);
  const toggleCoupon = useAdminStore((s) => s.toggleCoupon);
  const deleteCoupon = useAdminStore((s) => s.deleteCoupon);
  const [showForm, setShowForm] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    addCoupon({
      id: `cp-${Date.now()}`,
      code: String(form.get('code') ?? '').toUpperCase(),
      type: form.get('type') === 'fixed' ? 'fixed' : 'percentage',
      value: Number(form.get('value')),
      minOrder: Number(form.get('minOrder')),
      expiresAt: String(form.get('expiresAt')),
      usedCount: 0,
      usageLimit: Number(form.get('usageLimit')),
      isActive: true,
    });
    setShowForm(false);
  }

  async function copyCode(code: string) {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(code);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      setCopied(code);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Coupons</h1>
          <p className="text-sm text-gray-500">Create and manage discount codes</p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          + Create coupon
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {coupons.map((coupon) => (
          <div key={coupon.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-lg font-bold tracking-wide text-gray-900">{coupon.code}</p>
                <p className="mt-1 text-sm text-gray-500">
                  {coupon.type === 'percentage' ? `${coupon.value}% off` : `$${coupon.value} off`} · Min $
                  {coupon.minOrder}
                </p>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                  coupon.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
                }`}
              >
                {coupon.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <p className="mt-3 text-xs text-gray-400">
              Used {coupon.usedCount}/{coupon.usageLimit} · Expires {coupon.expiresAt}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => copyCode(coupon.code)}
                className="rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-gray-50"
              >
                {copied === coupon.code ? 'Copied!' : 'Copy code'}
              </button>
              <button
                type="button"
                onClick={() => toggleCoupon(coupon.id)}
                className="rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-gray-50"
              >
                {coupon.isActive ? 'Disable' : 'Enable'}
              </button>
              <button
                type="button"
                onClick={() => deleteCoupon(coupon.id)}
                className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form onSubmit={handleCreate} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold">Create coupon</h2>
            <div className="mt-4 space-y-3">
              <input name="code" required placeholder="Code e.g. FRESH20" className="w-full rounded-lg border px-3 py-2 uppercase" />
              <select name="type" className="w-full rounded-lg border px-3 py-2">
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed amount</option>
              </select>
              <input name="value" type="number" required placeholder="Value" className="w-full rounded-lg border px-3 py-2" />
              <input name="minOrder" type="number" defaultValue={50} placeholder="Min order" className="w-full rounded-lg border px-3 py-2" />
              <input name="usageLimit" type="number" defaultValue={100} placeholder="Usage limit" className="w-full rounded-lg border px-3 py-2" />
              <input name="expiresAt" type="date" required className="w-full rounded-lg border px-3 py-2" />
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border px-4 py-2 text-sm">
                Cancel
              </button>
              <button type="submit" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">
                Create
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
