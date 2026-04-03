import { useEffect, useRef, useCallback } from 'react';
import { useCart, formatPrice } from '@/lib/store';
import { useUI } from '@/lib/uiContext';

function trapFocus(container) {
  const focusable = Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
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

export default function CartDrawer({ open, onClose }) {
  const { cart, removeFromCart, cartTotal, cartCount } = useCart();
  const { showToast } = useUI();
  const drawerRef = useRef(null);
  const closeRef = useRef(null);

  // Focus trap + focus management
  useEffect(() => {
    if (!open || !drawerRef.current) return;
    const removeTrap = trapFocus(drawerRef.current);
    setTimeout(() => closeRef.current?.focus(), 50);
    return removeTrap;
  }, [open]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // ESC key
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const handleRemove = (idx, name) => {
    removeFromCart(idx);
    showToast(`${name} removed`);
  };

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-[299] backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        ref={drawerRef}
        id="cartDrawer"
        className={`cart-drawer fixed top-0 right-0 w-[min(400px,100vw)] h-full bg-white z-[300] flex flex-col ${open ? 'open' : ''}`}
        aria-label="Shopping cart"
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-light-grey">
          <h3 className="text-[12px] tracking-[0.18em] uppercase font-semibold">
            Your Bag ({cartCount})
          </h3>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close cart"
            className="p-1 rounded hover:bg-light-grey transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <p className="text-sm text-mid-grey text-center mt-12 leading-loose">
              Your bag is empty.<br /><br />Add something beautiful.
            </p>
          ) : (
            cart.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start py-4 border-b border-light-grey gap-4">
                <div className="flex-1">
                  <p className="text-[11px] tracking-[0.07em] uppercase font-medium">{item.name}</p>
                  <p className="text-[12px] text-mid-grey mt-1">{item.price}</p>
                </div>
                <button
                  className="text-[10px] text-mid-grey underline whitespace-nowrap mt-0.5 hover:text-charcoal transition-colors"
                  onClick={() => handleRemove(idx, item.name)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-light-grey">
            <div className="flex justify-between text-[12px] font-semibold tracking-[0.12em] uppercase mb-2">
              <span>Total</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            <p className="text-[11px] text-mid-grey mb-5 tracking-[0.04em]">
              Free shipping on all orders
            </p>
            <button
              className="w-full py-4 bg-charcoal text-white text-[11px] tracking-[0.16em] uppercase font-semibold hover:bg-[#2d2d2d] transition-colors active:scale-[0.99]"
              onClick={() => showToast('Checkout coming soon — visit our stores!')}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
