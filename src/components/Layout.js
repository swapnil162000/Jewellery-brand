import { useState, useEffect, useRef } from 'react';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import WishlistDrawer from './WishlistDrawer';
import SearchOverlay from './SearchOverlay';
import QuickViewModal from './QuickViewModal';
import Toast from './Toast';
import { useUI } from '@/lib/uiContext';

export default function Layout({ children }) {
  const { toast, quickViewProduct, closeQuickView } = useUI();
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);

  // Custom cursor tracking
  useEffect(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    let ringX = 0, ringY = 0;
    let mouseX = 0, mouseY = 0;
    let rafId;

    function lerp(a, b, t) { return a + (b - a) * t; }

    function animate() {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      rafId = requestAnimationFrame(animate);
    }

    function onMove(e) { mouseX = e.clientX; mouseY = e.clientY; }
    function onEnterLink() { document.body.classList.add('cursor-hover'); }
    function onLeaveLink()  { document.body.classList.remove('cursor-hover'); }

    document.addEventListener('mousemove', onMove, { passive: true });
    document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMove);
    };
  }, []);

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(docH > 0 ? (scrollTop / docH) * 100 : 0);
      setShowScrollTop(scrollTop > 600);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div>
      {/* Custom cursor (hidden on touch devices via CSS) */}
      <div id="cursor-dot" ref={cursorDotRef} aria-hidden="true" />
      <div id="cursor-ring" ref={cursorRingRef} aria-hidden="true" />

      {/* Skip nav */}
      <a
        href="#main-content"
        className="absolute top-[-100px] left-4 z-[9999] px-5 py-2.5 bg-charcoal text-white text-[13px] tracking-wide focus:top-2 transition-all"
      >
        Skip to main content
      </a>

      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 h-0.5 bg-charcoal z-[9998]"
        style={{ width: `${scrollPct}%`, transition: 'width 0.1s linear' }}
        role="progressbar"
        aria-valuenow={Math.round(scrollPct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      />

      <Header
        onCartOpen={() => setCartOpen(true)}
        onWishlistOpen={() => setWishlistOpen(true)}
        onSearchOpen={() => setSearchOpen(true)}
      />

      <main id="main-content">{children}</main>

      <Footer />

      {/* Overlays */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <WishlistDrawer open={wishlistOpen} onClose={() => setWishlistOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <QuickViewModal product={quickViewProduct} onClose={closeQuickView} />

      {/* Toast */}
      <Toast message={toast.message} visible={toast.visible} />

      {/* Scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`scroll-top fixed bottom-8 right-7 w-11 h-11 bg-charcoal text-white rounded-full flex items-center justify-center z-[200] hover:bg-[#2d2d2d] transition-colors ${
          showScrollTop ? 'visible' : ''
        }`}
        aria-label="Scroll to top"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </div>
  );
}
