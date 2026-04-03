import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { StoreProvider } from '@/lib/store';
import { UIProvider } from '@/lib/uiContext';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Page fade-in transition on route change
  useEffect(() => {
    const handleRouteChange = () => {
      // Remove then re-add so the animation re-fires
      const main = document.getElementById('main-content');
      if (!main) return;
      main.classList.remove('page-transition-enter');
      void main.offsetWidth; // reflow
      main.classList.add('page-transition-enter');
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  return (
    <StoreProvider>
      <UIProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UIProvider>
    </StoreProvider>
  );
}
