import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export default function About({ onRequestQuote }) {
  const serviceOfferings = [
    'Luxury wedding stage decoration & floral mandap setups',
    'Creative birthday party decoration with custom balloon arches',
    'Engagement stage decoration & intimate ring ceremonies',
    'Corporate event decoration, conferences & cultural fests',
    'Professional DJ services with concert-grade sound & lighting'
  ];

  const handleQuoteClick = () => {
    if (onRequestQuote) {
      onRequestQuote();
    } else {
      const el = document.querySelector('#quote-form');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="relative py-24 bg-aura-charcoal/40 border-y border-aura-borderGold/20 overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Artwork Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Outer decorative golden frame */}
              <div className="absolute -inset-3 rounded-2xl border border-aura-borderGold/40 translate-x-2 translate-y-2 pointer-events-none" />
              
              <div className="relative rounded-xl overflow-hidden bg-aura-charcoal aspect-[4/3] sm:aspect-[16/11] shadow-2xl border border-aura-borderGold">
                <img
                  src="/images/hero.png"
                  alt="AURA EVENTS Stage Decoration"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-aura-black/80 via-transparent to-transparent pointer-events-none" />
                
                {/* Embedded Quote Tagline */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-aura-black/85 backdrop-blur-md border border-aura-borderGold/30">
                  <p className="font-serif text-sm sm:text-base text-aura-gold italic">
                    “{siteConfig.tagline}”
                  </p>
                  <p className="text-xs text-aura-muted mt-1">
                    AURA EVENTS — Crafting Unforgettable Celebrations
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial & Description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-aura-card border border-aura-borderGold w-fit mb-4">
              <Sparkles className="w-3.5 h-3.5 text-aura-gold" />
              <span className="text-xs uppercase tracking-[0.2em] text-aura-gold font-medium">
                About AURA EVENTS
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-aura-ivory tracking-tight leading-tight mb-6">
              Premier Event Decorators &amp; DJ Planners &mdash; <br />
              <span className="text-gold-gradient italic font-normal">Creating Moments That Last Forever.</span>
            </h2>

            <p className="text-base sm:text-lg text-aura-beige/90 leading-relaxed font-light mb-5">
              At <strong>AURA EVENTS</strong>, we are a professional event decoration company and event management team dedicated to making every milestone celebration extraordinary. As experienced decorators, we translate your celebration dreams into reality—crafting bespoke wedding stage decorations, creative birthday balloon themes, corporate event styling, and high-energy DJ sound environments.
            </p>

            <p className="text-sm text-aura-muted leading-relaxed mb-6 font-light">
              Whether you are searching for the best event decorators near you for a wedding reception, engagement stage, milestone birthday, or grand corporate function, our team coordinates the aesthetic styling and technical AV execution with unmatched creativity and care. Based at Salem, Ammapet - 636003, we proudly serve venues across all places in India.
            </p>

            {/* Factual Core Service Offerings List */}
            <div className="space-y-3 mb-8">
              {serviceOfferings.map((offering, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-aura-gold flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-aura-ivory/90 font-medium">
                    {offering}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div>
              <button
                type="button"
                onClick={handleQuoteClick}
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide text-aura-black bg-gold-gradient hover:shadow-gold-glow hover:scale-105 active:scale-[0.98] transition-all duration-300"
              >
                <span>Request a Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
