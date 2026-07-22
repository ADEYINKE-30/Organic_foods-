import { useEffect, type ReactNode } from 'react';
import { Icon } from '~/components/icons/Icon';

interface OffcanvasProps {
  position: 'start' | 'end';
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: ReactNode;
  headerClassName?: string;
}

export function Offcanvas({
  position,
  open,
  onClose,
  children,
  title,
  headerClassName = 'justify-content-center',
}: OffcanvasProps) {
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[1040] bg-black/50 opacity-100 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden={false}
      />
      <div
        className={`fixed top-0 z-[1045] flex h-full w-full max-w-md flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out ${
          position === 'start' ? 'left-0 translate-x-0' : 'right-0 translate-x-0'
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div
          className={`relative flex items-center border-b border-gray-200 p-4 ${
            headerClassName === 'justify-content-between' ? 'justify-between' : 'justify-center'
          }`}
        >
          {title}
          <button
            type="button"
            className={`rounded p-1 text-gray-500 hover:text-gray-800 ${
              headerClassName === 'justify-content-between' ? '' : 'absolute right-4 top-4'
            }`}
            onClick={onClose}
            aria-label="Close"
          >
            <Icon id="close" width={20} height={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </>
  );
}
