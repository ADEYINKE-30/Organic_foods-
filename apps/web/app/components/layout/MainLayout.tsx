import { useState, type ReactNode } from 'react';
import { IconSprite } from '~/components/icons/IconSprite';
import { Preloader } from '~/components/ui/Preloader';
import { CartOffcanvas } from './CartOffcanvas';
import { Footer } from './Footer';
import { Header } from './Header';
import { MobileBottomNav } from './MobileBottomNav';
import { NavOffcanvas } from './NavOffcanvas';
import type { Category } from '~/lib/mock-data';

interface MainLayoutProps {
  children: ReactNode;
  categories?: Category[];
}

export function MainLayout({ children, categories = [] }: MainLayoutProps) {
  const [navOpen, setNavOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <IconSprite />
      <Preloader />
      <Header
        categories={categories}
        onOpenNav={() => setNavOpen(true)}
        onOpenCart={() => setCartOpen(true)}
      />
      <NavOffcanvas open={navOpen} onClose={() => setNavOpen(false)} />
      {cartOpen && <CartOffcanvas open={cartOpen} onClose={() => setCartOpen(false)} />}
      <main className="pb-20 md:pb-0">{children}</main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
