import Link from 'next/link';
import { useEffect } from 'react';
import SEO from '@/components/SEO';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import ProductGrid from '@/components/ProductGrid';
import EditorialStrip from '@/components/EditorialStrip';
import CategoryGrid from '@/components/CategoryGrid';
import SectionHeader from '@/components/SectionHeader';
import { PRODUCTS } from '@/data/products';
import { useReveal } from '@/lib/useReveal';
import { useUI } from '@/lib/uiContext';

export default function HomePage() {
  useReveal();
  const { showToast } = useUI();

  const newArrivals = PRODUCTS.filter((p) => p.isNew);
  const earrings = PRODUCTS.filter((p) => p.category === 'earrings');
  const necklaces = PRODUCTS.filter((p) => p.category === 'necklaces');

  return (
    <>
      <SEO />
      <Hero />
      <TrustBar />

      {/* New Arrivals */}
      <section className="py-20 px-6 max-w-[1400px] mx-auto reveal" id="new-arrivals" aria-labelledby="new-arrivals-heading">
        <SectionHeader
          title="New Arrivals"
          action={{ label: 'View All', onClick: () => showToast('Full collection coming soon — visit our stores') }}
        />
        <ProductGrid products={newArrivals} />
      </section>

      <EditorialStrip />

      {/* Earrings */}
      <section className="py-20 px-6 max-w-[1400px] mx-auto reveal" id="earrings" aria-labelledby="earrings-heading">
        <SectionHeader
          title="Earrings"
          action={{ label: 'View All', onClick: () => showToast('Full earrings collection coming soon') }}
        />
        <ProductGrid products={earrings.slice(0, 4)} />
      </section>

      {/* Necklaces */}
      <section className="py-20 px-6 max-w-[1400px] mx-auto reveal" id="necklaces" aria-labelledby="necklaces-heading">
        <SectionHeader
          title="Necklaces"
          action={{ label: 'View All', onClick: () => showToast('Full necklaces collection coming soon') }}
        />
        <ProductGrid products={necklaces} />
      </section>

      <CategoryGrid />

      {/* About teaser */}
      <section className="py-20 px-6 reveal" id="about-teaser">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-accent mb-4 text-center">Our Story</p>
            <h2
              className="font-display font-light leading-[1.12] mb-5 text-center"
              style={{ fontSize: 'clamp(32px, 4vw, 56px)', letterSpacing: '0.01em' }}
            >
              Where Architecture<br />Meets Adornment
            </h2>
            <p className="text-[14px] text-mid-grey leading-[1.85] mb-4 text-center">
              LABEL was born in Mumbai with one conviction: jewellery should be as rigorously
              considered as any great building. Every piece begins with a structural idea — a form,
              a tension, an interplay of negative space.
            </p>
            <p className="text-[14px] text-mid-grey leading-[1.85] mb-8 text-center">
              We work exclusively in 18kt gold-plated brass and sterling silver, with a small team
              of craftspeople who have spent decades perfecting their art.
            </p>
            <div className="text-center">
              <Link href="/about" className="inline-block px-8 py-3 border border-charcoal text-[11px] tracking-[0.14em] uppercase font-semibold hover:bg-charcoal hover:text-white transition-colors">
                Read Our Story
              </Link>
            </div>
          </div>
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src="https://www.mishodesigns.com/cdn/shop/files/hashi-earrings-2315264.jpg?v=1757581233&width=800"
              alt="LABEL jewellery craftsmanship"
              className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}
