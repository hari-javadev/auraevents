import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronDown, HelpCircle, ArrowRight, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../config/siteConfig';

export default function HomeFaq({ onOpenQuote }) {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'What types of event decorations and services does AURA EVENTS offer?',
      a: 'AURA EVENTS is a complete event decoration and entertainment company. We specialize in luxury wedding stage decorations, bridal mandap setups, engagement and reception decor, creative birthday balloon themes, corporate event styling, institutional celebrations, and professional DJ services with concert-grade sound and intelligent stage lighting.',
    },
    {
      q: 'How do I choose the best event decorators near me for my celebration?',
      a: 'The best decorators listen to your vision, respect your budget, and provide customized designs rather than cookie-cutter templates. At AURA EVENTS, we consult with you on color palettes, venue dimensions, and thematic aspirations to deliver a flawless, photogenic setup on time every time.',
    },
    {
      q: 'Do you offer combined decoration and DJ sound packages?',
      a: 'Yes! One of our most popular solutions is our all-in-one celebration package. It seamlessly coordinates your visual stage decor and venue ambiance with our high-energy DJ services, sound systems, moving head dance lights, and special effects (like cold pyro and low fog).',
    },
    {
      q: 'Can you customize decorations for both indoor banquet halls and outdoor venues?',
      a: 'Absolutely. We design and engineer stage backdrops, entrance arches, and lighting rigs specifically suited for indoor air-conditioned hotel halls, convention centers, open-air garden lawns, and intimate living room or terrace house parties.',
    },
    {
      q: 'What is the booking process and how far in advance should I reserve?',
      a: 'We recommend booking 2 to 4 weeks in advance for weddings and major celebrations, and 1 to 2 weeks for birthday parties. Simply submit our online quote form or connect directly with our team on WhatsApp at +91 9500457034 to receive a detailed estimate.',
    },
    {
      q: 'What locations and venues does AURA EVENTS serve?',
      a: 'Based at Salem, Ammapet - 636003, AURA EVENTS serves all places in India. Our team travels nationwide to provide complete stage decorations, wedding setups, birthday decors, and DJ sound production at any hotel, hall, resort, or private venue across India.',
    },
  ];

  const whatsappUrl = getWhatsAppUrl();

  return (
    <section id="faq" className="relative py-24 bg-aura-charcoal/30 border-t border-aura-borderGold/20 overflow-hidden w-full max-w-full">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-aura-card border border-aura-borderGold mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-aura-gold" />
            <span className="text-xs uppercase tracking-[0.2em] text-aura-gold font-medium">
              Got Questions?
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-aura-ivory tracking-tight">
            Frequently Asked <span className="text-gold-gradient italic font-normal">Questions</span>
          </h2>

          <div className="h-[2px] bg-gradient-to-r from-transparent via-aura-gold to-transparent mx-auto my-4 w-20" />

          <p className="text-sm sm:text-base text-aura-muted font-light">
            Everything you need to know about our event decoration, stage styling, and DJ services.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-aura-gold bg-aura-card shadow-gold-subtle'
                    : 'border-aura-borderGold/30 bg-aura-card/60 hover:border-aura-borderGold'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-serif text-base sm:text-lg text-aura-ivory hover:text-aura-gold transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium pr-2">{faq.q}</span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-aura-gold text-aura-black rotate-180'
                        : 'bg-aura-charcoal text-aura-gold'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-aura-beige/85 leading-relaxed font-light border-t border-aura-borderGold/20"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick CTA Box */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-aura-card border border-aura-borderGold/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h3 className="font-serif text-base sm:text-lg font-bold text-aura-ivory">
              Have a custom requirement or specific venue query?
            </h3>
            <p className="text-xs text-aura-muted font-light mt-0.5">
              Our styling team is available 7 days a week to assist you.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                if (onOpenQuote) onOpenQuote();
                else {
                  const el = document.querySelector('#quote-form');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-aura-black bg-gold-gradient hover:shadow-gold-glow transition-all"
            >
              <span>Get Free Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba5a] transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
