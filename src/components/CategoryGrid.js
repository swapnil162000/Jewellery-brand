import Link from 'next/link';
import { CATEGORIES } from '@/data/products';

export default function CategoryGrid() {
  return (
    <section className="py-20 px-6 bg-charcoal text-white" aria-labelledby="categories-heading">
      <h2
        id="categories-heading"
        className="text-[11px] tracking-[0.18em] uppercase font-semibold mb-10 text-center"
      >
        Shop by Category
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0.5 max-w-[1400px] mx-auto">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/${cat.slug}`}
            className="category-tile relative overflow-hidden block"
            style={{ aspectRatio: '3/4' }}
            aria-label={`Shop ${cat.label}`}
          >
            <img
              src={cat.img}
              alt={cat.label}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Gradient overlay */}
            <div className="cat-overlay" aria-hidden="true" />
            {/* Label with animated underline */}
            <span className="cat-label absolute bottom-6 left-1/2 -translate-x-1/2 text-white z-10">
              <span className="cat-label-text text-[11px] tracking-[0.22em] font-semibold uppercase whitespace-nowrap block">
                {cat.label}
              </span>
              <span className="cat-line" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
