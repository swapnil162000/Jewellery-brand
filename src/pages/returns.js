import SEO from '@/components/SEO';
import { useReveal } from '@/lib/useReveal';
import Link from 'next/link';

const SECTIONS = [
  {
    title: 'Return Eligibility',
    body: `We accept returns on most items within 14 days of delivery, provided the piece is:\n• Unworn and in its original condition\n• In its original LABEL packaging (box and velvet pouch)\n• Accompanied by your order confirmation email\n\nThe following items are non-returnable:\n• Bespoke, engraved, or customised pieces\n• Earrings (for hygiene reasons)\n• Items purchased during final sale`,
  },
  {
    title: 'How to Initiate a Return',
    body: `To start a return, email us at hello@labeljewellery.in with the subject line "Return — [Your Order Number]". Please include:\n• Your full name and order number\n• The item(s) you wish to return\n• Reason for the return\n\nOur team will respond within 2 business days with return instructions and a prepaid label (India only).`,
  },
  {
    title: 'Exchanges',
    body: `We're happy to exchange a piece for a different size or style where stock permits. Please follow the same return initiation process and indicate you'd like an exchange. Any price difference will be charged or refunded accordingly.`,
  },
  {
    title: 'Refunds',
    body: `Once we receive and inspect your returned item, we will notify you by email.\n\nApproved refunds are processed to your original payment method within 5–7 business days. Please allow an additional 3–5 days for your bank to reflect the credit.\n\nOriginal shipping charges are non-refundable unless the return is due to a defect or an error on our part.`,
  },
  {
    title: 'Damaged or Defective Items',
    body: `If your jewellery arrives damaged or defective, please contact us within 48 hours of delivery at hello@labeljewellery.in with photos of the piece and packaging. We will arrange a replacement or full refund at no cost to you.`,
  },
  {
    title: 'International Returns',
    body: `International customers are responsible for return shipping costs and any associated customs duties. We recommend using a tracked, insured shipping service. LABEL is not responsible for items lost in transit during return shipment.`,
  },
];

export default function ReturnsPage() {
  useReveal();

  return (
    <>
      <SEO
        title="Returns & Refunds"
        description="LABEL Fine Jewellery return and refund policy. Returns accepted within 14 days of delivery on eligible items."
      />

      {/* Page hero */}
      <div className="bg-cream py-16 text-center border-b border-light-grey">
        <p className="text-[11px] tracking-[0.22em] uppercase text-accent mb-3">Policy</p>
        <h1 className="font-display font-light text-[clamp(36px,5vw,64px)]">Returns &amp; Refunds</h1>
        <p className="text-[13px] text-mid-grey mt-4 max-w-md mx-auto leading-relaxed">
          Your satisfaction matters. We&apos;ve made our returns process as simple as possible.
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
              Need help with a return or have a question?
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
