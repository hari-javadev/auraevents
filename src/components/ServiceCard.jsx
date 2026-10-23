import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Crown, 
  PartyPopper, 
  Gem, 
  Music, 
  CheckCircle2, 
  RotateCw, 
  RotateCcw 
} from 'lucide-react';

const ICON_MAP = {
  Crown,
  PartyPopper,
  Gem,
  Music,
  Sparkles,
};

export default function ServiceCard({ service, onEnquire, index }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  // Determine the relevant icon component
  const ServiceIcon = (service.icon && ICON_MAP[service.icon]) || Sparkles;

  // Title for the front card (Card 1 explicitly displays "STAGE DECORATION")
  const frontTitle = service.title || service.name;

  // Key services for the backside list
  const keyServicesList = service.keyServices || [
    'Custom Thematic Designing & Setup',
    'Premium Materials & Flawless Execution',
    'Timely Delivery & Professional Styling',
    'Tailored Packages for Milestone Celebrations'
  ];

  const handleCardClick = (e) => {
    // Prevent flipping if clicked on interactive buttons or links
    if (e.target.closest('button') || e.target.closest('a')) {
      return;
    }
    setIsFlipped((prev) => !prev);
  };

  const handleEnquireClick = (e) => {
    e.stopPropagation();
    onEnquire(service.formValue);
  };

  const handleFlipBack = (e) => {
    e.stopPropagation();
    setIsFlipped(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.65,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1.0],
      }}
      className="flip-card-perspective flip-card-hover w-full max-w-sm sm:max-w-none mx-auto h-[510px] sm:h-[520px] select-none"
    >
      <div
        onClick={handleCardClick}
        className={`flip-card-inner cursor-pointer ${isFlipped ? 'is-flipped' : ''}`}
        aria-label={`${service.name} card. Click or hover to flip for details.`}
      >
        {/* ==================== FRONT FACE ==================== */}
        <div className="flip-card-front flex flex-col justify-between bg-aura-card border border-aura-borderGold/40 hover:border-aura-gold transition-colors duration-300 shadow-xl overflow-hidden group">
          
          {/* Top: Service Image with Shimmer */}
          <div className="relative w-full h-[220px] sm:h-[230px] overflow-hidden bg-aura-charcoal">
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-aura-charcoal animate-pulse">
                <Sparkles className="w-8 h-8 text-aura-gold/40" />
              </div>
            )}

            {imageError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-aura-charcoal text-aura-muted">
                <Sparkles className="w-10 h-10 text-aura-gold mb-2" />
                <span className="font-serif text-lg text-aura-ivory">{frontTitle}</span>
              </div>
            ) : (
              <img
                src={service.image}
                alt={`${frontTitle} by AURA EVENTS — Professional Event Decorators`}
                width="1346"
                height="1140"
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                className={`w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}

            {/* Cinematic bottom vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-aura-card via-aura-card/30 to-transparent pointer-events-none" />

            {/* Auto shimmer light sweep animation across cards */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-aura-gold/25 via-white/15 to-transparent animate-auto-shimmer pointer-events-none"
              style={{ animationDelay: `${index * 1.3}s` }}
            />
          </div>

          {/* Center: Overlapping Icon Badge */}
          <div className="relative -mt-6 z-10 flex justify-center">
            <div className="w-12 h-12 rounded-full bg-aura-card border-2 border-aura-borderGold flex items-center justify-center shadow-lg text-aura-gold group-hover:border-aura-gold group-hover:scale-110 group-hover:shadow-gold-glow transition-all duration-300">
              <ServiceIcon className="w-6 h-6 text-aura-gold" />
            </div>
          </div>

          {/* Middle: Title & Brief Tagline */}
          <div className="px-4 text-center flex-1 flex flex-col justify-center pt-1 pb-2">
            {/* Front Title (Clearly displays STAGE DECORATION on the first card) */}
            <h3 className="font-serif text-xl sm:text-xl font-bold tracking-wider text-aura-ivory uppercase">
              {frontTitle}
            </h3>

            {/* Subtle champagne-gold divider */}
            <div className="h-[1px] bg-gradient-to-r from-transparent via-aura-gold/40 to-transparent w-24 mx-auto my-2" />

            {/* Tagline */}
            <p className="text-[13px] sm:text-xs text-aura-muted line-clamp-2 leading-relaxed font-light px-2">
              {service.tagline || service.description}
            </p>
          </div>

          {/* Bottom Action Area: Working Enquire Button & Flip Hint */}
          <div className="p-4 pt-1 bg-gradient-to-b from-transparent to-aura-black/60 border-t border-aura-borderGold/25">
            <button
              type="button"
              onClick={handleEnquireClick}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold tracking-wide text-aura-black bg-gold-gradient shadow-gold-subtle hover:shadow-gold-glow hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group/btn"
            >
              <span>Enquire Now</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </button>

            {/* Interactive Flip Hint */}
            <div className="mt-2 text-center">
              <span className="inline-flex items-center gap-1.5 text-xs text-aura-gold/85 hover:text-aura-gold transition-colors font-medium">
                <RotateCw className="w-3 h-3 text-aura-gold animate-spin-slow" />
                <span>Hover or tap to flip</span>
              </span>
            </div>
          </div>

        </div>

        {/* ==================== BACK FACE ==================== */}
        <div className="flip-card-back flex flex-col justify-between bg-gradient-to-b from-aura-card via-aura-charcoal to-aura-black border border-aura-borderGold/60 rounded-2xl p-5 sm:p-6 shadow-2xl overflow-hidden relative">
          
          {/* Subtle warm golden ambient backdrop glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-aura-gold/10 rounded-full blur-2xl pointer-events-none" />

          {/* Top: Attractive "About This Service" Heading */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-aura-charcoal/90 border border-aura-borderGold text-aura-gold text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] mb-2 shadow-gold-subtle">
              <Sparkles className="w-3.5 h-3.5 text-aura-gold" />
              <span>About This Service</span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-aura-ivory tracking-tight">
              {service.name || frontTitle}
            </h3>

            {/* Golden Divider */}
            <div className="h-[1px] bg-gradient-to-r from-aura-gold/50 via-aura-gold/20 to-transparent w-full my-2.5" />
          </div>

          {/* Middle: Short Description & Key Services Included */}
          <div className="flex-1 flex flex-col justify-center py-1">
            <p className="text-sm text-aura-beige/95 leading-relaxed font-light mb-3">
              {service.aboutDescription || service.description}
            </p>

            <div className="bg-aura-charcoal/60 rounded-xl p-3 border border-aura-borderGold/30">
              <div className="text-xs uppercase tracking-[0.18em] text-aura-gold font-semibold mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-aura-gold" />
                <span>Key Services Included</span>
              </div>

              <ul className="space-y-1.5 text-xs sm:text-sm text-aura-ivory/90 font-light">
                {keyServicesList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-aura-gold mt-1.5 flex-shrink-0 shadow-gold-subtle" />
                    <span className="leading-snug text-left">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Action Area: Working Enquire Button & Flip Back Option */}
          <div className="pt-2 border-t border-aura-borderGold/25">
            <button
              type="button"
              onClick={handleEnquireClick}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold tracking-wide text-aura-black bg-gold-gradient shadow-gold-subtle hover:shadow-gold-glow hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group/btn"
            >
              <span>Enquire Now</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </button>

            {/* Tap to flip back button */}
            <button
              type="button"
              onClick={handleFlipBack}
              className="w-full text-center text-xs text-aura-muted hover:text-aura-gold transition-colors pt-2 flex items-center justify-center gap-1 font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5 text-aura-gold" />
              <span>Tap to flip back</span>
            </button>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
