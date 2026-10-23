/**
 * AURA EVENTS - Centralized SEO Configuration
 * Contains targeted keywords, canonical routes, meta tags, and structured data schemas
 * for maximum search engine visibility across all event decoration and DJ queries.
 */

export const siteUrl = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_URL) || 'https://auraevents.in';

export const primaryKeywords = {
  brand: [
    'Aura Events',
    'AURA EVENTS',
    'Aura Event',
    'Auravents',
    'Aura Decorations',
    'Aura Decors',
    'Aura Event Decorations',
    'Aura Event Management',
    'Aura DJ Events',
  ],
  generalDecorations: [
    'Decorations',
    'decoration services',
    'event decorations',
    'event decorators',
    'event decoration services',
    'professional decorators',
    'best decorators',
    'affordable decorations',
    'premium decorations',
    'creative decorations',
    'luxury decorations',
    'party decorations',
    'function decorations',
    'celebration decorations',
    'event styling',
    'event design',
    'custom decorations',
    'event decorators near me',
    'best event decorators near me',
  ],
  wedding: [
    'Wedding decorations',
    'wedding decorators',
    'wedding stage decoration',
    'wedding reception decoration',
    'marriage decorations',
    'marriage decorators',
    'bridal stage decoration',
    'groom and bride stage decoration',
    'engagement decorations',
    'engagement stage decoration',
    'reception decorations',
    'wedding backdrop decoration',
    'mandap decoration',
    'wedding entrance decoration',
    'floral wedding decoration',
    'luxury wedding decoration',
    'traditional wedding decoration',
    'modern wedding decoration',
    'marriage decorators near me',
    'wedding decorators near me',
  ],
  birthday: [
    'Birthday decorations',
    'birthday decorators',
    'birthday party decoration',
    'first birthday decoration',
    'kids birthday decoration',
    'adult birthday decoration',
    'surprise birthday decoration',
    'birthday balloon decoration',
    'balloon decorators',
    'balloon arch decoration',
    'anniversary decorations',
    'wedding anniversary decoration',
    'baby shower decoration',
    'naming ceremony decoration',
    'puberty ceremony decoration',
    'retirement party decoration',
    'private party decoration',
    'house party decoration',
    'birthday decorators near me',
    'balloon decorators near me',
  ],
  stage: [
    'Stage decoration',
    'stage decorators',
    'event stage decoration',
    'function stage decoration',
    'flower stage decoration',
    'LED stage decoration',
    'reception stage design',
    'elegant stage decoration',
    'luxury stage decoration',
    'event backdrop decoration',
    'entrance decoration',
    'venue decoration',
    'hall decoration',
    'auditorium decoration',
    'corporate event decoration',
    'exhibition decoration',
    'inauguration decoration',
    'college event decoration',
    'school function decoration',
    'cultural event decoration',
    'festival decorations',
    'religious function decorations',
    'stage decoration near me',
  ],
  dj: [
    'DJ services',
    'DJ for events',
    'DJ for weddings',
    'wedding DJ services',
    'birthday party DJ',
    'party DJ',
    'professional DJ',
    'DJ sound system',
    'DJ lighting',
    'event lighting',
    'sound and lighting services',
    'DJ stage setup',
    'DJ events',
    'music entertainment',
    'event entertainment services',
    'DJ services near me',
  ],
  eventManagement: [
    'Event management',
    'event planners',
    'event organizers',
    'event planning services',
    'event decoration company',
    'event management company',
    'wedding event planners',
    'party planners',
    'function organizers',
    'corporate event management',
    'complete event solutions',
    'event production',
    'event setup services',
    'event rental services',
    'decoration and DJ packages',
    'event planners near me',
  ],
};

export const servicePagesData = {
  'wedding-decorations': {
    slug: 'wedding-decorations',
    path: '/services/wedding-decorations',
    title: 'Wedding Decorations & Marriage Decorators | AURA EVENTS',
    metaTitle: 'Wedding Decorations & Marriage Decorators | Luxury Stage & Mandap — AURA EVENTS',
    description: 'Transform your dream marriage celebration with AURA EVENTS. Bespoke wedding stage decorations, bridal backdrops, floral mandaps, grand reception entrances & luxury decor packages.',
    keywords: 'wedding decorations, wedding decorators, wedding stage decoration, marriage decorations, marriage decorators, bridal stage decoration, wedding reception decoration, mandap decoration, wedding decorators near me',
    heroTag: 'Exquisite Wedding Styling',
    h1: 'Luxury Wedding Decorations & Marriage Decorators',
    subtitle: 'From grand bridal stages to romantic floral mandaps, we craft enchanting atmospheres for your big day.',
    formValue: 'Wedding',
    image: '/images/img3.png',
    features: [
      {
        title: 'Bespoke Wedding Stage Styling',
        desc: 'Custom-designed bridal and groom stage backdrops combining opulent floral art, ambient warm lighting, and elegant architectural arches.',
      },
      {
        title: 'Floral Mandap & Entrance Decor',
        desc: 'Traditional and contemporary mandap setups featuring fresh blossoms, royal drapery, and illuminated ceremonial pathways.',
      },
      {
        title: 'Reception & Banquet Hall Ambiance',
        desc: 'Complete venue styling from personalized photo booths and guest welcome arches to table centerpieces and stage illumination.',
      },
      {
        title: 'Combined Wedding Decor & DJ Packages',
        desc: 'Seamless coordination of decorative aesthetics paired with concert-grade sound systems and moving head lights for sangeet & reception.',
      },
    ],
    faqs: [
      {
        q: 'What types of wedding decorations does AURA EVENTS offer?',
        a: 'AURA EVENTS provides full-spectrum wedding decoration services including wedding stage decoration, bridal stage design, traditional and modern mandaps, grand entrance floral arches, wedding reception backdrops, and complete venue hall styling.',
      },
      {
        q: 'Can you customize wedding decoration themes according to our venue and budget?',
        a: 'Yes, every wedding setup is tailored to your color palette, venue dimensions, traditions, and budget. We provide bespoke concepts and 3D mockups to match your celebration vision.',
      },
      {
        q: 'Do you offer combined wedding decoration and DJ packages?',
        a: 'Yes, we provide all-in-one celebration packages that combine luxury stage styling with professional DJ sound systems, intelligent lighting, and stage production.',
      },
    ],
  },

  'birthday-decorations': {
    slug: 'birthday-decorations',
    path: '/services/birthday-decorations',
    title: 'Birthday Decorations & Balloon Decorators | AURA EVENTS',
    metaTitle: 'Birthday Decorations & Balloon Decorators | Themed Party Setups — AURA EVENTS',
    description: 'Celebrate milestone moments with AURA EVENTS. Creative birthday decorations, balloon arches, kids theme parties, adult birthday styling, surprise decor & party backdrops.',
    keywords: 'birthday decorations, birthday decorators, birthday party decoration, first birthday decoration, balloon decorators, balloon arch decoration, kids birthday decoration, surprise birthday decoration, birthday decorators near me',
    heroTag: 'Joyful Birthday Celebrations',
    h1: 'Creative Birthday Decorations & Balloon Decorators',
    subtitle: 'Vibrant theme backdrops, artistic balloon arches, and magical party setups that make every birthday unforgettable.',
    formValue: 'Birthday Decoration',
    image: '/images/img2.png',
    features: [
      {
        title: 'Custom Themed Birthday Stages',
        desc: 'Whimsical themes for first birthdays, cartoon concepts for kids, and sophisticated champagne-gold setups for adult milestone birthdays.',
      },
      {
        title: 'Organic Balloon Arches & Garlands',
        desc: 'Premium chrome, pastel, and metallic balloon installations, custom marquee numbers, and neon glow signboards.',
      },
      {
        title: 'Surprise Party & Home Setups',
        desc: 'Quick, elegant room makeovers, backyard party setups, and banquet hall decorations executed with precision.',
      },
      {
        title: 'Birthday DJ & Lighting Integration',
        desc: 'Energetic party DJ with dance floor lights, smoke effects, and party tracks to keep guests dancing all celebration long.',
      },
    ],
    faqs: [
      {
        q: 'What age groups do your birthday decoration services cover?',
        a: 'We design decorations for all ages—from 1st birthday milestone celebrations and kids thematic setups (superheroes, princesses, jungle safari) to sweet 16s, 21st, 50th, and elegant adult celebrations.',
      },
      {
        q: 'How far in advance should I book birthday decorators?',
        a: 'We recommend booking 1 to 2 weeks in advance for standard setups, and 3 to 4 weeks for extensive custom fabrication or weekend dates.',
      },
    ],
  },

  'stage-decorations': {
    slug: 'stage-decorations',
    path: '/services/stage-decorations',
    title: 'Stage Decoration & Stage Decorators | AURA EVENTS',
    metaTitle: 'Stage Decoration & Stage Decorators | Flower, LED & Luxury Stages — AURA EVENTS',
    description: 'Premier stage decorators for weddings, receptions, cultural events & corporate galas. High-end floral backdrops, LED stage styling, royal sofa seating & venue transformation.',
    keywords: 'stage decoration, stage decorators, event stage decoration, flower stage decoration, LED stage decoration, luxury stage decoration, reception stage design, stage decoration near me',
    heroTag: 'Grand Centerstage Styling',
    h1: 'Premier Stage Decoration & Stage Decorators',
    subtitle: 'Architectural backdrops, luminous LED highlights, and royal floral staging designed to captivate every attendee.',
    formValue: 'Stage Decoration',
    image: '/images/img1.png',
    features: [
      {
        title: 'Floral & Thematic Stage Backdrops',
        desc: 'Intricate arrangements of real and imported faux flowers, rich velvet drapes, and customized geometric panels.',
      },
      {
        title: 'Intelligent Stage Lighting & LED Walls',
        desc: 'Warm ambient spotlights, profile lights, uplighting, and high-resolution LED backdrop screens for modern presentations.',
      },
      {
        title: 'Furniture & Centerpiece Curation',
        desc: 'Carved royal thrones, contemporary gold velvet chairs, floral pedestals, and customized stage floor carpets.',
      },
      {
        title: 'Multi-Purpose Stage Setups',
        desc: 'Expertly configured for weddings, engagements, reception banquets, corporate awards, college fests, and cultural celebrations.',
      },
    ],
    faqs: [
      {
        q: 'Can stage decorations be adapted for indoor halls and outdoor open-air lawns?',
        a: 'Yes, our team engineers robust, weather-conscious truss systems and backdrops engineered specifically for both air-conditioned banquet halls and breezy outdoor garden venues.',
      },
      {
        q: 'What is included in a complete stage decoration setup?',
        a: 'A complete setup typically includes the structural backdrop, floral art, thematic draping, stage carpeting, lighting fixtures, and bride-groom/honoree furniture.',
      },
    ],
  },

  'dj-services': {
    slug: 'dj-services',
    path: '/services/dj-services',
    title: 'DJ Services, Sound & Event Lighting | AURA EVENTS',
    metaTitle: 'DJ Services, Sound Systems & Party Lighting | AURA EVENTS',
    description: 'Electrify your party with professional DJ services from AURA EVENTS. High-energy wedding DJ, birthday party sound systems, intelligent moving head lights, smoke & laser effects.',
    keywords: 'DJ services, DJ for events, DJ for weddings, wedding DJ services, birthday party DJ, professional DJ, DJ sound system, DJ lighting, sound and lighting services, DJ services near me',
    heroTag: 'Concert-Grade Sound & Lights',
    h1: 'Professional DJ Services, Sound & Event Lighting',
    subtitle: 'Heart-pumping bass, crystal-clear acoustics, and intelligent synchronized light shows that keep your dance floor packed.',
    formValue: 'DJ Service',
    image: '/images/img4.png',
    features: [
      {
        title: 'Pro DJ Sound System & Acoustics',
        desc: 'High-fidelity audio rigs, line-array speakers, subwoofers, and wireless microphones tuned for optimal venue clarity.',
      },
      {
        title: 'Intelligent Moving Head Lighting & Lasers',
        desc: 'DMX-controlled moving beams, wash lights, disco strobes, and laser effects synchronized to the beat of the music.',
      },
      {
        title: 'Special Effects (SFX)',
        desc: 'Cold pyro sparkular fountains, low-lying cloud smoke machines for first dances, and celebratory confetti cannons.',
      },
      {
        title: 'Multi-Genre Playlists for All Crowds',
        desc: 'Masterfully curated sets spanning Bollywood, EDM, Commercial Hits, Regional Classics, Hip-Hop, and Retro Grooves.',
      },
    ],
    faqs: [
      {
        q: 'What equipment does the AURA EVENTS DJ setup provide?',
        a: 'We provide professional DJ consoles, active speaker systems, heavy-duty subwoofers, cordless microphones, DMX lighting trusses, moving head lights, and atmospheric haze/smoke machines.',
      },
      {
        q: 'Can we submit a custom music playlist or request specific songs?',
        a: 'Absolutely! We work closely with you prior to the event to compile your must-play tracks, family favorites, and special entrance songs.',
      },
    ],
  },

  'engagement-decorations': {
    slug: 'engagement-decorations',
    path: '/services/engagement-decorations',
    title: 'Engagement Decorations & Ring Ceremony Setups | AURA EVENTS',
    metaTitle: 'Engagement Decorations & Ring Ceremony Setups | AURA EVENTS',
    description: 'Celebrate your commitment with romantic engagement decorations by AURA EVENTS. Ring ceremony backdrops, floral entrance gates, intimate photo booths & elegant lighting.',
    keywords: 'engagement decorations, engagement stage decoration, ring ceremony decoration, engagement decorators, marriage decorations, wedding decorators near me',
    heroTag: 'Romantic Beginnings',
    h1: 'Romantic Engagement Decorations & Ring Ceremony Setups',
    subtitle: 'Charming pastel backdrops, illuminated ring ceremony stages, and whimsical floral arches tailored for your special commitment.',
    formValue: 'Engagement',
    image: '/images/pic2.png',
    features: [
      {
        title: 'Signature Ring Ceremony Stages',
        desc: 'Intimate, picture-perfect stages featuring circular floral arches, neon love signage, and soft mood lighting.',
      },
      {
        title: 'Entrance Pathways & Welcome Easels',
        desc: 'Personalized mirror welcome boards, floral pedestals, and fairy-lit walkways that greet guests warmly.',
      },
      {
        title: 'Themed Photo Corners & Photobooths',
        desc: 'Interactive photo zones with custom floral backdrops designed for memorable couple and family portraits.',
      },
      {
        title: 'DJ & Sound for Sangeet & Ring Exchange',
        desc: 'Gentle acoustic background sound during ceremonies followed by energetic tracks for family celebrations.',
      },
    ],
    faqs: [
      {
        q: 'Can engagement decoration themes be matched with the couple’s outfits?',
        a: 'Yes, we frequently harmonize floral colors, drapes, and stage lighting to complement the couple’s attire and photography style.',
      },
    ],
  },

  'corporate-events': {
    slug: 'corporate-events',
    path: '/services/corporate-events',
    title: 'Corporate Event Decorations & Management | AURA EVENTS',
    metaTitle: 'Corporate Event Decorations & AV Production | AURA EVENTS',
    description: 'Professional corporate event decoration and management services. Annual day stage setups, conference branding, inauguration backdrops, award nights, sound & AV production.',
    keywords: 'corporate event decoration, corporate event management, corporate event planners, event management company, event stage decoration, conference decoration, inauguration decoration',
    heroTag: 'Polished Corporate Production',
    h1: 'Corporate Event Decorations & Audio-Visual Production',
    subtitle: 'Sleek stage backdrops, crisp corporate branding, and enterprise-grade sound & lighting for summits, awards, and galas.',
    formValue: 'Corporate Event',
    image: '/images/pic1.png',
    features: [
      {
        title: 'Executive Stage & Podium Setups',
        desc: 'Minimalist, modern stage architecture with branded media walls, LED screens, and sharp speaker podiums.',
      },
      {
        title: 'Inauguration & Ribbon-Cutting Decor',
        desc: 'Grand entry arches, red carpet walk-ins, brass lamps, and ceremonial setup execution.',
      },
      {
        title: 'Annual Day & Gala Production',
        desc: 'Full-scale stage rigging, theatrical lighting, crisp line-array sound systems, and celebratory dinner setups.',
      },
      {
        title: 'Exhibition & Product Launch Backdrops',
        desc: 'Custom-built display booths, branded photo kiosks, and dynamic spotlighting for brand unveilings.',
      },
    ],
    faqs: [
      {
        q: 'Do you provide full AV and sound setups for corporate conferences?',
        a: 'Yes, we provide complete corporate AV solutions including cordless lapel microphones, line-array speakers, LED video walls, and stage lighting.',
      },
    ],
  },

  'party-decorations': {
    slug: 'party-decorations',
    path: '/services/party-decorations',
    title: 'Party Decorations, Anniversaries & Baby Showers | AURA EVENTS',
    metaTitle: 'Party Decorations & Celebration Styling | AURA EVENTS',
    description: 'Celebrate milestone life events with AURA EVENTS. Wedding anniversary decorations, baby shower styling, naming ceremony setups, house parties & private celebrations.',
    keywords: 'party decorations, celebration decorations, anniversary decorations, baby shower decoration, naming ceremony decoration, private party decoration, party planners, event decorators near me',
    heroTag: 'Joyous Milestone Celebrations',
    h1: 'Party Decorations, Anniversaries & Celebration Styling',
    subtitle: 'From intimate home gatherings to grand milestone anniversaries, we style welcoming, photo-ready party spaces.',
    formValue: 'Other',
    image: '/images/pic5.png',
    features: [
      {
        title: 'Silver & Golden Anniversary Stages',
        desc: 'Sophisticated champagne-gold and floral arrangements celebrating enduring love and family unity.',
      },
      {
        title: 'Baby Shower & Naming Ceremony Decor',
        desc: 'Soft pastel themes, floral cradles, cloud balloon arches, and customized cradle ceremony focal points.',
      },
      {
        title: 'Private Gathering & House Party Decor',
        desc: 'Clever, space-efficient decorative setups for villas, rooftop terraces, and apartment clubhouses.',
      },
      {
        title: 'Festive & Cultural Function Decor',
        desc: 'Traditional marigold drapes, brass urns, hanging floral bells, and ambient diya lighting for traditional ceremonies.',
      },
    ],
    faqs: [
      {
        q: 'Do you decorate for small private parties at homes or apartments?',
        a: 'Yes! We customize setups to suit living rooms, terraces, clubhouses, and private lawns of all shapes and sizes.',
      },
    ],
  },
};

/**
 * Generates JSON-LD schema objects for the website
 */
export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${siteUrl}/#organization`,
    name: 'AURA EVENTS',
    alternateName: [
      'Aura Events',
      'Aura Event',
      'Auravents',
      'Aura Decorations',
      'Aura Decors',
      'Aura Event Decorations',
      'Aura Event Management',
      'Aura DJ Events',
    ],
    url: siteUrl,
    logo: `${siteUrl}/images/aura.logo.png`,
    image: `${siteUrl}/images/hero.png`,
    description: 'AURA EVENTS is a premier event decoration and DJ services company specializing in luxury wedding stage decoration, creative birthday balloon setups, corporate event styling, and professional DJ sound & lighting.',
    telephone: ['+919500457034', '+919025602363'],
    email: 'auraevents321@gmail.com',
    priceRange: '₹₹ - ₹₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ammapet',
      addressLocality: 'Salem',
      addressRegion: 'Tamil Nadu',
      postalCode: '636003',
      addressCountry: 'IN',
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'India',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'All places in India',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Event Decoration & DJ Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Wedding Stage Decoration & Marriage Decorators',
            description: 'Luxury bridal stage setups, floral mandap decoration, entrance arches, and complete wedding venue styling.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Birthday Party Decorations & Balloon Decorators',
            description: 'Creative birthday themes, organic balloon arches, kids party stages, and neon celebration styling.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Stage Decoration & Event Backdrops',
            description: 'Grand floral, LED, and fabric stage decoration for receptions, award galas, and celebrations.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Professional DJ Services & Event Lighting',
            description: 'Concert-grade sound systems, intelligent moving head dance floor lights, and party DJ entertainment.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Engagement & Ring Ceremony Decorations',
            description: 'Romantic ring exchange stages, personalized welcome easels, and ambient venue lighting.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Corporate Event Decorations & AV Production',
            description: 'Summit stages, conference branding, inauguration backdrops, and awards night production.',
          },
        },
      ],
    },
  };
}

export function getServiceSchema(service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.title,
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'AURA EVENTS',
      telephone: ['+919500457034', '+919025602363'],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Ammapet',
        addressLocality: 'Salem',
        addressRegion: 'Tamil Nadu',
        postalCode: '636003',
        addressCountry: 'IN',
      },
      areaServed: 'All places in India',
      url: siteUrl,
    },
    url: `${siteUrl}${service.path}`,
    image: `${siteUrl}${service.image}`,
  };
}

export function getBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export function getFaqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}
