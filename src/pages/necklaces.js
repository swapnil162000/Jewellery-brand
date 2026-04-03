import SEO from '@/components/SEO';
import ProductGrid from '@/components/ProductGrid';
import SectionHeader from '@/components/SectionHeader';
import { PRODUCTS } from '@/data/products';
import { useReveal } from '@/lib/useReveal';
import { useUI } from '@/lib/uiContext';

export default function NecklacesPage() {
  useReveal();
  const { showToast } = useUI();
  const necklaces = PRODUCTS.filter((p) => p.category === 'necklaces');

  return (
    <>
      <SEO
        title="Necklaces"
        description="LABEL necklace collection — wave-inspired chokers, geometric pendants and cord necklaces in 18kt gold-plated silver."
      />

      {/* Page hero */}
      <div className="bg-cream py-16 text-center border-b border-light-grey">
        <p className="text-[11px] tracking-[0.22em] uppercase text-accent mb-3">Collection</p>
        <h1 className="font-display font-light text-[clamp(36px,5vw,64px)]">Necklaces</h1>
        <p className="text-[13px] text-mid-grey mt-4 max-w-md mx-auto leading-relaxed">
          Chokers, pendants and cord necklaces — fluid forms that drape beautifully.
        </p>
      </div>

      <section className="py-20 px-6 max-w-[1400px] mx-auto">
        <SectionHeader
          title={`${necklaces.length} Pieces`}
          action={{ label: 'View All Styles', onClick: () => showToast('Full collection coming soon — visit our stores') }}
        />
        <div className="reveal">
          <ProductGrid products={necklaces} />
        </div>
      </section>
    </>
  );
}
