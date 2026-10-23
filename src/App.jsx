import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import HomePage from './components/HomePage';
import ServicePageWrapper from './components/ServicePageWrapper';

/**
 * ScrollToTop helper: scrolls to top on route change or to hash element if present
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedService, setSelectedService] = useState('Stage Decoration');
  const [customerPhone, setCustomerPhone] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll listener with ~60px threshold
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initialize on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToQuote = (serviceName) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    if (location.pathname !== '/') {
      navigate(`/?service=${encodeURIComponent(serviceName || selectedService)}#quote-form`);
      return;
    }
    const quoteElement = document.querySelector('#quote-form');
    if (quoteElement) {
      quoteElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-aura-black text-aura-ivory flex flex-col selection:bg-aura-gold selection:text-aura-black overflow-x-hidden w-full max-w-full">
      <ScrollToTop />

      {/* Sticky Premium Navbar with Scroll Transition */}
      <Navbar
        isScrolled={isScrolled}
        onOpenQuote={() => scrollToQuote()}
      />

      {/* Main Content Router */}
      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                selectedService={selectedService}
                setSelectedService={setSelectedService}
                customerPhone={customerPhone}
                setCustomerPhone={setCustomerPhone}
              />
            }
          />

          <Route
            path="/services/:serviceSlug"
            element={
              <ServicePageWrapper
                onBookService={(svc) => {
                  setSelectedService(svc);
                }}
              />
            }
          />

          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer onSelectService={(serviceName) => scrollToQuote(serviceName)} />

      {/* Floating WhatsApp Action Button with prefilled number and customer phone */}
      <WhatsAppButton
        activeService={selectedService}
        customerPhone={customerPhone}
      />
    </div>
  );
}
