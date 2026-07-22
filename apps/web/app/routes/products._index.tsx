/** Enhanced shop listing with mature filters */
import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import type { Route } from './+types/products._index';
import { EmptyState } from '~/components/ui/EmptyState';
import { PageHeader } from '~/components/ui/PageHeader';
import { ProductGrid } from '~/components/product/ProductGrid';
import { fetchCategories, fetchProducts } from '~/lib/catalog';
import { getAdminProducts } from '~/lib/admin-data';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Shop — FreshMart' }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const search = url.searchParams.get('q') ?? '';
  const category = url.searchParams.get('category') ?? 'all';
  const [categories, products] = await Promise.all([
    fetchCategories(),
    fetchProducts({ search, category }),
  ]);
  const enriched = getAdminProducts().filter((p) => products.some((x) => x.id === p.id));
  return { categories, products: enriched.length ? enriched : products, search, category };
}

export default function ProductsPage({ loaderData }: Route.ComponentProps) {
  const [, setSearchParams] = useSearchParams();
  const { categories, products, search, category } = loaderData;
  const [sort, setSort] = useState('popular');
  const [maxPrice, setMaxPrice] = useState(100);
  const [organicOnly, setOrganicOnly] = useState(false);
  const [veganOnly, setVeganOnly] = useState(false);
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filtered = useMemo(() => {
    let list = [...products].filter((p) => {
      const priceOk = p.price <= maxPrice;
      const organicOk = !organicOnly || ('isOrganic' in p ? p.isOrganic : true);
      const veganOk = !veganOnly || ('isVegan' in p ? p.isVegan : false);
      return priceOk && organicOk && veganOk;
    });
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'newest') list.reverse();
    return list;
  }, [products, maxPrice, organicOnly, veganOnly, sort]);

  return (
    <section className="page-section">
      <div className="container-lg">
        <PageHeader
          title="Shop"
          description="Browse our curated selection of fresh organic groceries."
          breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Shop' }]}
        />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <aside className="xl:col-span-3">
            <div className="filter-card space-y-5">
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              <div>
                <label className="form-label" htmlFor="search">Search</label>
                <input
                  id="search"
                  type="search"
                  defaultValue={search}
                  placeholder="Search products..."
                  className="form-input"
                  onChange={(e) => {
                    const params = new URLSearchParams();
                    if (e.target.value) params.set('q', e.target.value);
                    if (category !== 'all') params.set('category', category);
                    setSearchParams(params);
                  }}
                />
              </div>
              <div>
                <label className="form-label" htmlFor="category">Category</label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => {
                    const params = new URLSearchParams();
                    if (search) params.set('q', search);
                    if (e.target.value !== 'all') params.set('category', e.target.value);
                    setSearchParams(params);
                  }}
                  className="form-input"
                >
                  <option value="all">All Categories</option>
                  {categories.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">Max price: ${maxPrice}</label>
                <input
                  type="range"
                  min={5}
                  max={100}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={organicOnly} onChange={(e) => setOrganicOnly(e.target.checked)} />
                Organic only
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={veganOnly} onChange={(e) => setVeganOnly(e.target.checked)} />
                Vegan
              </label>
            </div>
          </aside>

          <div className="xl:col-span-9">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">{filtered.length}</span> items
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                >
                  <option value="popular">Popularity</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
                <div className="flex rounded-lg border border-gray-200 p-1">
                  <button type="button" onClick={() => setView('grid')} className={`rounded px-2 py-1 text-xs font-medium ${view === 'grid' ? 'bg-primary text-white' : ''}`}>Grid</button>
                  <button type="button" onClick={() => setView('list')} className={`rounded px-2 py-1 text-xs font-medium ${view === 'list' ? 'bg-primary text-white' : ''}`}>List</button>
                </div>
              </div>
            </div>

            {filtered.length === 0 ? (
              <EmptyState
                title="No products found"
                description="Try adjusting your search or filters."
                action={<Link to="/products" className="btn-primary">Clear filters</Link>}
              />
            ) : view === 'grid' ? (
              <ProductGrid products={filtered} />
            ) : (
              <div className="space-y-3">
                {filtered.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${product.slug}`}
                    className="card flex items-center gap-4 p-4 hover:shadow-md"
                  >
                    <img src={product.image} alt={product.name} className="h-20 w-20 object-contain" />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-500 capitalize">{product.categorySlug.replace(/-/g, ' ')}</p>
                    </div>
                    <p className="font-bold text-primary">${product.price.toFixed(2)}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
