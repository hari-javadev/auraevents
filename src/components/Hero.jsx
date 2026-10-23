import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronDown, Calendar, ArrowRight } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import GoldenButterflies from './GoldenButterflies';

export default function Hero({ onBookEvent, onExploreServices }) {
  const handleScrollToQuote = () => {
    if (onBookEvent) {
      onBookEvent();
    } else {
      const el = document.querySelector('#quote-form');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToServices = () => {
    if (onExploreServices) {
      onExploreServices();
    } else {
      const el = document.querySelector('#services');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] sm:min-h-screen lg:h-screen lg:max-h-[850px] xl:max-h-[920px] flex flex-col justify-center items-center overflow-hidden pt-14 sm:pt-[76px] pb-6 sm:pb-10 w-full max-w-full"
    >
      {/* Background Hero Image with Responsive Positioning */}
      <div className="absolute inset-0 z-0">
        <img
          src={siteConfig.heroImage}
          alt="AURA EVENTS — Luxury Wedding Stage Decoration, Birthday Decorators & DJ Services"
          className="w-full h-full object-cover object-center lg:object-top transform scale-100 motion-safe:scale-105 motion-safe:transition-transform motion-safe:duration-10000"
          loading="eager"
        />

        {/* Cinematic Multi-Layer Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-aura-black via-aura-black/75 to-aura-black/60" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-aura-black/40 to-aura-black/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-aura-gold/15 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Gentle Floating Golden Butterflies Layer - Hero Only, behind text & logo */}
      <GoldenButterflies />

      {/* Main Hero Content - Kept within first screen, perfectly centered on mobile and desktop */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center w-full my-auto">
        
        {/* Badge: Hidden on mobile screen, visible on tablet/desktop */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-aura-charcoal/85 border border-aura-borderGold backdrop-blur-md mb-2 sm:mb-3 shadow-gold-subtle"
        >
          <Sparkles className="w-3.5 h-3.5 text-aura-gold animate-pulse" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-aura-gold font-semibold">
            Premium Event Decorators &amp; DJ Services
          </span>
        </motion.div>

        {/* Centered AURA EVENTS Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mb-3 sm:mb-4 flex justify-center items-center mx-auto"
        >
          {/* Radiant warm golden glow behind center logo */}
          <div className="absolute -inset-5 bg-aura-gold/25 blur-3xl rounded-full scale-90 pointer-events-none" />

          <img
            src={siteConfig.logo}
            alt="AURA EVENTS"
            className="w-[220px] sm:w-[245px] md:w-[270px] lg:w-[280px] h-auto object-contain relative z-10 drop-shadow-[0_16px_32px_rgba(0,0,0,0.95)] filter transition-transform duration-300 hover:scale-105 mx-auto"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </motion.div>

        {/* Centered Headline with increased mobile typography */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-serif text-[28px] sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[50px] font-medium tracking-tight text-aura-ivory max-w-[340px] sm:max-w-4xl text-center mx-auto leading-[1.18] mb-3 sm:mb-3.5"
        >
          We Make Every<br className="sm:hidden" />{' '}
          <span className="text-gold-gradient italic font-normal">
            Celebration Special
          </span>
        </motion.h1>

        {/* Centered Supporting Description Text with increased size */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm sm:text-base md:text-lg text-aura-beige/90 max-w-[330px] sm:max-w-2xl mx-auto text-center leading-relaxed font-light mb-5 sm:mb-6"
        >
          Premier event decorators for luxury wedding stages, birthday parties, corporate setups, and concert-grade DJ services crafted to perfection.
        </motion.p>

        {/* Centered Action Buttons with increased size and comfortable tap area */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-[310px] sm:max-w-none mx-auto"
        >
          <button
            type="button"
            onClick={handleScrollToServices}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold tracking-wide text-aura-black bg-gold-gradient rounded-full shadow-gold-glow hover:scale-105 active:scale-[0.98] transition-all duration-300 group"
          >
            <span>Explore Our Services</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <button
            type="button"
            onClick={handleScrollToQuote}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-medium tracking-wide text-aura-ivory bg-aura-charcoal/80 hover:bg-aura-charcoal border border-aura-borderGold hover:border-aura-gold rounded-full backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-[0.98]"
          >
            <Calendar className="w-4 h-4 text-aura-gold" />
            <span>Book Your Event</span>
          </button>
        </motion.div>
      </div>

      {/* Subtle Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="absolute bottom-2 sm:bottom-3 left-1/2 transform -translate-x-1/2 z-10 hidden sm:flex flex-col items-center cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
        onClick={handleScrollToServices}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-aura-beige/80 mb-0.5 font-medium">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-aura-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
