/** @source index.html — FreshMart home page */
import { Link } from 'react-router';
import type { Route } from './+types/_index';
import { CategoryCarousel } from '~/components/category/CategoryCarousel';
import { AppPromoSection } from '~/components/home/AppPromoSection';
import { BannerAds } from '~/components/home/BannerAds';
import { BlogSection } from '~/components/home/BlogSection';
import { FlashDealsSection } from '~/components/home/FlashDealsSection';
import { HeroBanner } from '~/components/home/HeroBanner';
import { NewsletterSection } from '~/components/home/NewsletterSection';
import { PeopleLookingSection } from '~/components/home/PeopleLookingSection';
import { ServiceCards } from '~/components/home/ServiceCards';
import { ProductCarousel } from '~/components/product/ProductCarousel';
import { ProductGrid } from '~/components/product/ProductGrid';
import { fetchHomeCatalog } from '~/lib/catalog';
import type { Product } from '~/lib/mock-data';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'FreshMart — Organic Food Store' },
    {
      name: 'description',
      content: 'Shop fresh organic groceries, delivered to your door.',
    },
  ];
}

export async function loader() {
  return fetchHomeCatalog();
}

interface ProductSectionProps {
  id?: string;
  title: string;
  products: Product[];
  prevClass: string;
  nextClass: string;
}

function ProductCarouselSection({
  id,
  title,
  products,
  prevClass,
  nextClass,
}: ProductSectionProps) {
  return (
    <section id={id} className="products-carousel overflow-hidden py-5">
      <div className="container-lg">
        <div className="section-header mb-5 flex flex-wrap items-center justify-between gap-4">
          <h2 className="section-title">{title}</h2>
          <div className="flex items-center gap-2">
            <Link to="/products" className="btn-primary">
              View All
            </Link>
            <div className="swiper-buttons flex gap-2">
              <button type="button" className={`swiper-prev ${prevClass} btn-yellow`} aria-label="Previous">
                ❮
              </button>
              <button type="button" className={`swiper-next ${nextClass} btn-yellow`} aria-label="Next">
                ❯
              </button>
            </div>
          </div>
        </div>
        <ProductCarousel
          products={products}
          prevButtonClass={prevClass}
          nextButtonClass={nextClass}
        />
      </div>
    </section>
  );
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const { categories, bestSellers, featured, popular, latest } = loaderData;

  return (
    <>
      <HeroBanner />

      <FlashDealsSection />

      <section className="overflow-hidden py-5">
        <div className="container-lg">
          <div className="section-header mb-5 flex flex-wrap items-center justify-between gap-4">
            <h2 className="section-title">Shop by Category</h2>
            <div className="flex items-center gap-2">
              <Link to="/products" className="btn-primary">
                View All
              </Link>
              <div className="swiper-buttons flex gap-2">
                <button
                  type="button"
                  className="swiper-prev category-carousel-prev btn-yellow"
                  aria-label="Previous categories"
                >
                  ❮
                </button>
                <button
                  type="button"
                  className="swiper-next category-carousel-next btn-yellow"
                  aria-label="Next categories"
                >
                  ❯
                </button>
              </div>
            </div>
          </div>
          <CategoryCarousel categories={categories} />
        </div>
      </section>

      <section className="pb-5">
        <div className="container-lg">
          <div className="section-header mb-5 flex flex-wrap items-center justify-between gap-4">
            <h2 className="section-title">Best selling products</h2>
            <Link to="/products" className="btn-primary">
              View All
            </Link>
          </div>
          <ProductGrid products={bestSellers} />
        </div>
      </section>

      <section className="py-3">
        <div className="container-lg">
          <BannerAds />
        </div>
      </section>

      <ProductCarouselSection
        id="featured-products"
        title="Featured products"
        products={featured}
        prevClass="featured-carousel-prev"
        nextClass="featured-carousel-next"
      />

      <NewsletterSection />

      <ProductCarouselSection
        id="popular-products"
        title="Most popular products"
        products={popular}
        prevClass="popular-carousel-prev"
        nextClass="popular-carousel-next"
      />

      <ProductCarouselSection
        id="latest-products"
        title="Just arrived"
        products={latest}
        prevClass="latest-carousel-prev"
        nextClass="latest-carousel-next"
      />

      <BlogSection />
      <AppPromoSection />
      <PeopleLookingSection />
      <ServiceCards />
    </>
  );
}
