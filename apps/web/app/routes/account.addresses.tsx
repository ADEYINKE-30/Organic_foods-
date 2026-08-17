import { FormEvent, useState } from 'react';
import { Link } from 'react-router';
import type { Route } from './+types/account.addresses';
import { PageHeader } from '~/components/ui/PageHeader';
import { useAddressStore } from '~/store/address.store';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Addresses — FreshMart' }];
}

export default function AddressesPage() {
  const addresses = useAddressStore((s) => s.addresses);
  const addAddress = useAddressStore((s) => s.addAddress);
  const removeAddress = useAddressStore((s) => s.removeAddress);
  const setDefault = useAddressStore((s) => s.setDefault);
  const [showForm, setShowForm] = useState(false);

  function handleAdd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    addAddress({
      label: String(form.get('label') ?? 'Home'),
      street: String(form.get('street') ?? ''),
      city: String(form.get('city') ?? ''),
      state: String(form.get('state') ?? ''),
      postalCode: String(form.get('postalCode') ?? ''),
      country: String(form.get('country') ?? 'USA'),
      isDefault: form.get('isDefault') === 'on',
    });
    setShowForm(false);
  }

  return (
    <section className="page-section">
      <div className="container-lg mx-auto max-w-3xl">
        <PageHeader
          title="Address book"
          description="Save delivery locations for faster checkout."
          breadcrumbs={[
            { label: 'Home', to: '/' },
            { label: 'Account', to: '/account' },
            { label: 'Addresses' },
          ]}
          actions={
            <button type="button" className="btn-primary" onClick={() => setShowForm(true)}>
              + Add address
            </button>
          }
        />

        <div className="space-y-4">
          {addresses.map((address) => (
            <div key={address.id} className="card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{address.label}</h3>
                    {address.isDefault && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-body">
                    {address.street}<br />
                    {address.city}, {address.state} {address.postalCode}<br />
                    {address.country}
                  </p>
                </div>
                <div className="flex gap-2">
                  {!address.isDefault && (
                    <button type="button" className="text-sm font-medium text-primary" onClick={() => setDefault(address.id)}>
                      Set default
                    </button>
                  )}
                  <button type="button" className="text-sm text-red-500" onClick={() => removeAddress(address.id)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-sm">
          <Link to="/account" className="text-primary hover:underline">← Back to account</Link>
        </p>

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <form onSubmit={handleAdd} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
              <h2 className="text-lg font-bold">New address</h2>
              <div className="mt-4 space-y-3">
                <input name="label" placeholder="Label (Home, Office)" required className="form-input" />
                <input name="street" placeholder="Street" required className="form-input" />
                <div className="grid grid-cols-2 gap-3">
                  <input name="city" placeholder="City" required className="form-input" />
                  <input name="state" placeholder="State" required className="form-input" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input name="postalCode" placeholder="ZIP" required className="form-input" />
                  <input name="country" placeholder="Country" defaultValue="USA" className="form-input" />
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="isDefault" /> Set as default
                </label>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Save</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
