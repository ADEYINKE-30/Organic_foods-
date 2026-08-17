import spriteSymbols from './sprite-symbols.svg?raw';

export function IconSprite() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'none' }}
      aria-hidden
      dangerouslySetInnerHTML={{ __html: `<defs>${spriteSymbols}</defs>` }}
    />
  );
}
