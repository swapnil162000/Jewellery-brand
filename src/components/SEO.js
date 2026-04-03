import Head from 'next/head';
import { seoConfig } from '@/seo.config';

export default function SEO({ title, description, ogImage }) {
  const fullTitle = title ? `${title} | ${seoConfig.siteName}` : seoConfig.defaultTitle;
  const metaDesc = description || seoConfig.defaultDescription;
  const og = ogImage || seoConfig.defaultOgImage;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:type" content="website" />
      {og && <meta property="og:image" content={og} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={seoConfig.twitterHandle} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
