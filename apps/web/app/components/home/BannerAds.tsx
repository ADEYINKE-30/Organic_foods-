import { Link } from 'react-router';

const ads = [
  {
    title: 'Items on SALE',
    subtitle: 'Discounts up to 30%',
    image: '/images/banner-ad-1.jpg',
    blockClass: 'block-1 large',
    overlayClass: 'bg-sky-500/20',
  },
  {
    title: 'Combo offers',
    subtitle: 'Discounts up to 50%',
    image: '/images/banner-ad-2.jpg',
    blockClass: 'block-2',
    overlayClass: 'bg-[#a3be4c]/20',
  },
  {
    title: 'Discount Coupons',
    subtitle: 'Discounts up to 40%',
    image: '/images/banner-ad-3.jpg',
    blockClass: 'block-3',
    overlayClass: 'bg-[#F95F09]/30',
  },
] as const;

export function BannerAds() {
  return (
    <section className="py-3">
      <div className="mx-auto max-w-[1600px] px-4 lg:px-8">
        <div className="banner-blocks">
          {ads.map((ad) => (
            <div
              key={ad.title}
              className={`banner-ad ${ad.blockClass} ${ad.overlayClass} flex min-h-[180px] items-center rounded-lg bg-cover bg-center bg-no-repeat`}
              style={{ backgroundImage: `url('${ad.image}')` }}
            >
              <div className="banner-content w-full p-5">
                <div className="content-wrapper text-white">
                  <h3 className="banner-title text-2xl font-semibold text-white">{ad.title}</h3>
                  <p className="mt-1">{ad.subtitle}</p>
                  <Link to="/products" className="btn-link mt-2 inline-block text-white underline">
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
