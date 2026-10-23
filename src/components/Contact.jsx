import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Phone, Mail, MapPin, Globe, MessageCircle, ArrowRight } from 'lucide-react';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';

export default function Contact({ onOpenQuote, customerPhone }) {
  const whatsappUrl = getWhatsAppUrl({ customerPhone });

  const contactCards = [
    {
      icon: Phone,
      title: 'Phone Consultation',
      value: `${siteConfig.contact.phone} / ${siteConfig.contact.phoneSecondary}`,
      actionText: 'Call our team',
      href: `tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, '')}`,
      links: [
        { label: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, '')}` },
        { label: siteConfig.contact.phoneSecondary, href: `tel:${siteConfig.contact.phoneSecondary.replace(/[^0-9+]/g, '')}` },
      ],
      isAction: true,
    },
    {
      icon: MapPin,
      title: 'Business Address',
      value: siteConfig.contact.address,
      actionText: 'Ammapet, Salem, Tamil Nadu',
      href: null,
      isAction: false,
    },
    {
      icon: Globe,
      title: 'Service Areas',
      value: siteConfig.contact.serviceArea,
      actionText: 'Available for events across India',
      href: null,
      isAction: false,
    },
    {
      icon: Mail,
      title: 'Email Enquiries',
      value: siteConfig.contact.email,
      actionText: 'Send an email',
      href: `mailto:${siteConfig.contact.email}`,
      isAction: true,
    },
  ];

  return (
    <section id="contact" className="relative py-24 bg-aura-charcoal/20 border-t border-aura-borderGold/20 overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-aura-card border border-aura-borderGold mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-aura-gold" />
            <span className="text-xs uppercase tracking-[0.2em] text-aura-gold font-medium">
              Connect With Us
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-aura-ivory tracking-tight"
          >
            Get In <span className="text-gold-gradient italic font-normal">Touch</span>
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
            Whether you are ready to book or have questions about our decor concepts, we are always here to guide you.
          </motion.p>
        </div>

        {/* 4 Contact Channels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-aura-card border border-aura-borderGold/30 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-aura-charcoal border border-aura-borderGold/50 flex items-center justify-center text-aura-gold mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-base font-semibold text-aura-ivory mb-2">
                    {card.title}
                  </h3>
                  {card.links ? (
                    <div className="space-y-1">
                      {card.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          className="block text-sm text-aura-beige hover:text-aura-gold font-medium transition-colors"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-aura-beige font-medium break-words">
                      {card.value}
                    </p>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-aura-borderGold/15">
                  {card.href ? (
                    <a
                      href={card.href}
                      className="inline-flex items-center gap-1.5 text-xs text-aura-gold hover:text-aura-ivory transition-colors font-medium"
                    >
                      <span>{card.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-xs text-aura-muted font-light">
                      {card.actionText}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Direct WhatsApp Callout Card */}
        <div className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-aura-card via-aura-charcoal to-aura-card border border-aura-borderGold flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="font-serif text-2xl font-bold text-aura-ivory mb-2">
              Prefer Instant Messaging?
            </h3>
            <p className="text-sm text-aura-beige/80 leading-relaxed font-light">
              Connect with us straight on WhatsApp to share inspiration photos, discuss stage setups, and get quick answers to your celebration queries.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20ba5a] transition-all duration-300 shadow-md hover:scale-105"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>

            <button
              type="button"
              onClick={() => {
                if (onOpenQuote) onOpenQuote();
                else {
                  const el = document.querySelector('#quote-form');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-aura-black bg-gold-gradient hover:shadow-gold-glow transition-all duration-300 hover:scale-105"
            >
              Get a Free Quote
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
