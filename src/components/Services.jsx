import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import ServiceCard from './ServiceCard';
import { siteConfig } from '../config/siteConfig';

export default function Services({ onEnquireService }) {
  return (
    <section id="services" className="relative py-24 bg-aura-black overflow-hidden w-full max-w-full">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-aura-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-aura-charcoal/80 border border-aura-borderGold mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-aura-gold" />
            <span className="text-xs uppercase tracking-[0.2em] text-aura-gold font-medium">
              What We Do
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-aura-ivory tracking-tight"
          >
            Our Signature <span className="text-gold-gradient italic font-normal">Decoration &amp; DJ Services</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-[2px] bg-gradient-to-r from-transparent via-aura-gold to-transparent mx-auto my-4"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-base text-aura-muted max-w-2xl mx-auto font-light"
          >
            Professional stage decoration, creative birthday themes, luxury wedding setups, and concert-grade DJ sound systems customized for your milestone celebrations.
          </motion.p>
        </div>

        {/* 4 Cards Grid - Equal Height & Responsive Alignment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5 xl:gap-7 items-stretch">
          {siteConfig.services.map((service, idx) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={idx}
              onEnquire={(val) => {
                if (onEnquireService) {
                  onEnquireService(val);
                } else {
                  const form = document.querySelector('#quote-form');
                  if (form) form.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
