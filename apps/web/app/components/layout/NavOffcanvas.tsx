import { Link } from 'react-router';
import { Icon } from '~/components/icons/Icon';
import { categoryMegaMenu } from '~/lib/category-menu';

interface NavOffcanvasProps {
  open: boolean;
  onClose: () => void;
}

export function NavOffcanvas({ open, onClose }: NavOffcanvasProps) {
  return (
    <div
      className={`fixed inset-0 z-[1050] lg:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      <aside
        className={`absolute left-0 top-0 flex h-full w-[min(100vw-3rem,320px)] flex-col bg-white shadow-2xl transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
          <div>
            <img src="/images/logo.svg" alt="FreshMart" className="h-8 w-auto" />
            <p className="font-accent text-xs italic text-primary-light">Organic groceries</p>
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close menu">
            <Icon id="close" width={20} height={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <ul className="mb-6 space-y-1">
            {[
              { label: 'Home', to: '/' },
              { label: 'Shop', to: '/products' },
              { label: 'Blog', to: '/blog' },
              { label: 'About', to: '/about' },
              { label: 'Contact', to: '/contact' },
            ].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={onClose}
                  className="block rounded-xl px-3 py-2.5 font-medium text-[#333333] hover:bg-gray-50 hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {categoryMegaMenu.map((column) => (
            <div key={column.title} className="mb-5">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">{column.title}</p>
              <ul className="space-y-1">
                {column.items.map((item) => (
                  <li key={`${column.title}-${item.name}`}>
                    <Link
                      to={`/category/${item.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 hover:bg-gray-50"
                    >
                      <Icon id={item.icon} width={18} height={18} className="text-primary-light" />
                      <span className="text-sm font-medium text-[#333333]">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 p-4">
          <Link to="/auth/login" onClick={onClose} className="btn-primary block w-full text-center">
            Sign in
          </Link>
        </div>
      </aside>
    </div>
  );
}
