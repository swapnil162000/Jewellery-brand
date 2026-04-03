import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [toast, setToast] = useState({ visible: false, message: '' });
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const toastTimer = useRef(null);

  // Init theme from localStorage / system preference (client-only)
  useEffect(() => {
    const saved = localStorage.getItem('label_theme');
    if (saved) {
      setIsDark(saved === 'dark');
    } else {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    setMounted(true);
  }, []);

  // Apply / remove 'dark' class on <html> — only after init to avoid
  // overwriting the anti-FOUC class and clobbering localStorage on first render
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('label_theme', isDark ? 'dark' : 'light');
  }, [isDark, mounted]);

  const toggleTheme = useCallback(() => setIsDark((d) => !d), []);

  const showToast = useCallback((msg) => {
    clearTimeout(toastTimer.current);
    setToast({ visible: true, message: msg });
    toastTimer.current = setTimeout(
      () => setToast((t) => ({ ...t, visible: false })),
      2800
    );
  }, []);

  const openQuickView = useCallback((product) => {
    setQuickViewProduct(product);
  }, []);

  const closeQuickView = useCallback(() => {
    setQuickViewProduct(null);
  }, []);

  return (
    <UIContext.Provider value={{ toast, showToast, quickViewProduct, openQuickView, closeQuickView, isDark, toggleTheme }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used inside UIProvider');
  return ctx;
}
