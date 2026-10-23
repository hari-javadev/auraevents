/**
 * Central Configuration for AURA EVENTS
 * Easily update business details, contact info, WhatsApp number, and services here.
 */
export const siteConfig = {
  brandName: "AURA EVENTS",
  tagline: "We Make Every Celebration Special",
  logo: "/images/aura.logo.png",
  logoDark: "/images/aura.logo-dark.png",
  logoOriginal: "/images/aura.logo-original.png",
  heroImage: "/images/hero.png",

  // WhatsApp Configuration
  // International format without spaces, hyphens, or leading plus sign (e.g., 919500457034)
  whatsappNumber: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_WHATSAPP_NUMBER) || "919500457034",
  whatsappDefaultMessage: "Hi! Thank you for enquiring with AURA EVENTS. What type of event are you looking for? Please share your event details so we can assist you.",

  // Contact Information
  contact: {
    phone: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_BUSINESS_PHONE) || "+91 95004 57034",
    phoneSecondary: "+91 90256 02363",
    email: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_BUSINESS_EMAIL) || "auraevents321@gmail.com",
    address: "Salem, Ammapet - 636003",
    location: "Salem, Ammapet - 636003",
    serviceArea: "All places in India",
    socials: {
      instagram: "https://www.instagram.com/aura__events_01?vrfl=djNwcGFjOGUzZnRi",
      facebook: "",
      youtube: "",
    }
  },

  // Navigation Links
  navLinks: [
    { label: "Home", href: "#hero" },
    { label: "About Us", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Why Us", href: "#why-choose-us" },
    { label: "Gallery", href: "#gallery" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Contact Us", href: "#contact" },
  ],

  // Services
  services: [
    {
      id: "stage-decoration",
      name: "Stage Decoration",
      title: "STAGE DECORATION",
      slug: "stage-decorations",
      path: "/services/stage-decorations",
      tagline: "Grand floral backdrops, LED walls, and reception stage styling.",
      description: "Grand floral backdrops, LED walls, and reception stage styling.",
      aboutDescription: "Transform your celebration with bespoke stage styling, royal floral backdrops, immersive LED walls, and elegant reception setups crafted to perfection.",
      image: "/images/img1.png",
      formValue: "Stage Decoration",
      icon: "Crown",
      keyServices: [
        "Royal Grand & Floral Stage Backdrops",
        "Cinematic LED Walls & Mood Lighting",
        "Reception & Engagement Stage Styling",
        "Entrance Arches & Luxury Walkway Decor"
      ]
    },
    {
      id: "birthday-decoration",
      name: "Birthday Decoration",
      title: "BIRTHDAY DECORATION",
      slug: "birthday-decorations",
      path: "/services/birthday-decorations",
      tagline: "Creative birthday themes, balloon arches, and milestone celebrations.",
      description: "Creative birthday themes, balloon arches, and milestone celebrations.",
      aboutDescription: "Celebrate every milestone with custom-themed birthday stages, vibrant organic balloon arches, marquee numbers, and whimsical entrance displays designed for all ages.",
      image: "/images/img2.png",
      formValue: "Birthday Decoration",
      icon: "PartyPopper",
      keyServices: [
        "Organic Balloon Garlands & Grand Arches",
        "Custom Cartoon & Bespoke Themed Backdrops",
        "Marquee Light-Up Numbers & Neon Signs",
        "Welcome Boards & Dessert Table Styling"
      ]
    },
    {
      id: "all-events",
      name: "Wedding & All Events",
      title: "WEDDING & ALL EVENTS",
      slug: "wedding-decorations",
      path: "/services/wedding-decorations",
      tagline: "Luxury wedding decorations, bridal stages, mandaps, and reception styling.",
      description: "Luxury wedding decorations, bridal stages, mandaps, and reception styling.",
      aboutDescription: "Complete luxury decor solutions for traditional & modern weddings, royal mandaps, sangeet & mehendi celebrations, and grand corporate galas across India.",
      image: "/images/img3.png",
      formValue: "Wedding",
      icon: "Gem",
      keyServices: [
        "Traditional & Modern Mandap Setups",
        "Bridal Stage & Varmala Arrangements",
        "Haldi, Mehendi & Sangeet Theme Decor",
        "Corporate Conferences & Gala Production"
      ]
    },
    {
      id: "dj-service",
      name: "DJ Service",
      title: "DJ SERVICE",
      slug: "dj-services",
      path: "/services/dj-services",
      tagline: "Concert-grade sound systems, moving head lights & party DJ entertainment.",
      description: "Concert-grade sound systems, moving head lights & party DJ entertainment.",
      aboutDescription: "Electrify your party with concert-grade sound, intelligent beam lighting, atmospheric smoke effects, and professional DJs playing your favorite Bollywood, EDM & party hits.",
      image: "/images/img4.png",
      formValue: "DJ Service",
      icon: "Music",
      keyServices: [
        "Concert-Grade High-Fidelity Audio Setup",
        "Intelligent Moving-Head & Beam Lights",
        "Professional DJ & Live Music Mixing",
        "Atmospheric Haze, Fog & Cold Sparklers"
      ]
    }
  ],

  // Gallery items using exact supplied assets (pic1.png to pic6.png)
  galleryItems: [
    {
      id: 1,
      title: "Royal Grand Stage Decor",
      category: "Stage Decoration",
      image: "/images/pic1.png",
      alt: "Royal grand stage decoration with ambient golden lighting and luxury floral backdrops by AURA EVENTS"
    },
    {
      id: 2,
      title: "Luxury Wedding Stage & Lighting",
      category: "Weddings & Corporate",
      image: "/images/pic2.png",
      alt: "Luxury wedding stage decoration, marriage reception styling, and grand celebration lighting by AURA EVENTS"
    },
    {
      id: 3,
      title: "Elegant Celebration Backdrop",
      category: "Stage Decoration",
      image: "/images/pic3.png",
      alt: "Elegant event stage backdrop decoration with warm ambient glow and custom floral styling by AURA EVENTS"
    },
    {
      id: 4,
      title: "Bespoke Themed Party Decor",
      category: "Birthday Decoration",
      image: "/images/pic4.png",
      alt: "Bespoke birthday party decoration and whimsical milestone celebration styling by AURA EVENTS"
    },
    {
      id: 5,
      title: "Glamour Balloon & Arch Styling",
      category: "Birthday Decoration",
      image: "/images/pic5.png",
      alt: "Glamour birthday balloon decoration, organic balloon arch, and celebration entrance styling by AURA EVENTS"
    },
    {
      id: 6,
      title: "Concert Sound & DJ Night Production",
      category: "DJ Services",
      image: "/images/pic6.png",
      alt: "High-energy DJ services with concert sound systems, moving head lights, and party entertainment by AURA EVENTS"
    }
  ]
};

/**
 * Builds the official WhatsApp click-to-chat URL with wa.me
 * Target: Business number +91 9500457034 (formatted as 919500457034)
 * Prefilled Message: "Hi! Thank you for enquiring with AURA EVENTS. What type of event are you looking for? Please share your event details so we can assist you."
 * If customer mobile number is provided in the form, it is included to prepare the conversation.
 * Clicking this button opens WhatsApp addressed to the business number; the customer presses Send.
 */
export function getWhatsAppUrl({ customerPhone = '', eventType = '', customerName = '' } = {}) {
  const businessNumber = siteConfig.whatsappNumber || '919500457034';
  const baseMessage = siteConfig.whatsappDefaultMessage;

  const details = [];
  if (customerPhone && customerPhone.trim()) {
    details.push(`My Contact Number: ${customerPhone.trim()}`);
  }
  if (customerName && customerName.trim()) {
    details.push(`Name: ${customerName.trim()}`);
  }
  if (eventType && eventType.trim()) {
    details.push(`Event Type: ${eventType.trim()}`);
  }

  const finalMessage = details.length > 0
    ? `${baseMessage}\n\n${details.join('\n')}`
    : baseMessage;

  return `https://wa.me/${businessNumber}?text=${encodeURIComponent(finalMessage)}`;
}
