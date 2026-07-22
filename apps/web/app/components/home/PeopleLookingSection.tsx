import { Link } from 'react-router';
import { peopleLookingTerms } from '~/lib/mock-data';

export function PeopleLookingSection() {
  return (
    <section className="py-4">
      <div className="mx-auto max-w-[1600px] px-4 lg:px-8">
        <h2 className="my-4 text-2xl font-medium text-gray-900">People are also looking for</h2>
        <div className="flex flex-wrap gap-2">
          {peopleLookingTerms.map((term, index) => (
            <Link
              key={`${term}-${index}`}
              to="/products"
              className="mb-2 mr-2 rounded bg-amber-400 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-amber-500"
            >
              {term}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
