import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { Icon } from '~/components/icons/Icon';
import { SearchBar } from '~/components/ui/SearchBar';
import { useIsClient } from '~/hooks/useIsClient';
import { categoryMegaMenu } from '~/lib/category-menu';
import type { Category } from '~/lib/mock-data';
import { useAuthStore } from '~/store/auth.store';
import { useCartStore } from '~/store/cart.store';
import { useWishlistStore } from '~/store/wishlist.store';

interface HeaderProps {
  categories: Category[];
  onOpenNav: () => void;
  onOpenCart: () => void;
}

const mainNav = [
  { label: 'Home', to: '/', end: true },
  { label: 'Shop', to: '/products' },
  { label: 'Blog', to: '/blog' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
] as const;

export function Header({ categories, onOpenNav, onOpenCart }: HeaderProps) {
  const isClient = useIsClient();
  const [scrolled, setScrolled] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalItems = useCartStore((state) => state.totalItems);
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const authState = useAuthStore((state) => state.isAuthenticated);
  const isAuthenticated = isClient && authState;
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCategoriesOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  function openMegaMenu() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setCategoriesOpen(true);
  }

  function closeMegaMenuDelayed() {
    closeTimer.current = setTimeout(() => setCategoriesOpen(false), 150);
  }

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link ${isActive ? 'nav-link-active' : ''}`;

  return (
    <header className="site-header">
      <div className="top-bar hidden bg-secondary text-white sm:block">
        <div className="container-lg flex items-center justify-between py-2 text-xs md:text-sm">
          <p className="mb-0 font-medium">Free delivery on orders over $50</p>
          <div className="flex items-center gap-4">
            <span>+1 (555) 123-4567</span>
            <span className="hidden md:inline">support@freshmart.com</span>
          </div>
        </div>
      </div>

      <div
        className={`sticky top-0 z-50 border-b bg-white transition-shadow duration-300 ${
          scrolled ? 'border-gray-200 shadow-md' : 'border-transparent shadow-sm'
        }`}
      >
        <div className="container-lg py-3 md:py-4">
          <div className="flex items-center gap-3 lg:gap-6">
            <button type="button" className="icon-btn lg:hidden" onClick={onOpenNav} aria-label="Open menu">
              <Icon id="menu" width={22} height={22} />
            </button>

            <Link to="/" className="shrink-0">
              <img src="/images/logo.svg" alt="FreshMart" className="h-9 w-auto md:h-11" />
            </Link>

            <div className="hidden min-w-0 flex-1 lg:block">
              <SearchBar categories={categories} />
            </div>

            <div className="ml-auto flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                className="icon-btn lg:hidden"
                onClick={() => setMobileSearchOpen((value) => !value)}
                aria-label="Toggle search"
                aria-expanded={mobileSearchOpen}
              >
                <Icon id="search" width={20} height={20} />
              </button>

              <div className="relative" ref={userMenuRef}>
                {isAuthenticated ? (
                  <button
                    type="button"
                    className="icon-btn"
                    aria-label="My account"
                    aria-expanded={userMenuOpen}
                    onClick={() => setUserMenuOpen((v) => !v)}
                  >
                    <Icon id="user" width={20} height={20} />
                  </button>
                ) : (
                  <Link to="/auth/login" className="icon-btn" aria-label="Sign in">
                    <Icon id="user" width={20} height={20} />
                  </Link>
                )}
                {userMenuOpen && isAuthenticated && (
                  <div className="dropdown-panel right-0 mt-2 w-48 p-2">
                    <p className="px-3 py-2 text-xs text-gray-500">Hi, {user?.firstName}</p>
                    <Link to="/account" className="dropdown-item block rounded-lg px-3 py-2 text-sm" onClick={() => setUserMenuOpen(false)}>My Account</Link>
                    <Link to="/orders" className="dropdown-item block rounded-lg px-3 py-2 text-sm" onClick={() => setUserMenuOpen(false)}>Orders</Link>
                    <Link to="/account/wishlist" className="dropdown-item block rounded-lg px-3 py-2 text-sm" onClick={() => setUserMenuOpen(false)}>Wishlist</Link>
                    <button
                      type="button"
                      className="dropdown-item block w-full rounded-lg px-3 py-2 text-left text-sm text-red-600"
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

              <Link
                to="/auth/login"
                className="text-sm font-medium text-primary hover:underline sm:hidden"
              >
                Sign in
              </Link>

              <Link to="/account/wishlist" className="icon-btn relative hidden md:inline-flex" aria-label="Wishlist">
                <Icon id="wishlist" width={20} height={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <button type="button" className="icon-btn relative" onClick={onOpenCart} aria-label="Open cart">
                <Icon id="shopping-bag" width={20} height={20} />
                {totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {mobileSearchOpen && (
            <div className="mt-3 lg:hidden">
              <SearchBar categories={categories} compact />
            </div>
          )}
        </div>

        <nav className="hidden border-t border-gray-100 lg:block" aria-label="Main">
          <div className="container-lg flex items-center justify-between py-2">
            <ul className="flex list-none items-center gap-1">
              <li className="relative">
                <div
                  ref={dropdownRef}
                  onMouseEnter={openMegaMenu}
                  onMouseLeave={closeMegaMenuDelayed}
                >
                  <button
                    type="button"
                    className={`nav-link flex items-center gap-1.5 ${categoriesOpen ? 'nav-link-active' : ''}`}
                    aria-expanded={categoriesOpen}
                    onClick={() => setCategoriesOpen((value) => !value)}
                  >
                    <Icon id="category" width={18} height={18} />
                    All Categories
                    <span className="text-[10px] opacity-70">▾</span>
                  </button>

                  {categoriesOpen && (
                    <div className="mega-menu-panel" onMouseEnter={openMegaMenu} onMouseLeave={closeMegaMenuDelayed}>
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {categoryMegaMenu.map((column) => (
                          <div key={column.title}>
                            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-primary">
                              {column.title}
                            </p>
                            <ul className="space-y-1">
                              {column.items.map((item) => (
                                <li key={`${column.title}-${item.name}`}>
                                  <Link
                                    to={`/category/${item.slug}`}
                                    className="dropdown-item flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm font-medium text-[#333333]"
                                    onClick={() => setCategoriesOpen(false)}
                                  >
                                    <Icon id={item.icon} width={18} height={18} className="text-primary-light" />
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <Link
                        to="/products"
                        className="mt-5 inline-flex text-sm font-semibold text-primary hover:underline"
                        onClick={() => setCategoriesOpen(false)}
                      >
                        View all products →
                      </Link>
                    </div>
                  )}
                </div>
              </li>

              {mainNav.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} end={'end' in item ? item.end : false} className={navLinkClass}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3 text-sm">
              {isAuthenticated ? (
                <Link to="/account" className="font-medium text-[#333333] hover:text-primary">
                  Hi, {user?.firstName}
                </Link>
              ) : (
                <>
                  <Link to="/auth/login" className="font-medium text-body hover:text-primary">
                    Sign in
                  </Link>
                  <Link to="/auth/register" className="btn-accent rounded-full px-4 py-2 text-xs">
                    Join now
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
