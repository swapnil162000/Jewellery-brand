import Link from 'next/link';
import { useState } from 'react';
import { useUI } from '@/lib/uiContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const { showToast } = useUI();

  function handleNewsletter(e) {
    e.preventDefault();
    if (email) {
      showToast('Thank you for subscribing!');
      setEmail('');
    }
  }

  return (
    <footer className="bg-charcoal text-white pt-16" aria-label="Site footer">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/8">

        {/* Brand */}
        <div>
          <h4 className="text-[10px] tracking-[0.18em] uppercase font-semibold mb-4 text-white/85 text-center">LABEL</h4>
          <p className="text-[13px] text-white/55 leading-loose text-center">
            Architectural fine jewellery crafted in Mumbai. Where design meets adornment.
          </p>
          <div className="flex gap-3.5 mt-6 justify-center">
            {['Instagram', 'Pinterest', 'Facebook'].map((s) => (
              <a
                key={s}
                href="#"
                className="text-white/50 hover:text-white transition-colors text-[11px] tracking-wide"
                aria-label={s}
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Collections */}
        <div>
          <h4 className="text-[10px] tracking-[0.18em] uppercase font-semibold mb-4 text-white/85 text-center">Collections</h4>
          <ul className="space-y-1.5 text-center">
            {[
              { href: '/earrings',  label: 'Earrings' },
              { href: '/necklaces', label: 'Necklaces' },
              { href: '/rings',     label: 'Rings' },
              { href: '/',          label: 'New Arrivals' },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-[13px] text-white/55 hover:text-white transition-colors leading-loose">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Info */}
        <div>
          <h4 className="text-[10px] tracking-[0.18em] uppercase font-semibold mb-4 text-white/85 text-center">Information</h4>
          <ul className="space-y-1.5 text-center">
            {[
              { href: '/about',           label: 'About Us' },
              { href: '/stores',          label: 'Our Stores' },
              { href: '/contact',         label: 'Contact Us' },
              { href: '/shipping-policy', label: 'Shipping Policy' },
              { href: '/returns',         label: 'Returns & Refunds' },
            ].map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-[13px] text-white/55 hover:text-white transition-colors leading-loose">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-[10px] tracking-[0.18em] uppercase font-semibold mb-4 text-white/85 text-center">Newsletter</h4>
          <p className="text-[11px] text-white/50 mb-2.5 tracking-wide text-center">
            New arrivals & exclusive offers.
          </p>
          <form onSubmit={handleNewsletter} className="flex border border-white/15 overflow-hidden">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 min-w-0 px-3 py-2.5 bg-transparent border-none outline-none text-[12px] text-white placeholder-white/28 font-main"
              aria-label="Email address for newsletter"
            />
            <button
              type="submit"
              className="flex-shrink-0 whitespace-nowrap px-4 py-2.5 bg-white/8 text-white text-[10px] tracking-[0.12em] uppercase border-l border-white/15 hover:bg-white/16 transition-colors font-main"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="text-center py-5 text-[11px] text-white/50 tracking-[0.06em]">
        &copy; {new Date().getFullYear()} LABEL Fine Jewellery. All rights reserved.
        &nbsp;&middot;&nbsp;
        Made by{' '}
        <a
          href="https://swapnilthakur.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white font-medium hover:text-cream transition-colors underline underline-offset-2"
        >
          Swapnil Thakur
        </a>
      </div>
    </footer>
  );
}
