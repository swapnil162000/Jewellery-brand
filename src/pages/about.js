import SEO from '@/components/SEO';
import Link from 'next/link';
import { useReveal } from '@/lib/useReveal';

export default function AboutPage() {
  useReveal();

  return (
    <>
      <SEO
        title="About"
        description="The story of LABEL Fine Jewellery — architectural design, Mumbai craftsmanship, and a vision of jewellery as wearable sculpture."
      />

      {/* Page hero */}
      <div className="bg-cream py-16 text-center border-b border-light-grey">
        <p className="text-[11px] tracking-[0.22em] uppercase text-accent mb-3">Our Story</p>
        <h1 className="font-display font-light text-[clamp(36px,5vw,64px)]">About LABEL</h1>
      </div>

      {/* Story section */}
      <section className="py-20 px-6 reveal">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-accent mb-4 text-center">Founded 2018</p>
            <h2
              className="font-display font-light leading-[1.12] mb-5 text-center"
              style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}
            >
              Architecture<br />for the Body
            </h2>
            <p className="text-[14px] text-mid-grey leading-[1.85] mb-4 text-center">
              LABEL was born from a simple conviction: jewellery should be as rigorously considered
              as any great building. Founded in Mumbai in 2018, we set out to create pieces that
              treat the body as a site for spatial exploration.
            </p>
            <p className="text-[14px] text-mid-grey leading-[1.85] mb-4 text-center">
              Every design begins with a structural idea — not a decorative one. A tension between
              positive and negative space. A question about material and weight. The finished piece
              is always the most refined answer to that question.
            </p>
            <p className="text-[14px] text-mid-grey leading-[1.85] mb-8 text-center">
              We work exclusively in 18kt gold-plated brass and sterling silver, with a small team
              of craftspeople who have spent decades perfecting their techniques in Mumbai&rsquo;s
              historic jewellery quarter.
            </p>
          </div>
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src="https://www.mishodesigns.com/cdn/shop/files/nami-choker-2779437.jpg?v=1751545249&width=800"
              alt="LABEL jewellery — the Nami Choker"
              className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-cream reveal" aria-labelledby="values-heading">
        <h2
          id="values-heading"
          className="text-[11px] tracking-[0.18em] uppercase font-semibold mb-16 text-center"
        >
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-[1000px] mx-auto text-center">
          {[
            {
              title: 'Craft',
              desc: 'Every piece is cast, polished and finished by hand in Mumbai. We partner with artisans who share our obsession with precision.',
            },
            {
              title: 'Materiality',
              desc: 'We choose materials for their structural properties, not just their beauty — 18kt gold-plating for warmth, sterling silver for clarity.',
            },
            {
              title: 'Longevity',
              desc: 'We design for permanence. LABEL pieces are built to be worn daily, to age gracefully, and to be passed on.',
            },
          ].map((v) => (
            <div key={v.title} className="reveal-item">
              <h3 className="text-[12px] tracking-[0.16em] uppercase font-semibold mb-4">{v.title}</h3>
              <p className="text-[14px] text-mid-grey leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial quote */}
      <section className="bg-charcoal py-20 px-6 text-center">
        <div className="max-w-[760px] mx-auto">
          <p
          className="font-display text-[clamp(22px,3vw,34px)] font-light italic leading-relaxed tracking-wide mb-4"
          style={{ color: 'rgba(255,255,255,0.92)' }}
        >
            &ldquo;We are not making decorations — we are making propositions about how a person
            might move through the world.&rdquo;
          </p>
          <p
            className="text-[11px] tracking-[0.2em] uppercase"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            — Founder, LABEL Fine Jewellery
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center reveal">
        <h2 className="font-display font-light text-[clamp(28px,4vw,48px)] mb-5">
          Explore the Collections
        </h2>
        <p className="text-[14px] text-mid-grey mb-8">
          Discover pieces designed to become a lasting part of your story.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/earrings" className="px-8 py-3.5 bg-charcoal text-white text-[11px] tracking-[0.14em] uppercase font-semibold hover:bg-[#2d2d2d] transition-colors">
            Shop Earrings
          </Link>
          <Link href="/necklaces" className="px-8 py-3.5 border border-charcoal text-[11px] tracking-[0.14em] uppercase font-semibold hover:bg-charcoal hover:text-white transition-colors">
            Shop Necklaces
          </Link>
          <Link href="/stores" className="px-8 py-3.5 border border-charcoal text-[11px] tracking-[0.14em] uppercase font-semibold hover:bg-charcoal hover:text-white transition-colors">
            Visit Our Stores
          </Link>
        </div>
      </section>
    </>
  );
}
