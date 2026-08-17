import { useEffect, useRef } from 'react';
import Swiper, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import type { Product } from '~/lib/mock-data';
import { ProductCard } from './ProductCard';

interface ProductCarouselProps {
  products: Product[];
  prevButtonClass: string;
  nextButtonClass: string;
  className?: string;
}

export function ProductCarousel({
  products,
  prevButtonClass,
  nextButtonClass,
  className = '',
}: ProductCarouselProps) {
  const swiperRef = useRef<HTMLDivElement>(null);
  const swiperInstance = useRef<Swiper | null>(null);

  useEffect(() => {
    if (!swiperRef.current) return;

    swiperInstance.current = new Swiper(swiperRef.current, {
      modules: [Navigation],
      slidesPerView: 1,
      spaceBetween: 24,
      navigation: {
        prevEl: `.${prevButtonClass}`,
        nextEl: `.${nextButtonClass}`,
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 3 },
        991: { slidesPerView: 4 },
        1500: { slidesPerView: 5 },
      },
    });

    return () => {
      swiperInstance.current?.destroy(true, true);
      swiperInstance.current = null;
    };
  }, [prevButtonClass, nextButtonClass, products]);

  return (
    <div ref={swiperRef} className={`swiper overflow-hidden ${className}`.trim()}>
      <div className="swiper-wrapper">
        {products.map((product) => (
          <div key={`${product.id}-${product.image}`} className="swiper-slide">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
