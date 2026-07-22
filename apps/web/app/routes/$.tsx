import { Link } from 'react-router';
import type { Route } from './+types/$';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Page Not Found — FreshMart' }];
}

export default function NotFound() {
  return (
    <section className="page-section">
      <div className="container-lg text-center">
        <div className="card mx-auto max-w-lg px-6 py-16">
          <p className="text-7xl font-bold text-primary">404</p>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Page not found</h1>
          <p className="mt-2 text-gray-600">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link to="/" className="btn-primary-lg mt-8 inline-flex">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
