import { useEffect, useRef, useState } from 'react';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/lib/store';
import { useUI } from '@/lib/uiContext';

function trapFocus(container) {
  const focusable = Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
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

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('');
  const { showToast } = useUI();
  const overlayRef = useRef(null);
  const inputRef = useRef(null);
  const { addToCart } = useCart();

  const filtered = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.desc.toLowerCase().includes(query.toLowerCase())
      )
    : PRODUCTS;

  useEffect(() => {
    if (!open || !overlayRef.current) return;
    const rm = trapFocus(overlayRef.current);
    setTimeout(() => inputRef.current?.focus(), 60);
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

  function handleSelect(product) {
    addToCart(product.name, product.price);
    showToast(`${product.name} added to bag`);
    onClose();
    setQuery('');
  }

  function handleClose() {
    onClose();
    setQuery('');
  }

  return (
    <div
      ref={overlayRef}
      id="searchOverlay"
      className={`search-overlay fixed inset-0 bg-white/97 backdrop-blur-xl z-[500] flex flex-col items-center justify-start pt-24 ${open ? 'open' : ''}`}
      aria-label="Search"
      aria-hidden={!open}
    >
      <div className="w-[min(680px,90vw)] flex flex-col">
        {/* Input */}
        <div className="flex items-center gap-3 border-b-2 border-charcoal pb-3 mb-8">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5" aria-hidden="true">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            placeholder="Search jewellery..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border-none outline-none font-main text-xl font-light tracking-wide bg-transparent text-charcoal placeholder-light-grey"
            aria-label="Search products"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="p-1 text-mid-grey hover:text-charcoal transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        {/* Results */}
        <div className="flex flex-col max-h-[55vh] overflow-y-auto" role="list">
          {filtered.length === 0 ? (
            <p className="text-center py-12 text-sm text-mid-grey tracking-wide">
              No results for &ldquo;<strong>{query}</strong>&rdquo;
            </p>
          ) : (
            filtered.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelect(p)}
                className="flex items-center gap-4 py-3.5 border-b border-light-grey hover:bg-cream hover:pl-2 transition-all text-left rounded"
                role="listitem"
                aria-label={`Add ${p.name} to cart — ${p.price}`}
              >
                <div className="w-14 h-[68px] flex-shrink-0 bg-light-grey overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="flex-1">
                  <p className="text-[12px] tracking-[0.08em] uppercase font-medium">{p.name}</p>
                  <p className="text-[12px] text-mid-grey mt-1">{p.price}</p>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Close */}
        <button
          onClick={handleClose}
          className="flex items-center gap-2 mt-6 self-center text-[11px] tracking-[0.12em] uppercase text-mid-grey hover:text-charcoal transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          Close Search
        </button>
      </div>
    </div>
  );
}
