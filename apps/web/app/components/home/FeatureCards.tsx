import { Icon } from '~/components/icons/Icon';

const cards = [
  {
    icon: 'fresh',
    title: 'Fresh from farm',
    description: 'Lorem ipsum dolor sit amet, consectetur adipi elit.',
    bgClass: 'bg-[#6BB252]',
  },
  {
    icon: 'organic',
    title: '100% Organic',
    description: 'Lorem ipsum dolor sit amet, consectetur adipi elit.',
    bgClass: 'bg-[#364127]',
  },
  {
    icon: 'delivery',
    title: 'Free delivery',
    description: 'Lorem ipsum dolor sit amet, consectetur adipi elit.',
    bgClass: 'bg-[#F95F09]',
  },
] as const;

export function FeatureCards() {
  return (
    <div className="grid grid-cols-1 justify-center sm:grid-cols-3">
      {cards.map((card) => (
        <div key={card.title} className={`${card.bgClass} p-4 text-white`}>
          <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-12">
            <div className="text-center md:col-span-3">
              <Icon id={card.icon} width={60} height={60} />
            </div>
            <div className="md:col-span-9">
              <h5 className="text-lg font-medium text-white">{card.title}</h5>
              <p className="mt-1 text-sm">{card.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
