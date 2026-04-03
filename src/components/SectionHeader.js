export default function SectionHeader({ title, action }) {
  return (
    <div className="flex items-baseline justify-between mb-10 border-b border-light-grey pb-4">
      <h2 className="text-[11px] tracking-[0.18em] uppercase font-semibold">{title}</h2>
      {action && (
        <button
          className="text-[11px] tracking-[0.14em] uppercase font-semibold border border-charcoal px-6 py-2.5 hover:bg-charcoal hover:text-white transition-colors"
          onClick={action.onClick}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
