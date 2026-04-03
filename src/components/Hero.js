import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { HERO_SLIDES } from '@/data/products';

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback(
    (idx) => {
      const len = HERO_SLIDES.length;
      setCurrent(((idx % len) + len) % len);
    },
    []
  );

  // Autoplay
  useEffect(() => {
    const t = setInterval(() => goTo(current + 1), 5500);
    return () => clearInterval(t);
  }, [current, goTo]);

  // Keyboard
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') goTo(current - 1);
      if (e.key === 'ArrowRight') goTo(current + 1);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [current, goTo]);

  // Touch swipe
  let touchStart = 0;
  function handleTouchStart(e) { touchStart = e.touches[0].clientX; }
  function handleTouchEnd(e) {
    const dx = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(dx) > 50) goTo(dx < 0 ? current + 1 : current - 1);
  }

  return (
    <section
      className="relative overflow-hidden bg-light-grey"
      style={{ height: 'min(90vh, 700px)' }}
      aria-label="Featured collections"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={i}
          className={`hero-slide ${i === current ? 'active' : ''}`}
          aria-label={`${slide.sub} — ${slide.title}`}
        >
          <img
            src={slide.img}
            alt=""
            className="w-full h-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
          {/* key={current} re-mounts text on every slide change, re-triggering CSS animations */}
          <div
            key={current}
            className="absolute text-white text-center"
            style={{
              bottom: '60px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'min(640px, 80%)',
            }}
          >
            <p className="hero-sub text-[11px] tracking-[0.25em] uppercase mb-2.5 opacity-85 font-light">
              {slide.sub}
            </p>
            <h1
              className="hero-title font-display font-light leading-[1.05] mb-7"
              style={{ fontSize: 'clamp(40px, 6vw, 80px)', letterSpacing: '0.01em' }}
            >
              {slide.title}
            </h1>
            <span className="hero-cta inline-block">
              <Link
                href={slide.href}
                className="inline-block px-7 py-3.5 bg-white text-charcoal text-[11px] tracking-[0.14em] uppercase font-semibold hover:bg-charcoal hover:text-white transition-colors"
              >
                {slide.cta}
              </Link>
            </span>
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button
        onClick={() => goTo(current - 1)}
        className="absolute top-1/2 left-5 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/15 backdrop-blur border border-white/30 text-white rounded-full hover:bg-white/28 transition-colors z-10"
        aria-label="Previous slide"
      >
        &#8592;
      </button>
      <button
        onClick={() => goTo(current + 1)}
        className="absolute top-1/2 right-5 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/15 backdrop-blur border border-white/30 text-white rounded-full hover:bg-white/28 transition-colors z-10"
        aria-label="Next slide"
      >
        &#8594;
      </button>

      {/* Dots */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10"
        role="tablist"
        aria-label="Hero slide navigation"
      >
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`dot ${i === current ? 'active' : ''}`}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div
        className="hero-scroll-hint absolute left-1/2 z-10 text-white/60 flex flex-col items-center gap-1.5"
        style={{ bottom: '18px' }}
        aria-hidden="true"
      >
        <span className="text-[9px] tracking-[0.2em] uppercase font-light">Scroll</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
