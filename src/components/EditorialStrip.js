export default function EditorialStrip() {
  return (
    <section className="bg-charcoal py-16 px-6 text-center" aria-label="Brand philosophy">
      <div className="max-w-[760px] mx-auto">
        <p
          className="font-display text-[clamp(22px,3vw,34px)] font-light italic leading-relaxed tracking-wide mb-4"
          style={{ color: 'rgba(255,255,255,0.92)' }}
        >
          &ldquo;Jewellery is the most personal form of design — it exists where architecture meets skin.&rdquo;
        </p>
        <p
          className="text-[11px] tracking-[0.2em] uppercase"
          style={{ color: 'rgba(255,255,255,0.45)' }}
        >
          — LABEL Design Studio, Mumbai
        </p>
      </div>
    </section>
  );
}
