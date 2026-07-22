import { Link } from 'react-router';
import type { Route } from './+types/deals';
import { PageHeader } from '~/components/ui/PageHeader';
import { ProductGrid } from '~/components/product/ProductGrid';
import { getAdminProducts } from '~/lib/admin-data';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Flash Deals — FreshMart' }];
}

export async function loader() {
  return { deals: getAdminProducts().filter((p) => p.saleEndsAt) };
}

export default function DealsPage({ loaderData }: Route.ComponentProps) {
  return (
    <section className="page-section">
      <div className="container-lg">
        <PageHeader
          title="Flash Deals"
          description="Limited-time organic savings — shop before the timer runs out."
          breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Deals' }]}
        />
        {loaderData.deals.length === 0 ? (
          <div className="card p-10 text-center">
            <p>No active deals right now.</p>
            <Link to="/products" className="btn-primary mt-4 inline-flex">
              Browse shop
            </Link>
          </div>
        ) : (
          <ProductGrid products={loaderData.deals} />
        )}
      </div>
    </section>
  );
}
