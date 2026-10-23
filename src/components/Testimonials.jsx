import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Priya & Karthik',
      role: 'Wedding Reception',
      rating: 5,
      comment:
        'AURA EVENTS completely transformed our wedding reception stage! The floral backdrop, royal lighting, and entrance arch looked straight out of a fairy tale. All our guests complimented the luxury aesthetic.',
      service: 'Wedding Stage Decoration',
    },
    {
      name: 'Rajesh Subramanian',
      role: "Daughter's 1st Birthday",
      rating: 5,
      comment:
        'The pastel balloon arch and thematic stage setup for our daughter’s first birthday was absolutely magical. Punctual team, courteous coordination, and flawless execution. Highly recommended!',
      service: 'Birthday Decoration',
    },
    {
      name: 'Anita Roy',
      role: 'Corporate Gala & DJ Night',
      rating: 5,
      comment:
        'We booked AURA EVENTS for our annual company awards and after-party DJ. The sound system was crystal-clear, the moving head lights created a festival atmosphere, and the DJ kept everyone on the dance floor!',
      service: 'DJ Services & Sound',
    },
  ];

  return (
    <section id="reviews" className="relative py-24 bg-aura-black overflow-hidden w-full max-w-full">
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
              Client Love
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-aura-ivory tracking-tight"
          >
            Words from Our <span className="text-gold-gradient italic font-normal">Celebrations</span>
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
            Real feedback from families and hosts whose special milestones we had the honor of styling.
          </motion.p>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="p-8 rounded-2xl bg-aura-card border border-aura-borderGold/40 hover:border-aura-gold transition-all duration-300 shadow-xl flex flex-col justify-between relative group hover:-translate-y-1.5"
            >
              <Quote className="w-8 h-8 text-aura-gold/20 absolute top-6 right-6 group-hover:text-aura-gold/40 transition-colors" />

              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4 text-aura-gold">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-aura-gold" />
                  ))}
                </div>

                <p className="text-sm text-aura-beige/90 leading-relaxed font-light italic mb-6">
                  “{rev.comment}”
                </p>
              </div>

              <div className="pt-4 border-t border-aura-borderGold/20 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-base font-bold text-aura-ivory">
                    {rev.name}
                  </h3>
                  <p className="text-xs text-aura-muted font-light">
                    {rev.role}
                  </p>
                </div>
                <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-aura-charcoal text-aura-gold border border-aura-borderGold/40 font-medium">
                  {rev.service}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
