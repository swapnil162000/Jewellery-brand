import Layout from '@/components/Layout';
import { StoreProvider } from '@/lib/store';
import { UIProvider } from '@/lib/uiContext';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
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
