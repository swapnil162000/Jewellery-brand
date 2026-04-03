import { useEffect, useRef } from 'react';

export default function Toast({ message, visible }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`toast fixed bottom-8 left-1/2 bg-charcoal text-white px-7 py-3 text-[11px] tracking-widest z-[9999] whitespace-nowrap max-w-[90vw] ${visible ? 'show' : ''}`}
    >
      {message}
    </div>
  );
}
