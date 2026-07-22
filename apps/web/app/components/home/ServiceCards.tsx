import { Icon } from '~/components/icons/Icon';

const services = [
  { icon: 'package', title: 'Free delivery', description: 'On orders over $50 — fast and reliable.' },
  { icon: 'secure', title: '100% secure payment', description: 'Stripe & PayPal protected checkout.' },
  { icon: 'quality', title: 'Quality guarantee', description: 'Freshness promise on every order.' },
  { icon: 'savings', title: 'Guaranteed savings', description: 'Weekly deals on organic favorites.' },
  { icon: 'offers', title: 'Daily offers', description: 'New discounts on seasonal produce.' },
] as const;

export function ServiceCards() {
  return (
    <section className="py-5">
      <div className="mx-auto max-w-[1600px] px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {services.map((service) => (
            <div
              key={service.title}
              className="mb-3 rounded border border-gray-300 bg-white p-3 shadow-sm"
            >
              <div className="mb-3 text-gray-900">
                <Icon id={service.icon} width={32} height={32} />
              </div>
              <div className="p-0">
                <h5 className="text-base font-medium capitalize text-gray-900">{service.title}</h5>
                <p className="mt-2 text-sm text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
