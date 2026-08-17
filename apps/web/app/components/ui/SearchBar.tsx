import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Icon } from '~/components/icons/Icon';
import { getAllProducts, type Category, type Product } from '~/lib/mock-data';

interface SearchBarProps {
  categories?: Category[];
  className?: string;
  defaultQuery?: string;
  defaultCategory?: string;
  compact?: boolean;
}

export function SearchBar({
  categories = [],
  className = '',
  defaultQuery = '',
  defaultCategory = 'all',
  compact = false,
}: SearchBarProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState(defaultQuery);
  const [category, setCategory] = useState(defaultCategory);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 1) return [] as Product[];
    return getAllProducts()
      .filter((p) => p.name.toLowerCase().includes(q))
      .slice(0, 6);
  }, [query]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  function goSearch(event?: FormEvent) {
    event?.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (category !== 'all') params.set('category', category);
    setOpen(false);
    navigate(params.toString() ? `/products?${params}` : '/products');
  }

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <form
        onSubmit={goSearch}
        className={`search-bar flex w-full items-stretch overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-sm transition-shadow focus-within:border-primary/40 focus-within:shadow-md ${compact ? 'rounded-xl' : ''}`}
      >
        {!compact && categories.length > 0 && (
          <div className="hidden border-r border-gray-200 md:block">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-full min-w-[140px] border-0 bg-transparent px-4 py-3 text-sm text-gray-700 outline-none"
              aria-label="Category"
            >
              <option value="all">All Categories</option>
              {categories.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={compact ? 'Search products...' : 'Search 20,000+ organic products'}
          className="min-w-0 flex-1 border-0 bg-transparent px-4 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
          aria-label="Search products"
          aria-autocomplete="list"
          aria-expanded={open && suggestions.length > 0}
        />
        <button
          type="submit"
          className="flex items-center justify-center bg-primary px-4 text-white transition-colors hover:bg-[#164d31] sm:px-5"
          aria-label="Search"
        >
          <Icon id="search" width={20} height={20} />
        </button>
      </form>

      {open && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
          <ul className="max-h-80 overflow-y-auto py-2">
            {suggestions.map((product) => (
              <li key={product.id}>
                <Link
                  to={`/products/${product.slug}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50"
                >
                  <img src={product.image} alt="" className="h-10 w-10 rounded-lg object-contain" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-primary font-semibold">${product.price.toFixed(2)}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => goSearch()}
            className="w-full border-t border-gray-100 px-4 py-2.5 text-left text-sm font-semibold text-primary hover:bg-gray-50"
          >
            View all results for “{query}”
          </button>
        </div>
      )}
    </div>
  );
}
