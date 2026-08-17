import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import Swiper, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import type { Category } from '~/lib/mock-data';

interface CategoryCarouselProps {
  categories: Category[];
  prevButtonClass?: string;
  nextButtonClass?: string;
  className?: string;
}

export function CategoryCarousel({
  categories,
  prevButtonClass = 'category-carousel-prev',
  nextButtonClass = 'category-carousel-next',
  className = '',
}: CategoryCarouselProps) {
  const swiperRef = useRef<HTMLDivElement>(null);
  const swiperInstance = useRef<Swiper | null>(null);

  useEffect(() => {
    if (!swiperRef.current) return;

    swiperInstance.current = new Swiper(swiperRef.current, {
      modules: [Navigation],
      slidesPerView: 2,
      spaceBetween: 24,
      navigation: {
        prevEl: `.${prevButtonClass}`,
        nextEl: `.${nextButtonClass}`,
      },
      breakpoints: {
        0: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        991: { slidesPerView: 5 },
        1500: { slidesPerView: 8 },
      },
    });

    return () => {
      swiperInstance.current?.destroy(true, true);
      swiperInstance.current = null;
    };
  }, [categories, prevButtonClass, nextButtonClass]);

  return (
    <div ref={swiperRef} className={`category-carousel swiper ${className}`.trim()}>
      <div className="swiper-wrapper">
        {categories.map((category) => (
          <Link
            key={category.slug}
            to={`/category/${category.slug}`}
            className="swiper-slide text-center"
          >
            <img
              src={category.image}
              alt={category.name}
              className="mx-auto h-24 w-24 rounded-full object-cover"
            />
            <h4 className="category-title mt-3 text-base font-normal">{category.name}</h4>
          </Link>
        ))}
      </div>
    </div>
  );
}
