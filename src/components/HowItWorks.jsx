import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ClipboardEdit, MessageSquareText, FileCheck2, PartyPopper } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: ClipboardEdit,
      title: 'Share Your Requirements',
      description: 'Fill out our quick quote form or message us on WhatsApp with your event date, type, and preferences.'
    },
    {
      number: '02',
      icon: MessageSquareText,
      title: 'Discuss Your Vision',
      description: 'We connect with you to understand your aesthetic theme, venue dimensions, color schemes, and DJ requirements.'
    },
    {
      number: '03',
      icon: FileCheck2,
      title: 'Receive Your Quote',
      description: 'We present a transparent, tailored proposal outlining the decoration elements, audio setup, and pricing.'
    },
    {
      number: '04',
      icon: PartyPopper,
      title: 'Celebrate Your Special Day',
      description: 'Our team delivers punctually, manages the complete setup flawlessly, and brings high-energy vibes to your event.'
    }
  ];

  return (
    <section id="how-it-works" className="relative py-24 bg-aura-black overflow-hidden w-full max-w-full">
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
              Seamless Process
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-aura-ivory tracking-tight"
          >
            How It <span className="text-gold-gradient italic font-normal">Works</span>
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
            From your first message to the final encore, we make planning your event effortless.
          </motion.p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-[1px] bg-gradient-to-r from-aura-gold/10 via-aura-gold/40 to-aura-gold/10 -translate-y-8 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="flex flex-col items-center text-center p-6 rounded-2xl bg-aura-card/70 border border-aura-borderGold/30 hover:border-aura-gold transition-all duration-300 hover:shadow-gold-subtle"
                >
                  {/* Step Badge & Icon */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-aura-charcoal border border-aura-borderGold flex items-center justify-center text-aura-gold shadow-md">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-gold-gradient text-aura-black text-xs font-bold flex items-center justify-center shadow-md">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-aura-ivory mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-aura-muted leading-relaxed font-light">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
