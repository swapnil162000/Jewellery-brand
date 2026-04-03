import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { NAV_LINKS } from '@/data/products';
import { useCart, useWishlist } from '@/lib/store';
import { useUI } from '@/lib/uiContext';
import { useRouter } from 'next/router';

function trapFocus(container) {
  const focusable = Array.from(
    container.querySelectorAll('a[href], button:not([disabled])')
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  function handler(e) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
    }
  }
  container.addEventListener('keydown', handler);
  return () => container.removeEventListener('keydown', handler);
}

export default function Header({ onCartOpen, onWishlistOpen, onSearchOpen }) {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { isDark, toggleTheme } = useUI();
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const closeNavRef = useRef(null);
  const router = useRouter();

  // Header shadow on scroll
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close nav on route change
  useEffect(() => {
    setNavOpen(false);
  }, [router.pathname]);

  // Focus trap + scroll lock for nav drawer
  useEffect(() => {
    if (!navOpen || !navRef.current) return;
    document.body.style.overflow = 'hidden';
    const rm = trapFocus(navRef.current);
    setTimeout(() => closeNavRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = '';
      rm();
    };
  }, [navOpen]);

  // ESC
  useEffect(() => {
    if (!navOpen) return;
    const handler = (e) => { if (e.key === 'Escape') setNavOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [navOpen]);

  return (
    <>
      {/* Announcement bar */}
      <div
        id="announceBar"
        className="bg-charcoal text-white text-[10px] tracking-[0.18em] uppercase h-9 flex items-center overflow-hidden"
        aria-label="Promotions"
      >
        <div className="marquee-track" aria-hidden="true">
          <span>FREE SHIPPING ON ALL ORDERS &nbsp;&nbsp;·&nbsp;&nbsp; NEW ARRIVALS: JASMINE COLLECTION &nbsp;&nbsp;·&nbsp;&nbsp; COMPLIMENTARY GIFT WRAPPING &nbsp;&nbsp;·&nbsp;&nbsp; CERTIFIED FINE JEWELLERY &nbsp;&nbsp;·&nbsp;&nbsp; 30-DAY RETURNS &nbsp;&nbsp;·&nbsp;&nbsp; HANDCRAFTED IN INDIA &nbsp;&nbsp;·&nbsp;&nbsp; SECURE PAYMENTS &nbsp;&nbsp;·&nbsp;&nbsp; EXCLUSIVE LABEL DESIGNS &nbsp;&nbsp;·&nbsp;&nbsp;</span>
          <span aria-hidden="true">FREE SHIPPING ON ALL ORDERS &nbsp;&nbsp;·&nbsp;&nbsp; NEW ARRIVALS: JASMINE COLLECTION &nbsp;&nbsp;·&nbsp;&nbsp; COMPLIMENTARY GIFT WRAPPING &nbsp;&nbsp;·&nbsp;&nbsp; CERTIFIED FINE JEWELLERY &nbsp;&nbsp;·&nbsp;&nbsp; 30-DAY RETURNS &nbsp;&nbsp;·&nbsp;&nbsp; HANDCRAFTED IN INDIA &nbsp;&nbsp;·&nbsp;&nbsp; SECURE PAYMENTS &nbsp;&nbsp;·&nbsp;&nbsp; EXCLUSIVE LABEL DESIGNS &nbsp;&nbsp;·&nbsp;&nbsp;</span>
        </div>
      </div>

      {/* Header */}
      <header
        className={`sticky top-0 z-[100] bg-white/97 backdrop-blur-xl border-b border-light-grey h-16 transition-shadow ${scrolled ? 'shadow-soft' : ''}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between relative">
          {/* Menu button (mobile) */}
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-light-grey transition-colors md:hidden"
            onClick={() => setNavOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={navOpen}
            aria-controls="navDrawer"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 font-main text-[20px] font-bold tracking-[0.35em] uppercase text-charcoal hover:opacity-70 transition-opacity"
            aria-label="LABEL Fine Jewellery — Home"
          >
            LABEL
          </Link>

          {/* Icons */}
          <div className="flex items-center gap-1 ml-auto">
            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-light-grey transition-colors"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                /* Sun icon */
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                /* Moon icon */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            <button
              onClick={onSearchOpen}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-light-grey transition-colors relative"
              aria-label="Open search"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* Wishlist */}
            <button
              onClick={onWishlistOpen}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-light-grey transition-colors relative"
              aria-label={`Wishlist — ${wishlistCount} items`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#c0392b] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={onCartOpen}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-light-grey transition-colors relative"
              aria-label={`Shopping cart — ${cartCount} items`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-charcoal text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Desktop nav */}
      <nav
        className="hidden md:block bg-cream border-b border-light-grey sticky top-16 z-[99]"
        aria-label="Primary navigation"
      >
        <ul className="max-w-[1400px] mx-auto px-6 flex justify-center">
          {NAV_LINKS.filter((l) => l.href !== '/').map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block px-5 py-3.5 text-[10.5px] tracking-[0.14em] uppercase font-medium transition-colors relative group ${
                  router.pathname === link.href ? 'text-charcoal' : 'text-mid-grey hover:text-charcoal'
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-5 right-5 h-px bg-charcoal transition-transform origin-left ${
                    router.pathname === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile nav overlay */}
      {navOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[199] backdrop-blur-sm"
          onClick={() => setNavOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile nav drawer */}
      <nav
        ref={navRef}
        id="navDrawer"
        className={`nav-drawer fixed top-0 left-0 w-[min(320px,100vw)] h-full bg-white z-[200] px-7 py-8 overflow-y-auto ${navOpen ? 'open' : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!navOpen}
      >
        <button
          ref={closeNavRef}
          onClick={() => setNavOpen(false)}
          className="flex items-center mb-8 text-charcoal p-1 rounded"
          aria-label="Close navigation"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="border-b border-light-grey">
              <Link
                href={link.href}
                className="block py-4 text-[13px] tracking-[0.12em] uppercase font-medium hover:text-accent-dark hover:pl-2 transition-all"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
