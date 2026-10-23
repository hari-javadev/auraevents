import React, { useState } from 'react';
import { MessageCircle, X, ChevronUp } from 'lucide-react';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';

export default function WhatsAppButton({ activeService, customerPhone }) {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = getWhatsAppUrl({
    customerPhone,
    eventType: activeService,
  });

  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-end">
      
      {/* Tooltip to the left of the WhatsApp button */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 mr-3 mb-2 bg-aura-card/95 border border-aura-borderGold text-aura-ivory text-xs px-3.5 py-2 rounded-xl shadow-xl backdrop-blur-md">
          <span>Chat with us on WhatsApp</span>
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="text-aura-muted hover:text-aura-gold p-0.5"
            aria-label="Dismiss WhatsApp Tooltip"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Vertical Column: Up arrow button and WhatsApp button strictly stacked and centered */}
      <div className="flex flex-col items-center gap-2.5">
        {/* Up Arrow Symbol strictly centered vertically above WhatsApp icon */}
        <button
          type="button"
          onClick={handleScrollUp}
          aria-label="Scroll to top"
          className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-aura-charcoal/90 hover:bg-aura-card border border-aura-borderGold/70 hover:border-aura-gold text-aura-gold shadow-xl backdrop-blur-md hover:scale-110 active:scale-95 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-aura-gold/40"
        >
          <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-aura-gold animate-bounce group-hover:text-aura-ivory transition-colors" />
        </button>

        {/* Floating WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with AURA EVENTS on WhatsApp"
          className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
        >
          {/* Subtle Pulse Animation Effect */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none group-hover:opacity-50" />
          
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 relative z-10 fill-white stroke-none" />
        </a>
      </div>

    </div>
  );
}
