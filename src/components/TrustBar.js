export default function TrustBar() {
  const items = [
    {
      label: 'Free Shipping',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <rect x="1" y="3" width="15" height="13" rx="1" /><path d="M16 8h4l3 5v3h-7V8z" />
          <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      ),
    },
    {
      label: '30-Day Returns',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-4.51" />
        </svg>
      ),
    },
    {
      label: 'Certified Fine Jewellery',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      label: 'Secure Payments',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-cream border-b border-light-grey py-4 px-6 reveal" aria-label="Brand promises">
      <div className="max-w-[1100px] mx-auto flex flex-wrap items-center justify-center gap-0">
        {items.map((item, i) => (
          <div key={item.label} className="flex items-center gap-0">
            <div className="trust-item flex items-center gap-2.5 px-8 py-2 text-[11px] tracking-[0.1em] uppercase font-medium text-charcoal">
              <span className="text-accent-dark">{item.icon}</span>
              <span>{item.label}</span>
            </div>
            {i < items.length - 1 && (
              <div className="w-px h-7 bg-light-grey hidden sm:block" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
