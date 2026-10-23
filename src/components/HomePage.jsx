import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Hero from './Hero';
import Services from './Services';
import About from './About';
import WhyChooseUs from './WhyChooseUs';
import Gallery from './Gallery';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import HomeFaq from './HomeFaq';
import QuoteForm from './QuoteForm';
import Contact from './Contact';
import SEOHead from './SEOHead';
import { getLocalBusinessSchema } from '../config/seoConfig';

export default function HomePage({
  selectedService,
  setSelectedService,
  customerPhone,
  setCustomerPhone,
}) {
  const [searchParams] = useSearchParams();

  // Support pre-selecting a service via URL query (e.g. ?service=Wedding)
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam && setSelectedService) {
      setSelectedService(serviceParam);
    }
  }, [searchParams, setSelectedService]);

  const scrollToQuote = (serviceName) => {
    if (serviceName && setSelectedService) {
      setSelectedService(serviceName);
    }
    const quoteElement = document.querySelector('#quote-form');
    if (quoteElement) {
      quoteElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const servicesElement = document.querySelector('#services');
    if (servicesElement) {
      servicesElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const homeSchema = getLocalBusinessSchema();

  return (
    <>
      <SEOHead
        title="AURA EVENTS — We Make Every Celebration Special | Premium Event Decoration & DJ Services"
        description="AURA EVENTS is a premier event decoration and DJ company. Luxury wedding stage decorations, creative birthday balloon themes, corporate event styling & concert sound."
        keywords="AURA EVENTS, event decorations, event decorators, wedding decorations, wedding decorators, stage decoration, birthday decorations, balloon decorators, DJ services, event management company, event decorators near me"
        canonicalPath="/"
        image="/images/hero.png"
        schema={homeSchema}
      />

      {/* Cinematic Hero */}
      <Hero
        onBookEvent={() => scrollToQuote()}
        onExploreServices={scrollToServices}
      />

      {/* Signature Services */}
      <Services onEnquireService={(serviceName) => scrollToQuote(serviceName)} />

      {/* About Us */}
      <About onRequestQuote={() => scrollToQuote()} />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Portfolio Gallery & Lightbox */}
      <Gallery />

      {/* How It Works Timeline */}
      <HowItWorks />

      {/* Customer Testimonials & Reviews */}
      <Testimonials />

      {/* Frequently Asked Questions */}
      <HomeFaq onOpenQuote={() => scrollToQuote()} />

      {/* Quote Request Form with Dual WhatsApp Action */}
      <QuoteForm
        initialService={selectedService}
        onPhoneChange={setCustomerPhone}
      />

      {/* Contact Information & Hours */}
      <Contact
        onOpenQuote={() => scrollToQuote()}
        customerPhone={customerPhone}
      />
    </>
  );
}
