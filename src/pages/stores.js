import SEO from '@/components/SEO';
import { useReveal } from '@/lib/useReveal';
import { STORES } from '@/data/products';

export default function StoresPage() {
  useReveal();

  return (
    <>
      <SEO
        title="Our Stores"
        description="Visit LABEL Fine Jewellery stores in Mumbai and Delhi. Find us at Bandra West and Khan Market."
      />

      {/* Page hero */}
      <div className="bg-cream py-16 text-center border-b border-light-grey">
        <p className="text-[11px] tracking-[0.22em] uppercase text-accent mb-3">Retail</p>
        <h1 className="font-display font-light text-[clamp(36px,5vw,64px)]">Our Stores</h1>
        <p className="text-[13px] text-mid-grey mt-4 max-w-md mx-auto leading-relaxed">
          Visit us in person — our stores are designed as immersive jewellery experiences.
        </p>
      </div>

      {/* Stores grid */}
      <section className="py-20 px-6 bg-cream" aria-labelledby="stores-heading">
        <h2 id="stores-heading" className="sr-only">Store Locations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1000px] mx-auto">
          {STORES.map((store) => (
            <div
              key={store.id}
              className="bg-white border border-light-grey overflow-hidden hover:shadow-soft hover:-translate-y-0.5 transition-all reveal"
            >
              {/* Map placeholder */}
              <div className="h-48 bg-light-grey flex items-center justify-center">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-40" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>

              {/* Info */}
              <div className="p-7 text-center">
                <h3 className="text-[12px] tracking-[0.14em] uppercase mb-3 font-semibold">{store.name}</h3>
                <address className="not-italic">
                  <p className="text-[13px] text-mid-grey mb-2 leading-loose whitespace-pre-line">{store.address}</p>
                  <p className="text-[13px] text-mid-grey mb-2">
                    <a href={`tel:${store.phone}`} className="hover:text-charcoal transition-colors">{store.phone}</a>
                  </p>
                  <p className="text-[13px] text-mid-grey mb-4">
                    <a href={`mailto:${store.email}`} className="hover:text-charcoal transition-colors">{store.email}</a>
                  </p>
                </address>
                <p className="text-[13px] text-charcoal font-medium">{store.hours}</p>
                <a
                  href="#"
                  className="inline-block mt-4 text-[11px] tracking-[0.12em] uppercase underline text-charcoal hover:text-accent-dark transition-colors"
                >
                  Get Directions
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* In-store experience */}
      <section className="py-20 px-6 text-center reveal">
        <div className="max-w-[640px] mx-auto">
          <p className="text-[11px] tracking-[0.22em] uppercase text-accent mb-4">Private Appointments</p>
          <h2 className="font-display font-light text-[clamp(28px,4vw,48px)] mb-5">
            Book a Personal Styling Session
          </h2>
          <p className="text-[14px] text-mid-grey leading-relaxed mb-8">
            Our in-store stylists will curate a selection of pieces tailored to your style and occasion.
            Complimentary for all clients.
          </p>
          <button className="px-10 py-3.5 bg-charcoal text-white text-[11px] tracking-[0.16em] uppercase font-semibold hover:bg-[#2d2d2d] transition-colors">
            Book Appointment
          </button>
        </div>
      </section>
    </>
  );
}
