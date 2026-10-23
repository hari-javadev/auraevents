import React from 'react';
import { ArrowUp, Sparkles, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';

export default function Footer({ onSelectService }) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceClick = (formValue) => {
    if (onSelectService) {
      onSelectService(formValue);
    } else {
      const el = document.querySelector('#quote-form');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const allServicePages = [
    { name: 'Wedding Decorations', path: '/services/wedding-decorations' },
    { name: 'Birthday Decorations', path: '/services/birthday-decorations' },
    { name: 'Stage Decoration', path: '/services/stage-decorations' },
    { name: 'DJ Services & Sound', path: '/services/dj-services' },
    { name: 'Engagement Setups', path: '/services/engagement-decorations' },
    { name: 'Corporate Events', path: '/services/corporate-events' },
    { name: 'Party Decorations', path: '/services/party-decorations' },
  ];

  return (
    <footer className="relative bg-aura-black text-aura-ivory border-t border-aura-borderGold/30 pt-16 pb-12 overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-aura-borderGold/20">
          
          {/* Brand Column with Updated Logo */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center">
              <Link to="/">
                <img
                  src={siteConfig.logo}
                  alt="AURA EVENTS — Premier Event Decorators & DJ Services"
                  className="site-logo-footer"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const fallback = e.target.nextSibling;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
              </Link>
              <div
                style={{ display: 'none' }}
                className="items-center gap-2 font-serif text-xl tracking-widest text-aura-gold font-bold uppercase"
              >
                <Sparkles className="w-5 h-5 text-aura-gold" />
                AURA EVENTS
              </div>
            </div>

            <p className="font-serif text-lg text-aura-gold italic">
              “{siteConfig.tagline}”
            </p>

            <p className="text-xs sm:text-sm text-aura-muted leading-relaxed max-w-sm font-light">
              Premier event decorators and DJ services crafted for dream stages, birthdays, weddings, and milestone celebrations. Professional decoration company delivering bespoke floral setups, balloon arches, and concert-grade sound.
            </p>

            {/* Instagram Social Badge */}
            <div className="pt-1">
              <a
                href={siteConfig.contact.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-aura-card hover:bg-aura-charcoal border border-aura-borderGold/60 hover:border-aura-gold text-aura-gold hover:text-aura-ivory transition-all duration-300 shadow-md group hover:scale-105"
                aria-label="Follow AURA EVENTS on Instagram"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform">
                  <Instagram className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-medium tracking-wide">Follow @aura__events_01</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-aura-gold">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-aura-beige/80">
              <li>
                <Link to="/" className="hover:text-aura-gold transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <a href="/#about" className="hover:text-aura-gold transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="/#services" className="hover:text-aura-gold transition-colors duration-200">
                  Services
                </a>
              </li>
              <li>
                <a href="/#gallery" className="hover:text-aura-gold transition-colors duration-200">
                  Gallery
                </a>
              </li>
              <li>
                <a href="/#why-choose-us" className="hover:text-aura-gold transition-colors duration-200">
                  Why Us
                </a>
              </li>
              <li>
                <a href="/#faq" className="hover:text-aura-gold transition-colors duration-200">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/#quote-form" className="text-aura-gold hover:underline font-medium">
                  Request a Quote
                </a>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-aura-gold">
              Our Services
            </h4>
            <ul className="space-y-2 text-sm text-aura-beige/80">
              {allServicePages.map((svc) => (
                <li key={svc.path}>
                  <Link
                    to={svc.path}
                    className="hover:text-aura-gold transition-colors duration-200 block"
                  >
                    {svc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Summary */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-aura-gold">
              Enquiries
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-aura-muted font-light">
              <div>
                <strong className="text-aura-ivory block font-medium">Phone:</strong>
                <a href="tel:+919500457034" className="hover:text-aura-gold block transition-colors">+91 95004 57034</a>
                <a href="tel:+919025602363" className="hover:text-aura-gold block transition-colors">+91 90256 02363</a>
              </div>
              <div>
                <strong className="text-aura-ivory block font-medium">Address:</strong>
                <span className="text-aura-beige/90">{siteConfig.contact.address}</span>
              </div>
              <div>
                <strong className="text-aura-ivory block font-medium">Service Area:</strong>
                <span className="text-aura-beige/90">{siteConfig.contact.serviceArea}</span>
              </div>
              <div>
                <strong className="text-aura-ivory block font-medium">Email:</strong>
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-aura-gold transition-colors">{siteConfig.contact.email}</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Social & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-aura-muted">
          <p>
            &copy; {currentYear} <span className="text-aura-ivory font-medium">AURA EVENTS</span>. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a
              href={siteConfig.contact.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit AURA EVENTS on Instagram"
              className="inline-flex items-center gap-2 text-aura-muted hover:text-aura-gold transition-colors duration-200 group"
            >
              <div className="w-7 h-7 rounded-full bg-aura-card border border-aura-borderGold flex items-center justify-center group-hover:bg-gradient-to-tr group-hover:from-[#f09433] group-hover:via-[#dc2743] group-hover:to-[#bc1888] group-hover:text-white group-hover:border-transparent transition-all">
                <Instagram className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs">Instagram</span>
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-aura-gold hover:text-aura-ivory transition-colors group"
            >
              <span>Back to top</span>
              <div className="w-7 h-7 rounded-full bg-aura-card border border-aura-borderGold flex items-center justify-center group-hover:bg-aura-gold group-hover:text-aura-black transition-all">
                <ArrowUp className="w-3.5 h-3.5" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
