import { useState } from 'react';
import { useCart, useWishlist } from '@/lib/store';
import { useUI } from '@/lib/uiContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  const { showToast, openQuickView } = useUI();
  const isWishlisted = wishlist.includes(product.name);

  function handleAddToCart(e) {
    e.preventDefault();
    addToCart(product.name, product.price);
    showToast(`${product.name} added to bag`);
  }

  function handleWishlist(e) {
    e.preventDefault();
    toggleWishlist(product.name);
    showToast(
      isWishlisted
        ? `${product.name} removed from wishlist`
        : `${product.name} saved to wishlist`
    );
  }

  return (
    <article className="product-card relative reveal-item">
      {/* Image wrapper */}
      <div className="product-img-wrap block relative" style={{ aspectRatio: '3/4', overflow: 'hidden', background: '#e8e4df' }}>
        <img
          className="img-primary absolute inset-0 w-full h-full object-cover transition-all duration-500"
          src={product.img}
          alt={product.name}
          loading="lazy"
        />
        <img
          className="img-hover absolute inset-0 w-full h-full object-cover transition-all duration-500"
          src={product.imgHover || product.img}
          alt={`${product.name} — alternate`}
          loading="lazy"
        />

        {/* Wishlist */}
        <button
          className={`btn-wishlist absolute top-3 right-3 w-9 h-9 bg-white/92 backdrop-blur rounded-full flex items-center justify-center transition-all z-10 hover:bg-white ${isWishlisted ? 'active' : ''}`}
          onClick={handleWishlist}
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={isWishlisted ? '#c0392b' : 'none'} stroke={isWishlisted ? '#c0392b' : 'currentColor'} strokeWidth="2" aria-hidden="true">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Quick view */}
        <button
          className="btn-quickview absolute bottom-3 left-1/2 bg-charcoal/88 text-white px-5 py-2 text-[10px] tracking-[0.14em] uppercase font-semibold whitespace-nowrap transition-all z-10 backdrop-blur hover:bg-charcoal"
          onClick={(e) => { e.preventDefault(); openQuickView(product); }}
          aria-label={`Quick view ${product.name}`}
        >
          Quick View
        </button>

      </div>

      {/* Info */}
      <div className="mt-3.5 flex flex-col items-center text-center gap-1">
        <p className="text-[11px] tracking-[0.08em] uppercase font-medium text-charcoal">{product.name}</p>
        <p className="text-[12px] font-normal text-mid-grey">{product.price}</p>
      </div>

      {/* ATC */}
      <button
        className="w-full mt-2.5 py-2.5 bg-charcoal text-white text-[11px] tracking-[0.12em] uppercase font-semibold hover:bg-[#2d2d2d] transition-colors active:scale-[0.98] product-atc"
        onClick={handleAddToCart}
        aria-label={`Add ${product.name} to cart`}
      >
        Add to Cart
      </button>

    </article>
  );
}
