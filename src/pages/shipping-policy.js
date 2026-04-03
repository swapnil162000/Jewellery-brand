import SEO from '@/components/SEO';
import { useReveal } from '@/lib/useReveal';
import Link from 'next/link';

const SECTIONS = [
  {
    title: 'Processing Time',
    body: `All LABEL pieces are carefully inspected and packaged before dispatch. Standard orders are processed within 1–2 business days. During sale periods or peak seasons, processing may take up to 3 business days.`,
  },
  {
    title: 'Domestic Shipping (India)',
    body: `We offer complimentary shipping on all orders above ₹5,000 within India.\n\nFor orders below ₹5,000, a flat shipping fee of ₹150 applies.\n\nEstimated delivery times:\n• Metro cities — 2–4 business days\n• Tier 2 & Tier 3 cities — 4–7 business days\n\nAll domestic shipments are fully insured and sent via our trusted courier partners.`,
  },
  {
    title: 'International Shipping',
    body: `We ship to select international destinations. International shipping rates and delivery timelines are calculated at checkout based on destination and order weight.\n\nEstimated delivery: 7–14 business days.\n\nPlease note: International customers are responsible for any customs duties, taxes, or import fees levied by their country. LABEL is not liable for delays caused by customs clearance.`,
  },
  {
    title: 'Order Tracking',
    body: `Once your order is dispatched, you will receive a shipping confirmation email with a tracking number. You can use this to track your order through the courier's website.\n\nIf you have not received your tracking details within 3 business days of placing your order, please contact us at hello@labeljewellery.in.`,
  },
  {
    title: 'Packaging',
    body: `Every piece arrives in our signature LABEL box, nestled in a velvet pouch — complimentary gift wrapping is available at checkout. We use fully recyclable outer packaging.`,
  },
];

export default function ShippingPolicyPage() {
  useReveal();

  return (
    <>
      <SEO
        title="Shipping Policy"
        description="Information on LABEL Fine Jewellery shipping, processing times, international delivery, and order tracking."
      />

      {/* Page hero */}
      <div className="bg-cream py-16 text-center border-b border-light-grey">
        <p className="text-[11px] tracking-[0.22em] uppercase text-accent mb-3">Delivery</p>
        <h1 className="font-display font-light text-[clamp(36px,5vw,64px)]">Shipping Policy</h1>
        <p className="text-[13px] text-mid-grey mt-4 max-w-md mx-auto leading-relaxed">
          We want your jewellery to arrive beautifully and on time.
        </p>
      </div>

      <section className="py-20 px-6 bg-cream">
        <div className="max-w-[720px] mx-auto space-y-12">
          {SECTIONS.map((sec) => (
            <div key={sec.title} className="reveal">
              <h2 className="font-display font-light text-[24px] mb-4 pb-3 border-b border-light-grey">
                {sec.title}
              </h2>
              <div className="space-y-3">
                {sec.body.split('\n').map((line, i) =>
                  line === '' ? null : (
                    <p key={i} className="text-[13px] text-mid-grey leading-loose">
                      {line}
                    </p>
                  )
                )}
              </div>
            </div>
          ))}

          {/* CTA */}
          <div className="reveal text-center pt-8 border-t border-light-grey">
            <p className="text-[13px] text-mid-grey mb-5">
              Still have questions about your delivery?
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 border border-charcoal text-charcoal text-[11px] tracking-[0.12em] uppercase font-semibold hover:bg-charcoal hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
