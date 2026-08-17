export function Icon({
  id,
  className,
  width = 24,
  height = 24,
}: {
  id: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <svg width={width} height={height} className={className} aria-hidden>
      <use href={`#${id}`} />
    </svg>
  );
}
