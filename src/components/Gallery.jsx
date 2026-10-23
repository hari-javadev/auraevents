import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [touchStart, setTouchStart] = useState(null);

  const items = siteConfig.galleryItems;

  // Responsive slide count: 3 on desktop, 2 on tablet, 1 on mobile
  useEffect(() => {
    const updateVisibleSlides = () => {
      if (window.innerWidth < 640) {
        setVisibleSlides(1);
      } else if (window.innerWidth < 1024) {
        setVisibleSlides(2);
      } else {
        setVisibleSlides(3);
      }
    };

    updateVisibleSlides();
    window.addEventListener('resize', updateVisibleSlides);
    return () => window.removeEventListener('resize', updateVisibleSlides);
  }, []);

  const maxIndex = Math.max(0, items.length - visibleSlides);

  // Keep currentIndex bounded if visibleSlides changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Smooth Auto-Slide every 3 seconds - moves automatically without being blocked
  useEffect(() => {
    if (lightboxIndex !== null || isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [maxIndex, lightboxIndex, isPaused]);

  // Touch handlers for mobile swipe navigation
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    setTouchStart(null);
  };

  // Lightbox handlers
  const openLightbox = (idx) => {
    setLightboxIndex(idx);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const showLightboxNext = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev + 1) % items.length);
    }
  }, [lightboxIndex, items.length]);

  const showLightboxPrev = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev - 1 + items.length) % items.length);
    }
  }, [lightboxIndex, items.length]);

  // Lightbox Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showLightboxNext();
      if (e.key === 'ArrowLeft') showLightboxPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, closeLightbox, showLightboxNext, showLightboxPrev]);

  // Lock background scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  const currentLightboxItem = lightboxIndex !== null ? items[lightboxIndex] : null;

  return (
    <section id="gallery" className="relative py-24 bg-aura-charcoal/30 border-y border-aura-borderGold/20 overflow-hidden w-full max-w-full">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-aura-gold/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-aura-card border border-aura-borderGold mb-4 shadow-gold-subtle"
          >
            <Sparkles className="w-3.5 h-3.5 text-aura-gold animate-pulse" />
            <span className="text-xs uppercase tracking-[0.2em] text-aura-gold font-semibold">
              Signature Portfolio
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-aura-ivory tracking-tight"
          >
            Celebration <span className="text-gold-gradient italic font-normal">Gallery</span>
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
            Explore our curated showcase of bespoke event stages, vibrant theme designs, and unforgettable party productions.
          </motion.p>
        </div>

        {/* Carousel Container with Interactive Navigation */}
        <div
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation Arrows: Left */}
          <button
            type="button"
            onClick={prevSlide}
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3.5 rounded-full bg-aura-black/90 hover:bg-gold-gradient border border-aura-borderGold hover:border-transparent text-aura-gold hover:text-aura-black backdrop-blur-md shadow-lg hover:shadow-gold-glow hover:scale-110 active:scale-95 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-aura-gold"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:-translate-x-0.5" />
          </button>

          {/* Navigation Arrows: Right */}
          <button
            type="button"
            onClick={nextSlide}
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3.5 rounded-full bg-aura-black/90 hover:bg-gold-gradient border border-aura-borderGold hover:border-transparent text-aura-gold hover:text-aura-black backdrop-blur-md shadow-lg hover:shadow-gold-glow hover:scale-110 active:scale-95 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-aura-gold"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>

          {/* Carousel Viewport (Overflow Hidden) */}
          <div className="overflow-hidden rounded-2xl py-2 px-1">
            <motion.div
              className="flex"
              animate={{
                x: `-${currentIndex * (100 / visibleSlides)}%`,
              }}
              transition={{
                duration: 0.65,
                ease: [0.25, 0.1, 0.25, 1.0],
              }}
            >
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  className="px-2.5 sm:px-3 flex-shrink-0"
                  style={{
                    width: `${100 / visibleSlides}%`,
                  }}
                >
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="group relative rounded-2xl overflow-hidden bg-aura-card border border-aura-borderGold/40 hover:border-aura-gold cursor-pointer shadow-lg hover:shadow-gold-glow aspect-[16/11] transition-all duration-500"
                    onClick={() => openLightbox(idx)}
                  >
                    {/* Image with High Quality Preservation and Smooth Hover Zoom */}
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-108"
                    />

                    {/* Diagonal Gold Shimmer Sheen that moves automatically and on hover */}
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-aura-gold/25 via-white/15 to-transparent animate-auto-shimmer pointer-events-none"
                      style={{ animationDelay: `${idx * 1.1}s` }}
                    />

                    {/* Gradient Overlay & Information Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-aura-black/95 via-aura-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 sm:p-6">
                      <div className="self-end">
                        <span className="p-2.5 rounded-full bg-aura-black/80 border border-aura-gold/60 text-aura-gold flex items-center justify-center backdrop-blur-md shadow-md group-hover:scale-110 transition-transform">
                          <Maximize2 className="w-4 h-4" />
                        </span>
                      </div>

                      <div>
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-aura-gold/25 text-aura-gold border border-aura-gold/40 mb-1.5 backdrop-blur-sm">
                          {item.category}
                        </span>
                        <h3 className="font-serif text-base sm:text-lg font-bold text-aura-ivory tracking-wide">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Carousel Pagination Dots & Play/Pause Status */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-aura-gold ${
                  currentIndex === idx
                    ? 'w-8 bg-gold-gradient shadow-gold-subtle'
                    : 'w-2.5 bg-aura-borderGold/40 hover:bg-aura-gold/70'
                }`}
                aria-label={`Go to slide group ${idx + 1}`}
              />
            ))}

            {/* Subtle Auto-Slide Status Toggle */}
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="ml-3 p-1 rounded-full text-aura-gold/60 hover:text-aura-gold transition-colors focus:outline-none"
              aria-label={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
              title={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Full-Resolution, Uncropped Viewing */}
      <AnimatePresence>
        {lightboxIndex !== null && currentLightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-aura-black/95 backdrop-blur-2xl p-4 sm:p-6"
            onClick={closeLightbox}
          >
            {/* Top Toolbar */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-aura-ivory z-20 max-w-6xl mx-auto">
              <span className="text-xs uppercase tracking-widest text-aura-gold font-mono font-semibold">
                Photo {lightboxIndex + 1} of {items.length}
              </span>
              <button
                type="button"
                onClick={closeLightbox}
                className="p-2.5 rounded-full bg-aura-card/80 border border-aura-borderGold text-aura-beige hover:text-aura-gold hover:bg-aura-charcoal transition-all focus:outline-none focus:ring-2 focus:ring-aura-gold"
                aria-label="Close Lightbox (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Left Previous Arrow */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showLightboxPrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-aura-card/80 border border-aura-borderGold text-aura-beige hover:text-aura-gold hover:bg-aura-charcoal transition-all z-20 hidden sm:flex focus:outline-none focus:ring-2 focus:ring-aura-gold"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Next Arrow */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showLightboxNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-aura-card/80 border border-aura-borderGold text-aura-beige hover:text-aura-gold hover:bg-aura-charcoal transition-all z-20 hidden sm:flex focus:outline-none focus:ring-2 focus:ring-aura-gold"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Center Content - Completely Uncropped */}
            <motion.div
              key={currentLightboxItem.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-5xl max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-2xl overflow-hidden border border-aura-borderGold bg-aura-black shadow-2xl">
                <img
                  src={currentLightboxItem.image}
                  alt={currentLightboxItem.alt}
                  className="max-h-[72vh] w-auto max-w-full object-contain"
                />
              </div>

              {/* Title & Category Info */}
              <div className="mt-4 text-center">
                <p className="font-serif text-lg sm:text-xl text-aura-ivory font-bold">
                  {currentLightboxItem.title}
                </p>
                <p className="text-xs text-aura-gold uppercase tracking-widest mt-1 font-medium">
                  {currentLightboxItem.category}
                </p>
              </div>

              {/* Mobile Prev / Next Buttons */}
              <div className="flex sm:hidden items-center gap-6 mt-4">
                <button
                  type="button"
                  onClick={showLightboxPrev}
                  className="px-5 py-2 rounded-full bg-aura-card border border-aura-borderGold text-xs font-semibold text-aura-gold active:bg-gold-gradient active:text-aura-black"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={showLightboxNext}
                  className="px-5 py-2 rounded-full bg-aura-card border border-aura-borderGold text-xs font-semibold text-aura-gold active:bg-gold-gradient active:text-aura-black"
                >
                  Next
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
