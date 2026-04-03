import { useState } from 'react';
import SEO from '@/components/SEO';
import { useReveal } from '@/lib/useReveal';
import { useUI } from '@/lib/uiContext';

export default function ContactPage() {
  useReveal();
  const { showToast } = useUI();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    showToast('Message sent — we will be in touch soon.');
    setForm({ name: '', email: '', subject: '', message: '' });
  }

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with LABEL Fine Jewellery. We're here to help with orders, bespoke enquiries and anything else."
      />

      {/* Page hero */}
      <div className="bg-cream py-16 text-center border-b border-light-grey">
        <p className="text-[11px] tracking-[0.22em] uppercase text-accent mb-3">Get in touch</p>
        <h1 className="font-display font-light text-[clamp(36px,5vw,64px)]">Contact Us</h1>
        <p className="text-[13px] text-mid-grey mt-4 max-w-md mx-auto leading-relaxed">
          Questions about an order, a bespoke piece, or just want to say hello? We&apos;d love to hear from you.
        </p>
      </div>

      <section className="py-20 px-6 bg-cream">
        <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-14">

          {/* Contact details */}
          <div className="reveal">
            <h2 className="font-display font-light text-[28px] mb-8">Our Details</h2>

            <div className="space-y-8">
              <div>
                <p className="text-[10px] tracking-[0.18em] uppercase font-semibold text-charcoal mb-2">Email</p>
                <a href="mailto:swapnilthakur162000@gmail.com" className="text-[13px] text-mid-grey hover:text-charcoal transition-colors">
                  swapnilthakur162000@gmail.com
                </a>
              </div>

              <div>
                <p className="text-[10px] tracking-[0.18em] uppercase font-semibold text-charcoal mb-2">Phone</p>
                <a href="tel:+91123456789" className="text-[13px] text-mid-grey hover:text-charcoal transition-colors">
                  +91 123456789
                </a>
                <p className="text-[11px] text-mid-grey mt-1">Mon – Sat, 10am – 7pm IST</p>
              </div>

              <div>
                <p className="text-[10px] tracking-[0.18em] uppercase font-semibold text-charcoal mb-2">Mumbai</p>
                <address className="not-italic text-[13px] text-mid-grey leading-loose">
                  14 Pali Mala Road<br />
                  Bandra West, Mumbai 400 050
                </address>
              </div>

              <div>
                <p className="text-[10px] tracking-[0.18em] uppercase font-semibold text-charcoal mb-2">Delhi</p>
                <address className="not-italic text-[13px] text-mid-grey leading-loose">
                  8 Khan Market<br />
                  New Delhi 110 003
                </address>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="reveal">
            <h2 className="font-display font-light text-[28px] mb-8">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="name" className="block text-[10px] tracking-[0.14em] uppercase font-semibold mb-1.5">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-light-grey px-4 py-3 text-[13px] bg-white outline-none focus:border-charcoal transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-[10px] tracking-[0.14em] uppercase font-semibold mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-light-grey px-4 py-3 text-[13px] bg-white outline-none focus:border-charcoal transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-[10px] tracking-[0.14em] uppercase font-semibold mb-1.5">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full border border-light-grey px-4 py-3 text-[13px] bg-white outline-none focus:border-charcoal transition-colors"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-[10px] tracking-[0.14em] uppercase font-semibold mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={handleChange}
                  className="w-full border border-light-grey px-4 py-3 text-[13px] bg-white outline-none focus:border-charcoal transition-colors resize-none"
                  placeholder="Tell us more..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-charcoal text-white text-[11px] tracking-[0.14em] uppercase font-semibold hover:bg-[#2d2d2d] transition-colors active:scale-[0.99]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
