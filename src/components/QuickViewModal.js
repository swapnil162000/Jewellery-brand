import { useEffect, useRef } from 'react';
import { useCart } from '@/lib/store';
import { useUI } from '@/lib/uiContext';

function trapFocus(container) {
  const focusable = Array.from(
    container.querySelectorAll('button:not([disabled]), [tabindex]:not([tabindex="-1"])')
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

export default function QuickViewModal({ product, onClose }) {
  const overlayRef = useRef(null);
  const { addToCart } = useCart();
  const { showToast } = useUI();
  const open = !!product;

  useEffect(() => {
    if (!open || !overlayRef.current) return;
    const rm = trapFocus(overlayRef.current);
    setTimeout(() => overlayRef.current?.querySelector('.qv-atc')?.focus(), 50);
    return rm;
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!product) return null;

  function handleAddToCart() {
    addToCart(product.name, product.price);
    showToast(`${product.name} added to bag`);
    onClose();
  }

  return (
    <div
      className={`quickview-overlay fixed inset-0 bg-black/55 backdrop-blur z-[400] flex items-center justify-center p-6 ${open ? 'open' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      aria-modal="true"
      role="dialog"
      aria-label={`Quick view: ${product.name}`}
      ref={overlayRef}
    >
      <div className="quickview-modal bg-white max-w-[860px] w-full relative max-h-[90vh] overflow-y-auto">
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close quick view"
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-light-grey rounded-full z-10 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="aspect-[3/4] overflow-hidden bg-light-grey">
            <img
              src={product.imgLarge || product.img}
              alt={product.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Details */}
          <div className="p-10 md:p-12 flex flex-col justify-center gap-4">
            <p className="text-[13px] tracking-[0.12em] uppercase font-semibold">{product.name}</p>
            <p className="font-display text-2xl font-normal">{product.price}</p>
            <p className="text-[13px] text-mid-grey leading-loose">{product.desc}</p>
            <p className="text-[11px] text-accent tracking-[0.1em] uppercase">{product.meta}</p>
            <button
              className="qv-atc w-full py-4 bg-charcoal text-white text-[11px] tracking-[0.14em] uppercase font-semibold mt-2 hover:bg-[#2d2d2d] transition-colors active:scale-[0.99]"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
