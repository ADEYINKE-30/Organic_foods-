import { useState } from 'react';
import { Link } from 'react-router';
import { Icon } from '~/components/icons/Icon';
import type { Product } from '~/lib/mock-data';
import { useCartStore } from '~/store/cart.store';
import { useWishlistStore } from '~/store/wishlist.store';
import { StarRating } from '~/components/ui/StarRating';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const toggleItem = useWishlistStore((s) => s.toggleItem);
  const wished = useWishlistStore((s) => s.items.some((i) => i.productId === product.id));

  function handleAdd() {
    useCartStore.getState().addItem(
      { productId: product.id, name: product.name, price: product.price },
      quantity,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className={`product-item group ${className}`.trim()}>
      <figure className="relative text-center">
        <Link to={`/products/${product.slug}`} title={product.name}>
          <img
            src={product.image}
            alt={product.name}
            className="tab-image mx-auto max-h-[210px] h-auto w-auto transition-transform duration-300 group-hover:-translate-y-1"
          />
        </Link>
        <button
          type="button"
          className={`absolute right-2 top-2 rounded-full bg-white p-2 shadow-sm ${wished ? 'text-red-500' : 'text-gray-600'}`}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={() =>
            toggleItem({
              productId: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              slug: product.slug,
            })
          }
        >
          <Icon id="heart" width={16} height={16} />
        </button>
      </figure>
      <div className="flex flex-col text-center">
        <h3 className="text-base font-normal">
          <Link to={`/products/${product.slug}`} className="hover:text-primary">
            {product.name}
          </Link>
        </h3>
        <StarRating reviewCount={product.reviewCount} />
        <div className="mt-1 flex items-center justify-center gap-2">
          <del className="text-gray-500">${product.comparePrice.toFixed(2)}</del>
          <span className="font-semibold text-gray-900">${product.price.toFixed(2)}</span>
          {product.discount && (
            <span className="rounded bg-accent/15 px-1.5 text-xs font-semibold text-accent">
              {product.discount}
            </span>
          )}
        </div>
        <div className="button-area p-3 pt-0">
          <div className="mt-2 grid grid-cols-12 gap-1">
            <div className="col-span-3">
              <input
                type="number"
                name="quantity"
                min={1}
                value={quantity}
                onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
                className="quantity w-full rounded border border-gray-300 px-2 py-2 text-center text-sm"
              />
            </div>
            <div className="col-span-9">
              <button
                type="button"
                className={`btn-cart flex h-[3.3em] w-full items-center justify-center gap-1 rounded px-2 text-xs text-white ${
                  added ? 'bg-secondary' : 'bg-primary hover:bg-[#164d31]'
                }`}
                onClick={handleAdd}
              >
                <Icon id={added ? 'check' : 'cart'} width={18} height={18} />
                {added ? 'Added!' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
