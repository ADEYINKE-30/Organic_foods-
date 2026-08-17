import { Link, useNavigate } from 'react-router';
import type { Route } from './+types/account';
import { Icon } from '~/components/icons/Icon';
import { PageHeader } from '~/components/ui/PageHeader';
import { useAuthStore } from '~/store/auth.store';
import { useWishlistStore } from '~/store/wishlist.store';
import { useAddressStore } from '~/store/address.store';
import { mockOrders } from '~/lib/mock-data';
import { useCartStore } from '~/store/cart.store';
import { getAllProducts } from '~/lib/mock-data';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'My Account — FreshMart' }];
}

const nav = [
  { to: '/account', label: 'Overview', icon: 'user' as const },
  { to: '/orders', label: 'Orders', icon: 'package' as const },
  { to: '/account/wishlist', label: 'Wishlist', icon: 'heart' as const },
  { to: '/account/addresses', label: 'Addresses', icon: 'delivery' as const },
];

export default function AccountPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const addressCount = useAddressStore((s) => s.addresses.length);
  const addItem = useCartStore((s) => s.addItem);

  if (!isAuthenticated || !user) {
    return (
      <section className="page-section">
        <div className="container-lg mx-auto max-w-lg text-center">
          <div className="card px-6 py-12">
            <Icon id="user" width={40} height={40} className="mx-auto text-gray-400" />
            <h1 className="mt-4 text-2xl font-bold">Please sign in</h1>
            <p className="mt-2 text-gray-600">Access your orders, wishlist, and addresses.</p>
            <Link to="/auth/login" className="btn-primary mt-6 inline-flex">Login</Link>
          </div>
        </div>
      </section>
    );
  }

  function reorderLast() {
    const last = mockOrders[0];
    if (!last) return;
    getAllProducts().slice(0, last.items).forEach((p) => {
      addItem({ productId: p.id, name: p.name, price: p.price });
    });
    navigate('/cart');
  }

  return (
    <section className="page-section">
      <div className="container-lg">
        <PageHeader
          title="My Account"
          breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Account' }]}
        />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <nav className="card space-y-1 p-3">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-primary/10 hover:text-primary"
                >
                  <Icon id={item.icon} width={18} height={18} />
                  {item.label}
                </Link>
              ))}
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                onClick={() => {
                  logout();
                  navigate('/');
                }}
              >
                Log out
              </button>
            </nav>
          </aside>

          <div className="space-y-6 lg:col-span-9">
            <div className="card p-6">
              <p className="text-xl font-semibold text-gray-900">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-gray-600">{user.email}</p>
              <span className="status-badge status-delivered mt-3 inline-flex">Active member</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="card p-5">
                <p className="text-sm text-gray-500">Orders</p>
                <p className="mt-1 text-2xl font-bold">{mockOrders.length}</p>
              </div>
              <div className="card p-5">
                <p className="text-sm text-gray-500">Wishlist</p>
                <p className="mt-1 text-2xl font-bold">{wishlistCount}</p>
              </div>
              <div className="card p-5">
                <p className="text-sm text-gray-500">Addresses</p>
                <p className="mt-1 text-2xl font-bold">{addressCount}</p>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-gray-900">Quick reorder</h2>
                  <p className="text-sm text-gray-500">Add items from your last order in one click.</p>
                </div>
                <button type="button" className="btn-primary" onClick={reorderLast}>
                  Reorder last order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
