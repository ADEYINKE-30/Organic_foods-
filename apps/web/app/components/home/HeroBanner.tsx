import { Link } from 'react-router';
import { Icon } from '~/components/icons/Icon';

export function HeroBanner() {
  const stats = [
    { value: '14k+', label: 'Product Varieties' },
    { value: '50k+', label: 'Happy Customers' },
    { value: '10+', label: 'Store Locations' },
  ];

  const features = [
    {
      icon: 'fresh' as const,
      title: 'Fresh from farm',
      description: 'Picked at peak ripeness and delivered within 24 hours.',
      bg: 'bg-primary-light',
    },
    {
      icon: 'organic' as const,
      title: '100% Organic',
      description: 'Certified organic produce with no harmful pesticides.',
      bg: 'bg-secondary',
    },
    {
      icon: 'delivery' as const,
      title: 'Free delivery',
      description: 'Complimentary shipping on all orders over $50.',
      bg: 'bg-accent',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white">
      <div
        className="bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/banner-1.jpg')" }}
      >
        <div className="container-lg py-10 md:py-16 lg:py-20">
          <div className="max-w-2xl rounded-2xl bg-white/75 p-6 shadow-sm backdrop-blur-sm sm:p-8 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none">
            <p className="font-accent text-lg italic text-primary md:text-xl">Farm to table</p>
            <h1 className="hero-headline mt-2">
              <span className="text-primary">Organic</span> Foods at your Doorsteps
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-body md:text-xl">
              Farm-fresh vegetables, fruits, and dairy delivered straight to your kitchen within 24
              hours.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-[#164d31] hover:shadow-xl"
              >
                Start Shopping
              </Link>
              <Link
                to="/auth/register"
                className="inline-flex items-center justify-center rounded-xl border-2 border-primary bg-white px-6 py-3.5 text-base font-semibold text-primary shadow-md transition-all hover:bg-primary/5"
              >
                Join Now
              </Link>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 border-t border-gray-200/80 pt-8 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-heading text-3xl font-bold text-[#333333] md:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm font-medium uppercase tracking-wide text-body">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.title} className={`feature-bar-card ${feature.bg}`}>
            <div className="mb-3 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/20 md:mb-0">
              <Icon id={feature.icon} width={32} height={32} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">{feature.title}</h2>
              <p className="mt-1 text-sm text-white/90">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
