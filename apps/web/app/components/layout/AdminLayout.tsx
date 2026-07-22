import { Link } from 'react-router';
import type { ReactNode } from 'react';

const adminLinks = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/products', label: 'Products' },
  { to: '/admin/orders', label: 'Orders' },
  { to: '/admin/users', label: 'Users' },
];

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
          <Link to="/admin/dashboard" className="text-xl font-bold text-primary">
            FreshMart Admin
          </Link>
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-primary">
            ← View store
          </Link>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-12 lg:px-8">
        <aside className="lg:col-span-3">
          <nav className="card p-3">
            <ul className="space-y-1">
              {adminLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="block rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className="lg:col-span-9">
          <h1 className="mb-6 text-2xl font-bold text-gray-900">{title}</h1>
          {children}
        </main>
      </div>
    </div>
  );
}
