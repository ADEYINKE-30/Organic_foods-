import { Link } from 'react-router';
import type { Route } from './+types/category.$slug';
import { EmptyState } from '~/components/ui/EmptyState';
import { PageHeader } from '~/components/ui/PageHeader';
import { ProductGrid } from '~/components/product/ProductGrid';
import { fetchCategory, fetchProductsByCategory } from '~/lib/catalog';

export async function loader({ params }: Route.LoaderArgs) {
  const category = await fetchCategory(params.slug);
  const products = category ? await fetchProductsByCategory(category.slug) : [];
  return { category, products };
}

export function meta({ loaderData }: Route.MetaArgs) {
  const category = loaderData?.category;
  return [{ title: category ? `${category.name} — FreshMart` : 'Category — FreshMart' }];
}

export default function CategoryPage({ loaderData }: Route.ComponentProps) {
  const { category, products } = loaderData;

  if (!category) {
    return (
      <section className="page-section">
        <div className="container-lg text-center">
          <h1 className="text-3xl font-bold">Category not found</h1>
          <Link to="/products" className="btn-primary mt-6 inline-flex">
            Back to shop
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="container-lg">
        <PageHeader
          title={category.name}
          description={`${products.length} fresh organic products in this category.`}
          breadcrumbs={[
            { label: 'Home', to: '/' },
            { label: 'Shop', to: '/products' },
            { label: category.name },
          ]}
        />

        <div className="card mb-8 flex flex-col items-center gap-4 p-6 text-center sm:flex-row sm:text-left">
          <img
            src={category.image}
            alt={category.name}
            className="h-24 w-24 rounded-full object-cover ring-4 ring-primary/10"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{category.name}</h2>
            <p className="mt-1 text-gray-600">Hand-picked organic items delivered fresh to your door.</p>
          </div>
        </div>

        {products.length === 0 ? (
          <EmptyState
            title="No products in this category yet"
            description="Check back soon or browse our full shop."
            action={
              <Link to="/products" className="btn-primary">
                Browse all products
              </Link>
            }
          />
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </section>
  );
}
