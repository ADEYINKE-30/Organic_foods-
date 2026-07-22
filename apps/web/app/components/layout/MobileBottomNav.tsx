import { Link, useLocation } from 'react-router';
import { Icon } from '~/components/icons/Icon';
import { useIsClient } from '~/hooks/useIsClient';
import { useAuthStore } from '~/store/auth.store';

export function MobileBottomNav() {
  const location = useLocation();
  const isClient = useIsClient();
  const authState = useAuthStore((state) => state.isAuthenticated);
  const isAuthenticated = isClient && authState;
  const accountTo = isAuthenticated ? '/account' : '/auth/login';

  const items = [
    { label: 'Home', to: '/', icon: 'fresh' as const },
    { label: 'Shop', to: '/products', icon: 'cart' as const },
    { label: 'Cart', to: '/cart', icon: 'shopping-bag' as const },
    { label: isAuthenticated ? 'Account' : 'Sign in', to: accountTo, icon: 'user' as const },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 px-2 py-2 backdrop-blur md:hidden"
      aria-label="Mobile bottom navigation"
    >
      <ul className="grid grid-cols-4 gap-1">
        {items.map((item) => {
          const active =
            item.to === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.to);

          return (
            <li key={item.label}>
              <Link
                to={item.to}
                className={`flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] font-medium ${
                  active ? 'text-primary' : 'text-gray-500'
                }`}
              >
                <Icon id={item.icon} width={20} height={20} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
