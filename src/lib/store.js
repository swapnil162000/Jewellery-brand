import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

const CartContext = createContext(null);
const WishlistContext = createContext(null);

/* ---- helpers ---- */
function getCartTotal(cart) {
  return cart.reduce((sum, item) => {
    const n = parseFloat(String(item.price).replace(/[₹,]/g, ''));
    return sum + (isNaN(n) ? 0 : n);
  }, 0);
}

export function formatPrice(num) {
  return '₹' + Number(num).toLocaleString('en-IN');
}

/* ---- cart reducer ---- */
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, { name: action.name, price: action.price }];
    case 'REMOVE':
      return state.filter((_, i) => i !== action.index);
    case 'HYDRATE':
      return action.payload;
    default:
      return state;
  }
}

/* ---- wishlist reducer ---- */
function wishlistReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE':
      return state.includes(action.name)
        ? state.filter((n) => n !== action.name)
        : [...state, action.name];
    case 'HYDRATE':
      return action.payload;
    default:
      return state;
  }
}

/* ---- provider ---- */
export function StoreProvider({ children }) {
  const [cart, cartDispatch] = useReducer(cartReducer, []);
  const [wishlist, wishlistDispatch] = useReducer(wishlistReducer, []);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem('label_cart') || '[]');
      const savedWishlist = JSON.parse(localStorage.getItem('label_wishlist') || '[]');
      cartDispatch({ type: 'HYDRATE', payload: savedCart });
      wishlistDispatch({ type: 'HYDRATE', payload: savedWishlist });
    } catch (_) {}
  }, []);

  // Persist cart
  useEffect(() => {
    localStorage.setItem('label_cart', JSON.stringify(cart));
  }, [cart]);

  // Persist wishlist
  useEffect(() => {
    localStorage.setItem('label_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = useCallback((name, price) => {
    cartDispatch({ type: 'ADD', name, price });
  }, []);

  const removeFromCart = useCallback((index) => {
    cartDispatch({ type: 'REMOVE', index });
  }, []);

  const toggleWishlist = useCallback((name) => {
    wishlistDispatch({ type: 'TOGGLE', name });
  }, []);

  const cartTotal = getCartTotal(cart);
  const cartCount = cart.length;
  const wishlistCount = wishlist.length;

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartTotal, cartCount }}>
      <WishlistContext.Provider value={{ wishlist, toggleWishlist, wishlistCount }}>
        {children}
      </WishlistContext.Provider>
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside StoreProvider');
  return ctx;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used inside StoreProvider');
  return ctx;
}
