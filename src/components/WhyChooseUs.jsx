import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Gem, Users, ShieldCheck, Star } from 'lucide-react';

export default function WhyChooseUs() {
  const pillars = [
    {
      icon: Gem,
      title: 'Creative Designs',
      subtitle: 'Unique & Personalized Themes',
      description: 'Artistic concepts and bespoke visual arrangements tailored to elevate the mood of your specific celebration.'
    },
    {
      icon: Users,
      title: 'Experienced Team',
      subtitle: 'Professional & Dedicated',
      description: 'Skilled decorators, audio technicians, and event coordinators passionate about making every detail flawless.'
    },
    {
      icon: ShieldCheck,
      title: 'High Quality Setup',
      subtitle: 'Stylish & Safe Execution',
      description: 'Premium structural stage materials, clean floral styling, safe rigging, and concert-grade audio equipment.'
    },
    {
      icon: Star,
      title: 'Customer Satisfaction',
      subtitle: 'Your Happiness, Our Priority',
      description: 'Dedicated personal communication, timely delivery, and a commitment to turning your celebration into memories that last forever.'
    }
  ];

  return (
    <section id="why-choose-us" className="relative py-24 bg-aura-black overflow-hidden w-full max-w-full">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-aura-gold/5 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
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
              The AURA Standard
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-aura-ivory tracking-tight"
          >
            Why Choose <span className="text-gold-gradient italic font-normal">AURA EVENTS</span>
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
            className="text-base text-aura-muted max-w-xl mx-auto font-light"
          >
            Our core values shape every decorative detail and sound track we deliver.
          </motion.p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="group relative p-8 rounded-2xl bg-aura-card border border-aura-borderGold/30 hover:border-aura-gold transition-all duration-300 hover:shadow-gold-subtle flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-aura-charcoal border border-aura-borderGold flex items-center justify-center mb-6 text-aura-gold group-hover:bg-gold-gradient group-hover:text-aura-black transition-all duration-300 group-hover:scale-110 shadow-sm">
                    <Icon className="w-6 h-6 stroke-[1.5]" />
                  </div>

                  <h3 className="font-serif text-xl font-semibold text-aura-ivory mb-1 group-hover:text-aura-gold transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs font-medium text-aura-gold/90 mb-3 tracking-wide">
                    {pillar.subtitle}
                  </p>

                  <p className="text-sm text-aura-muted leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-aura-borderGold/20 flex items-center justify-between text-xs text-aura-gold/70">
                  <span className="tracking-wider uppercase">Excellence</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-aura-gold/60 group-hover:scale-125 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
