import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export default function Navbar({ onOpenQuote, isScrolled: isScrolledProp }) {
  const [isScrolledLocal, setIsScrolledLocal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Support controlled isScrolled prop or internal scroll listener with ~60px threshold
  const isScrolled = isScrolledProp !== undefined ? isScrolledProp : isScrolledLocal;

  useEffect(() => {
    if (isScrolledProp !== undefined) return;
    const handleScroll = () => {
      setIsScrolledLocal(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolledProp]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    if (window.location.pathname !== '/') {
      window.location.href = `/${href}`;
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuoteClick = () => {
    setMobileMenuOpen(false);
    if (window.location.pathname !== '/') {
      window.location.href = '/#quote-form';
      return;
    }
    if (onOpenQuote) {
      onOpenQuote();
    } else {
      const form = document.querySelector('#quote-form');
      if (form) form.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled || mobileMenuOpen
            ? 'h-[62px] sm:h-[66px] bg-aura-black/95 backdrop-blur-md shadow-xl'
            : 'h-[68px] sm:h-[74px] bg-transparent'
        }`}
      >
        {/* Scrolled Logo shifted right by 30px (Desktop only) */}
        <div
          className={`hidden lg:block absolute top-1/2 -translate-y-1/2 left-[40px] sm:left-[42px] lg:left-[44px] z-30 transition-all duration-300 ease-in-out transform ${
            isScrolled && !mobileMenuOpen
              ? 'opacity-100 scale-100 pointer-events-auto'
              : 'opacity-0 scale-75 pointer-events-none'
          }`}
        >
          <a
            href="/"
            tabIndex={isScrolled ? 0 : -1}
            className="group flex flex-col items-center focus:outline-none"
            aria-label="AURA EVENTS Home"
          >
            <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <img
                src={siteConfig.logo}
                alt="AURA EVENTS"
                className="h-13 sm:h-16 lg:h-20 w-auto max-h-[80px] object-contain relative z-10 drop-shadow-[0_8px_20px_rgba(0,0,0,0.95)] filter"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </a>
        </div>

        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 relative flex items-center justify-between">
          
          {/* Left balance placeholder */}
          <div className="w-28 sm:w-44 hidden lg:block" />

          {/* Center Navigation Links: Always strictly centered in viewport */}
          <nav
            className="hidden lg:flex items-center gap-5 xl:gap-7 absolute left-1/2 -translate-x-1/2"
            aria-label="Main Navigation"
          >
            {siteConfig.navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-xs xl:text-sm font-semibold tracking-wider text-white hover:text-aura-gold transition-colors duration-200 relative group py-1 whitespace-nowrap drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold-gradient transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right: Get a Quote CTA Button (Desktop) */}
          <div className="hidden lg:flex items-center justify-end w-28 sm:w-44 z-10">
            <button
              type="button"
              onClick={handleQuoteClick}
              className="inline-flex items-center justify-center px-5 py-2 text-xs font-semibold tracking-wide text-aura-black bg-gold-gradient rounded-full shadow-gold-subtle hover:shadow-gold-glow hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 group whitespace-nowrap"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile / Tablet Controls (under 1024px) */}
          <div className="flex lg:hidden items-center justify-end w-full z-10">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleQuoteClick}
                className="px-4 py-2 text-xs font-semibold text-aura-black bg-gold-gradient rounded-full shadow-sm active:scale-95 transition-transform"
                aria-label="Get a Quote"
              >
                Get Quote
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-white hover:text-aura-gold hover:bg-aura-card/60 focus:outline-none focus:ring-2 focus:ring-aura-gold drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] active:scale-95 transition-transform"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-aura-gold" /> : <Menu className="w-6 h-6 text-white" />}
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Navigation: Sibling to header, covers full screen behind header at z-40 */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-aura-black/98 backdrop-blur-3xl flex flex-col justify-between pt-[74px] pb-8 px-6 overflow-y-auto"
          style={{ minHeight: '100dvh' }}
        >
          <div className="max-w-xs mx-auto w-full flex flex-col items-center pt-2">
            
            {/* Branded Mobile Drawer Header with Clear Logo */}
            <div className="flex flex-col items-center justify-center pb-3 w-full">
              <img
                src={siteConfig.logo}
                alt="AURA EVENTS"
                className="w-24 sm:w-28 h-auto object-contain mb-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
              />
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-aura-gold font-medium text-center">
                {siteConfig.tagline}
              </p>
              <div className="h-[1px] bg-gradient-to-r from-transparent via-aura-gold/40 to-transparent w-36 mx-auto mt-2.5" />
            </div>

            {/* Clear, centered navigation links with readable font size */}
            <nav className="flex flex-col space-y-1.5 w-full pt-2">
              {siteConfig.navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="py-2.5 px-4 text-sm font-medium tracking-wide text-aura-ivory hover:text-aura-gold hover:bg-aura-charcoal/60 rounded-full text-center transition-all duration-200 active:scale-[0.98]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Bottom CTA button */}
          <div className="max-w-xs mx-auto w-full pt-4">
            <button
              type="button"
              onClick={handleQuoteClick}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 text-sm font-semibold tracking-wider text-aura-black bg-gold-gradient rounded-full shadow-gold-subtle hover:shadow-gold-glow active:scale-[0.98] transition-all"
            >
              Request a Free Quote
            </button>
          </div>
        </div>
      )}
    </>
  );
}
