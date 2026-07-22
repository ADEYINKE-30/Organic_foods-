import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ProductCard } from '~/components/product/ProductCard';
import { getAdminProducts } from '~/lib/admin-data';

function useCountdown(endsAt: string) {
  const [left, setLeft] = useState({ h: '00', m: '00', s: '00' });

  useEffect(() => {
    function tick() {
      const diff = Math.max(0, new Date(endsAt).getTime() - Date.now());
      const h = Math.floor(diff / 3_600_000);
      const m = Math.floor((diff % 3_600_000) / 60_000);
      const s = Math.floor((diff % 60_000) / 1000);
      setLeft({
        h: String(h).padStart(2, '0'),
        m: String(m).padStart(2, '0'),
        s: String(s).padStart(2, '0'),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  return left;
}

export function FlashDealsSection() {
  const deals = getAdminProducts().filter((p) => p.saleEndsAt).slice(0, 6);
  const endsAt = deals[0]?.saleEndsAt ?? new Date(Date.now() + 8 * 3600_000).toISOString();
  const time = useCountdown(endsAt);

  if (deals.length === 0) return null;

  return (
    <section className="page-section bg-white">
      <div className="container-lg">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">Limited time</p>
            <h2 className="section-title mt-1">Flash deals</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-body">Ends in</span>
            <div className="flex gap-1.5 font-heading text-lg font-bold">
              {[time.h, time.m, time.s].map((unit, i) => (
                <span key={i} className="inline-flex min-w-10 items-center justify-center rounded-lg bg-[#1F2937] px-2 py-1 text-white">
                  {unit}
                </span>
              ))}
            </div>
            <Link to="/deals" className="btn-primary ml-2">
              View all
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
          {deals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
