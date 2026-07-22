import { Link } from 'react-router';
import type { ReactNode } from 'react';

interface Breadcrumb {
  label: string;
  to?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: ReactNode;
  center?: boolean;
}

export function PageHeader({ title, description, breadcrumbs, actions, center }: PageHeaderProps) {
  return (
    <div className={`page-header mb-8 ${center ? 'text-center' : ''}`}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="mb-3 flex flex-wrap items-center gap-2 text-sm text-gray-500" aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, index) => (
            <span key={`${crumb.label}-${index}`} className="flex items-center gap-2">
              {index > 0 && <span className="text-gray-300">/</span>}
              {crumb.to ? (
                <Link to={crumb.to} className="hover:text-primary">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-gray-700">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="section-title">{title}</h1>
          {description && <p className="mt-2 max-w-2xl text-gray-600">{description}</p>}
        </div>
        {actions}
      </div>
    </div>
  );
}
