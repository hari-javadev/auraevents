import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  MessageCircle,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Home,
  ShieldCheck,
  Star,
  Music,
} from 'lucide-react';
import SEOHead from './SEOHead';
import {
  getServiceSchema,
  getBreadcrumbSchema,
  getFaqSchema,
  servicePagesData,
} from '../config/seoConfig';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';

export default function ServicePage({ serviceKey, onBookService }) {
  const navigate = useNavigate();
  const service = servicePagesData[serviceKey];
  const [openFaq, setOpenFaq] = useState(null);

  if (!service) {
    return (
      <div className="min-h-screen bg-aura-black text-aura-ivory flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-serif text-aura-gold mb-4">Service Not Found</h1>
        <p className="text-aura-muted mb-6">The requested service page could not be located.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-aura-black bg-gold-gradient font-medium text-sm"
        >
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    );
  }

  // Combined Schemas (Service + Breadcrumb + FAQ)
  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      getServiceSchema(service),
      getBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/#services' },
        { name: service.title, path: service.path },
      ]),
      service.faqs ? getFaqSchema(service.faqs) : null,
    ].filter(Boolean),
  };

  const whatsappUrl = getWhatsAppUrl({
    eventType: service.formValue,
  });

  const handleBookNow = () => {
    if (onBookService) {
      onBookService(service.formValue);
    }
    navigate(`/?service=${encodeURIComponent(service.formValue)}#quote-form`);
    setTimeout(() => {
      const el = document.querySelector('#quote-form');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  // Other related services for internal linking
  const otherServices = Object.values(servicePagesData).filter(
    (s) => s.slug !== service.slug
  );

  return (
    <article className="min-h-screen bg-aura-black text-aura-ivory pt-24 pb-20">
      <SEOHead
        title={service.metaTitle}
        description={service.description}
        keywords={service.keywords}
        canonicalPath={service.path}
        image={service.image}
        schema={combinedSchema}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <ol className="flex items-center flex-wrap gap-2 text-xs text-aura-muted">
          <li>
            <Link to="/" className="hover:text-aura-gold transition-colors inline-flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
          </li>
          <ChevronRight className="w-3 h-3 text-aura-borderGold/60" />
          <li>
            <Link to="/#services" className="hover:text-aura-gold transition-colors">
              Services
            </Link>
          </li>
          <ChevronRight className="w-3 h-3 text-aura-borderGold/60" />
          <li className="text-aura-gold font-medium truncate max-w-[200px] sm:max-w-none" aria-current="page">
            {service.title.split('|')[0].trim()}
          </li>
        </ol>
      </nav>

      {/* Hero Section */}
      <header className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-aura-charcoal/80 border border-aura-borderGold"
            >
              <Sparkles className="w-3.5 h-3.5 text-aura-gold" />
              <span className="text-xs uppercase tracking-[0.2em] text-aura-gold font-medium">
                {service.heroTag}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-aura-ivory tracking-tight leading-tight"
            >
              {service.h1}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-aura-beige/90 leading-relaxed font-light"
            >
              {service.subtitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-sm text-aura-muted leading-relaxed font-light"
            >
              {service.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-2 flex flex-col sm:flex-row items-center gap-4"
            >
              <button
                type="button"
                onClick={handleBookNow}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold text-aura-black bg-gold-gradient shadow-gold-glow hover:scale-105 active:scale-[0.98] transition-all duration-300"
              >
                <Calendar className="w-4 h-4 text-aura-black" />
                <span>Book This Service</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20ba5a] shadow-md hover:scale-105 active:scale-[0.98] transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Inquire on WhatsApp</span>
              </a>
            </motion.div>
          </div>

          {/* Right Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden border border-aura-borderGold/60 shadow-2xl bg-aura-charcoal aspect-[4/3] sm:aspect-[1346/1140]">
              <img
                src={service.image}
                alt={`${service.h1} by AURA EVENTS`}
                className="w-full h-full object-cover object-center"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-aura-black/70 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-aura-black/85 backdrop-blur-md border border-aura-borderGold/40 text-xs">
                <span className="text-aura-gold font-medium block">
                  AURA EVENTS Official Showcase
                </span>
                <span className="text-aura-muted text-[11px]">
                  Custom setups designed to elevate your celebration
                </span>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* Key Features & Offerings */}
      <section className="py-16 bg-aura-charcoal/30 border-y border-aura-borderGold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-aura-ivory tracking-tight">
              What We Deliver for <span className="text-gold-gradient italic font-normal">{service.formValue}</span>
            </h2>
            <div className="h-[2px] bg-gradient-to-r from-transparent via-aura-gold to-transparent mx-auto my-3 w-16" />
            <p className="text-sm text-aura-muted font-light">
              Premium artistry, safety-tested fabrication, and punctual event management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-aura-card border border-aura-borderGold/40 hover:border-aura-gold transition-all duration-300 shadow-md hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-full bg-aura-gold/15 border border-aura-gold/40 flex items-center justify-center text-aura-gold mb-4 font-mono font-bold text-sm">
                  0{idx + 1}
                </div>
                <h3 className="font-serif text-lg font-bold text-aura-ivory mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-aura-muted leading-relaxed font-light">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose AURA EVENTS */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-aura-card via-aura-charcoal to-aura-card border border-aura-borderGold/40 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-aura-gold/20 flex items-center justify-center text-aura-gold mx-auto md:mx-0">
                <Star className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-bold text-aura-ivory">Bespoke Styling</h4>
              <p className="text-xs text-aura-muted leading-relaxed font-light">
                Tailored color palettes, curated props, and custom fabrication to realize your unique theme.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-aura-gold/20 flex items-center justify-center text-aura-gold mx-auto md:mx-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-bold text-aura-ivory">Flawless Setup</h4>
              <p className="text-xs text-aura-muted leading-relaxed font-light">
                Strict safety protocols, high-grade rigging, and on-time readiness before guests arrive.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-aura-gold/20 flex items-center justify-center text-aura-gold mx-auto md:mx-0">
                <Music className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-bold text-aura-ivory">Complete Production</h4>
              <p className="text-xs text-aura-muted leading-relaxed font-light">
                Harmonize decoration with pro sound systems, intelligent lighting, and DJ entertainment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-aura-ivory tracking-tight">
              Frequently Asked Questions
            </h2>
            <div className="h-[2px] bg-gradient-to-r from-transparent via-aura-gold to-transparent mx-auto my-3 w-16" />
            <p className="text-xs sm:text-sm text-aura-muted font-light">
              Common queries about our {service.title.split('|')[0].trim().toLowerCase()} services.
            </p>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-aura-borderGold/30 bg-aura-card overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-medium text-sm sm:text-base text-aura-ivory hover:text-aura-gold transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-aura-gold transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-aura-beige/85 leading-relaxed font-light border-t border-aura-borderGold/20">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Related Services Internal Links */}
      <section className="py-16 bg-aura-charcoal/20 border-t border-aura-borderGold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-aura-ivory">
              Explore More Event Services
            </h2>
            <p className="text-xs sm:text-sm text-aura-muted font-light mt-1">
              Complete decoration and entertainment solutions crafted by AURA EVENTS.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {otherServices.map((item) => (
              <Link
                key={item.slug}
                to={item.path}
                className="p-4 rounded-xl bg-aura-card border border-aura-borderGold/30 hover:border-aura-gold text-center group transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="aspect-[4/3] rounded-lg overflow-hidden mb-3 bg-aura-charcoal">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-serif text-xs font-semibold text-aura-ivory group-hover:text-aura-gold transition-colors line-clamp-2">
                  {item.title.split('|')[0].trim()}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Conversion Banner */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-aura-card to-aura-black border border-aura-gold/50 shadow-2xl">
          <Sparkles className="w-8 h-8 text-aura-gold mx-auto mb-4 animate-pulse" />
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-aura-ivory mb-3">
            Ready to Plan Your <span className="text-gold-gradient italic font-normal">{service.formValue}</span>?
          </h2>
          <p className="text-sm text-aura-beige/90 max-w-lg mx-auto mb-8 font-light leading-relaxed">
            Contact AURA EVENTS today for customized packages, venue consultation, and a free personalized quote.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleBookNow}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-aura-black bg-gold-gradient shadow-gold-glow hover:scale-105 transition-all"
            >
              <span>Get Free Quote</span>
              <ArrowRight className="w-4 h-4 text-aura-black" />
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20ba5a] transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Direct WhatsApp Enquiry</span>
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
