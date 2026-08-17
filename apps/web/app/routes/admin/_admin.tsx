import { Link, NavLink, Outlet } from 'react-router';
import type { Route } from './+types/_admin';

const links = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/admin/products', label: 'Products', icon: '🥦' },
  { to: '/admin/orders', label: 'Orders', icon: '📦' },
  { to: '/admin/customers', label: 'Customers', icon: '👥' },
  { to: '/admin/coupons', label: 'Coupons', icon: '🎟️' },
  { to: '/admin/newsletter', label: 'Newsletter', icon: '✉️' },
];

export function meta({}: Route.MetaArgs) {
  return [{ title: 'FreshMart Admin' }];
}

export default function AdminShell() {
  return (
    <div className="flex min-h-screen bg-[#F3F4F6]">
      <aside className="hidden w-64 shrink-0 flex-col bg-[#111827] text-white lg:flex">
        <div className="border-b border-white/10 px-5 py-5">
          <Link to="/admin/dashboard" className="block">
            <span className="text-lg font-bold tracking-tight text-white">FreshMart</span>
            <span className="mt-0.5 block text-xs font-medium uppercase tracking-wider text-emerald-400">
              Admin Console
            </span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <span aria-hidden>{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-white/10 p-4">
          <Link to="/" className="text-sm text-gray-400 hover:text-white">
            ← Back to storefront
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur">
          <div className="flex items-center justify-between gap-4 px-4 py-3 lg:px-8">
            <div className="flex items-center gap-3 lg:hidden">
              <Link to="/admin/dashboard" className="font-bold text-primary">
                FreshMart Admin
              </Link>
            </div>
            <p className="hidden text-sm text-gray-500 lg:block">
              Welcome back, Admin — manage store operations
            </p>
            <div className="flex items-center gap-2 overflow-x-auto lg:hidden">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="whitespace-nowrap rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Link
              to="/"
              className="hidden rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50 sm:inline-flex"
            >
              View store
            </Link>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
