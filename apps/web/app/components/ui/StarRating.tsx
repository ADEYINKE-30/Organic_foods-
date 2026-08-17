import { Icon } from '~/components/icons/Icon';

interface StarRatingProps {
  reviewCount?: number;
  className?: string;
}

export function StarRating({ reviewCount, className = '' }: StarRatingProps) {
  return (
    <div className={className}>
      <span className="rating inline-flex items-center">
        {Array.from({ length: 4 }).map((_, index) => (
          <Icon key={`full-${index}`} id="star-full" width={18} height={18} className="text-amber-400" />
        ))}
        <Icon id="star-half" width={18} height={18} className="text-amber-400" />
      </span>
      {reviewCount !== undefined && <span className="ms-1 text-sm text-gray-600">({reviewCount})</span>}
    </div>
  );
}
