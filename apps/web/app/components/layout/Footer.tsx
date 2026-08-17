import { Link } from 'react-router';
import { Icon } from '~/components/icons/Icon';

const companyLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Careers', to: '/about' },
  { label: 'Our Journals', to: '/blog' },
  { label: 'Contact', to: '/contact' },
] as const;

const supportLinks = [
  { label: 'FAQ', to: '/contact' },
  { label: 'Track Order', to: '/orders' },
  { label: 'Returns & Refunds', to: '/contact' },
  { label: 'Delivery Info', to: '/contact' },
] as const;

const socialIcons = ['facebook', 'twitter', 'youtube', 'instagram'] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="bg-secondary py-10 text-white md:py-14">
        <div className="container-lg">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <img
                src="/images/logo.svg"
                width={200}
                height={56}
                alt="FreshMart"
                className="brightness-0 invert"
              />
              <p className="mt-1 font-accent text-sm italic text-primary-light">Organic groceries</p>
              <p className="mt-4 text-sm leading-relaxed text-white/75">
                Fresh organic groceries delivered to your door. Farm-fresh quality you can trust.
              </p>
              <ul className="mt-5 flex list-none gap-2">
                {socialIcons.map((icon) => (
                  <li key={icon}>
                    <a
                      href="#"
                      className="inline-flex rounded-lg border border-white/25 p-2.5 transition-colors hover:bg-white/10"
                      aria-label={icon}
                    >
                      <Icon id={icon} width={16} height={16} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Company</h5>
              <ul className="space-y-2.5">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-white/75 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Support</h5>
              <ul className="space-y-2.5">
                {supportLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-white/75 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="mb-2 text-sm font-bold uppercase tracking-wider text-white">Newsletter</h5>
              <p className="mb-4 text-sm text-white/75">
                Join our newsletter for exclusive offers and seasonal recipes.
              </p>
              <form className="flex overflow-hidden rounded-xl shadow-lg" onSubmit={(e) => e.preventDefault()}>
                <input
                  className="min-w-0 flex-1 bg-white px-4 py-3 text-sm text-[#333333] outline-none"
                  type="email"
                  placeholder="Your email address"
                  aria-label="Email for newsletter"
                />
                <button
                  className="bg-[#1a1a1a] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-black"
                  type="submit"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </footer>

      <div className="border-t border-white/10 bg-[#1f3324] py-5 text-white/70">
        <div className="container-lg">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm">© {year} FreshMart. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="footer-trust-badge">
                <Icon id="secure" width={14} height={14} />
                Secure checkout
              </span>
              <span className="footer-trust-badge">Visa</span>
              <span className="footer-trust-badge">Mastercard</span>
              <span className="footer-trust-badge">PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
