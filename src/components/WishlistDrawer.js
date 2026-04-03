import { useEffect, useRef } from 'react';
import { PRODUCTS } from '@/data/products';
import { useCart, useWishlist } from '@/lib/store';
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

export default function WishlistDrawer({ open, onClose }) {
  const { wishlist, toggleWishlist, wishlistCount } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useUI();
  const drawerRef = useRef(null);
  const closeRef = useRef(null);

  // Resolve names → full product objects
  const wishlistProducts = wishlist
    .map((name) => PRODUCTS.find((p) => p.name === name))
    .filter(Boolean);

  // Focus trap
  useEffect(() => {
    if (!open || !drawerRef.current) return;
    const removeTrap = trapFocus(drawerRef.current);
    setTimeout(() => closeRef.current?.focus(), 50);
    return removeTrap;
  }, [open]);

  // Scroll lock
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

  function handleAddToCart(product) {
    addToCart(product.name, product.price);
    showToast(`${product.name} added to bag`);
  }

  function handleRemove(product) {
    toggleWishlist(product.name);
    showToast(`${product.name} removed from wishlist`);
  }

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
        className={`wishlist-drawer fixed top-0 right-0 w-[min(400px,100vw)] h-full bg-white z-[300] flex flex-col ${open ? 'open' : ''}`}
        aria-label="Wishlist"
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-light-grey">
          <h3 className="text-[12px] tracking-[0.18em] uppercase font-semibold text-charcoal">
            Wishlist ({wishlistCount})
          </h3>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close wishlist"
            className="p-1 rounded hover:bg-light-grey transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {wishlistProducts.length === 0 ? (
            <p className="text-sm text-mid-grey text-center mt-12 leading-loose">
              Your wishlist is empty.<br /><br />Tap the heart on any piece to save it here.
            </p>
          ) : (
            <ul className="divide-y divide-light-grey">
              {wishlistProducts.map((product) => (
                <li key={product.id} className="flex gap-4 py-5">
                  {/* Thumbnail */}
                  <div
                    className="w-[72px] h-[88px] flex-shrink-0 overflow-hidden bg-light-grey"
                    style={{ aspectRatio: '3/4' }}
                  >
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <p className="text-[11px] tracking-[0.07em] uppercase font-medium text-charcoal leading-snug">
                        {product.name}
                      </p>
                      <p className="text-[12px] text-mid-grey mt-1">{product.price}</p>
                      <p className="text-[10px] text-mid-grey mt-0.5 tracking-wide">{product.meta}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 mt-3">
                      <button
                        className="bg-charcoal text-white text-[10px] tracking-[0.12em] uppercase font-semibold px-4 py-2 hover:bg-[#2d2d2d] transition-colors active:scale-[0.98]"
                        onClick={() => handleAddToCart(product)}
                        aria-label={`Add ${product.name} to bag`}
                      >
                        Add to Bag
                      </button>
                      <button
                        className="text-[10px] text-mid-grey underline hover:text-charcoal transition-colors"
                        onClick={() => handleRemove(product)}
                        aria-label={`Remove ${product.name} from wishlist`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer  */}
        {wishlistProducts.length > 0 && (
          <div className="p-6 border-t border-light-grey">
            <button
              className="w-full py-4 bg-charcoal text-white text-[11px] tracking-[0.16em] uppercase font-semibold hover:bg-[#2d2d2d] transition-colors active:scale-[0.99]"
              onClick={() => {
                wishlistProducts.forEach((p) => addToCart(p.name, p.price));
                showToast('All wishlist items added to bag');
              }}
            >
              Add All to Bag
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
