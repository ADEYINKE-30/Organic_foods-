import type { Product } from '~/lib/mock-data';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  className?: string;
}

export function ProductGrid({ products, className = '' }: ProductGridProps) {
  return (
    <div
      className={`product-grid grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ${className}`.trim()}
    >
      {products.map((product) => (
        <ProductCard key={`${product.id}-${product.image}`} product={product} />
      ))}
    </div>
  );
}
