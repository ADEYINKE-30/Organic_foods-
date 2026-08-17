import type { Route } from './+types/about';
import { PageHeader } from '~/components/ui/PageHeader';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'About Us — FreshMart' }];
}

export default function AboutPage() {
  return (
    <section className="page-section">
      <div className="container-lg">
        <PageHeader
          title="About FreshMart"
          description="Your neighborhood organic grocery, delivered fresh."
          breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
        />
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="space-y-4 text-gray-600">
            <p className="text-lg leading-relaxed">
              FreshMart is your neighborhood organic grocery store, bringing farm-fresh produce,
              artisan breads, and quality pantry staples straight to your door.
            </p>
            <p className="leading-relaxed">
              We partner with local farmers and trusted suppliers to ensure every product meets our
              standards for freshness, sustainability, and taste.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { value: '14k+', label: 'Products' },
                { value: '50k+', label: 'Customers' },
                { value: '10+', label: 'Locations' },
              ].map((stat) => (
                <div key={stat.label} className="card p-4 text-center">
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <img
            src="/images/banner-image-1.jpg"
            alt="Fresh organic groceries"
            className="card h-full max-h-[480px] w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
