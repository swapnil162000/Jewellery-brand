import { useEffect, useRef, useState } from 'react';

const QUOTE = '\u201cJewellery is the most personal form of design \u2014 it exists where architecture meets skin.\u201d';

export default function EditorialStrip() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = QUOTE.split(' ');

  return (
    <section className="bg-charcoal py-16 px-6 text-center" aria-label="Brand philosophy">
      <div className="max-w-[760px] mx-auto" ref={ref}>
        <p
          className={`word-reveal font-display text-[clamp(22px,3vw,34px)] font-light italic leading-relaxed tracking-wide mb-4${inView ? ' in-view' : ''}`}
          style={{ color: 'rgba(255,255,255,0.92)' }}
          aria-label={QUOTE}
        >
          {words.map((word, i) => (
            <span
              key={i}
              className="wrd"
              aria-hidden="true"
              style={inView ? { animationDelay: `${0.04 * i}s` } : {}}
            >
              {word}{i < words.length - 1 ? '\u00a0' : ''}
            </span>
          ))}
        </p>
        <p
          className="text-[11px] tracking-[0.2em] uppercase"
          style={{ color: 'rgba(255,255,255,0.45)', animationDelay: `${0.04 * words.length + 0.1}s` }}
        >
          &mdash; LABEL Design Studio, Mumbai
        </p>
      </div>
    </section>
  );
}
