import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Check, MessageCircle, AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';

const EVENT_TYPES = [
  'Stage Decoration',
  'Birthday Decoration',
  'Wedding',
  'Engagement',
  'Corporate Event',
  'DJ Service',
  'Other'
];

export default function QuoteForm({ initialService, onPhoneChange }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    eventType: initialService || 'Stage Decoration',
    eventDate: '',
    eventLocation: '',
    estimatedBudget: '',
    message: '',
    honeypot: '', // spam prevention hidden field
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successData, setSuccessData] = useState(null);

  // Sync when initialService changes from external trigger (e.g. Service card Enquire button)
  useEffect(() => {
    if (initialService && EVENT_TYPES.includes(initialService)) {
      setFormData((prev) => ({ ...prev, eventType: initialService }));
    }
  }, [initialService]);

  // Client-side validation function
  const validate = (values) => {
    const errs = {};
    if (!values.fullName || values.fullName.trim().length < 2) {
      errs.fullName = 'Full Name is required (at least 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.email || !emailRegex.test(values.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    const digitsOnly = (values.phone || '').replace(/\D/g, '');
    if (!values.phone || digitsOnly.length < 7) {
      errs.phone = 'Please provide a valid contact number (at least 7 digits).';
    }

    if (!values.eventType) {
      errs.eventType = 'Please select an event type.';
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Propagate phone number updates so WhatsApp buttons can use it immediately
    if (name === 'phone' && onPhoneChange) {
      onPhoneChange(value);
    }

    // Real-time inline validation if field was touched
    if (touched[name]) {
      const fieldErrors = validate({ ...formData, [name]: value });
      setErrors((prev) => ({
        ...prev,
        [name]: fieldErrors[name] || undefined
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const currentErrors = validate(formData);
    setErrors(currentErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    // Mark all as touched
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      eventType: true,
      eventDate: true,
    });

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      // Focus on first error field
      const firstErrorKey = Object.keys(validationErrors)[0];
      const el = document.getElementById(firstErrorKey);
      if (el) el.focus();
      return;
    }

    setIsSubmitting(true);

    try {
     const response = await fetch('https://auraevents-gyx5.onrender.com/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Server rejected the request. Please verify details and try again.');
      }

      // Backend confirmed success!
      setSuccessData({
        quoteId: data.quoteId,
        eventType: formData.eventType,
        customerName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        emailDelivered: Boolean(data.emailDelivered),
        message: data.message,
      });

    } catch (err) {
      console.error('Quote submission error:', err);
      setServerError(err.message || 'Unable to submit quote. Please check your connection or contact us on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSuccessData(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      eventType: 'Stage Decoration',
      eventDate: '',
      eventLocation: '',
      estimatedBudget: '',
      message: '',
      honeypot: '',
    });
    if (onPhoneChange) onPhoneChange('');
    setTouched({});
    setErrors({});
    setServerError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // WhatsApp click-to-chat URL with prefilled message & customer phone if provided
  const whatsappUrl = getWhatsAppUrl({
    customerPhone: formData.phone,
    eventType: formData.eventType,
    customerName: formData.fullName,
  });

  return (
    <section id="quote-form" className="relative py-24 bg-aura-black overflow-hidden w-full max-w-full">
      {/* Background warm ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-aura-gold/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-aura-charcoal/80 border border-aura-borderGold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-aura-gold" />
            <span className="text-xs uppercase tracking-[0.2em] text-aura-gold font-medium">
              Get In Touch
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-aura-ivory tracking-tight">
            Plan Your <span className="text-gold-gradient italic font-normal">Perfect Event</span>
          </h2>

          <div className="h-[2px] bg-gradient-to-r from-transparent via-aura-gold to-transparent mx-auto my-4 w-20" />

          <p className="text-base text-aura-muted font-light">
            Tell us about your celebration, and our team will get in touch with you.
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-aura-card border border-aura-borderGold/40 rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl backdrop-blur-md">
          
          <AnimatePresence mode="wait">
            {successData ? (
              /* Success Panel */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="text-center py-6 sm:py-10"
              >
                {/* Animated Gold Checkmark */}
                <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
                    className="w-20 h-20 rounded-full bg-aura-gold/15 border-2 border-aura-gold flex items-center justify-center shadow-gold-glow"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.25, duration: 0.4 }}
                    >
                      <Check className="w-10 h-10 text-aura-gold stroke-[3]" />
                    </motion.div>
                  </motion.div>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-aura-ivory mb-3">
                  Thank You for Choosing AURA EVENTS!
                </h3>

                <p className="text-base sm:text-lg text-aura-beige/90 max-w-lg mx-auto leading-relaxed mb-6 font-light">
                  {successData.emailDelivered ? (
                    <>
                      Your quote request has been received! A thank-you confirmation has been sent to{' '}
                      <span className="text-aura-gold font-medium">{successData.email}</span>. Our team will review your requirements and contact you soon.
                    </>
                  ) : (
                    <>
                      Your quote request has been submitted successfully! Our team will contact you soon to discuss your celebration.
                    </>
                  )}
                </p>

                {/* Quote Reference Badge */}
                <div className="inline-block bg-aura-charcoal border border-aura-gold/40 rounded-xl px-6 py-3 mb-8 shadow-inner">
                  <span className="text-xs uppercase tracking-widest text-aura-gold/80 block mb-1">
                    Quote Reference Number
                  </span>
                  <span className="font-mono text-xl sm:text-2xl font-bold text-aura-gold tracking-wider">
                    {successData.quoteId}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-aura-black bg-gold-gradient hover:shadow-gold-glow transition-all duration-300"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                  </button>

                  <a
                    href={getWhatsAppUrl({
                      customerPhone: successData.phone || formData.phone,
                      eventType: successData.eventType,
                      customerName: successData.customerName,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20ba5a] transition-all duration-300 shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Chat on WhatsApp
                  </a>
                </div>
              </motion.div>
            ) : (
              /* Quote Form */
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-6"
              >
                {/* Honeypot hidden input for anti-bot protection */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  tabIndex="-1"
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {/* Server Error Alert Banner */}
                {serverError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-aura-charcoal/95 border border-red-500/50 shadow-lg flex items-start gap-3.5 text-aura-ivory text-sm backdrop-blur-md"
                  >
                    <div className="p-1.5 rounded-full bg-red-500/20 text-red-400 flex-shrink-0 mt-0.5">
                      <AlertCircle className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-aura-gold">Submission Notice</p>
                      <p className="mt-0.5 text-aura-beige/90 font-light">{serverError}</p>
                    </div>
                  </motion.div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-xs uppercase tracking-wider text-aura-gold font-semibold mb-2">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="e.g. Eleanor Vance"
                      value={formData.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={Boolean(touched.fullName && errors.fullName)}
                      aria-describedby={errors.fullName ? "fullName-error" : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-aura-charcoal text-aura-ivory placeholder-aura-muted/60 text-sm border focus:outline-none transition-colors ${
                        touched.fullName && errors.fullName
                          ? 'border-red-500/80 focus:border-red-500'
                          : 'border-aura-borderGold/30 focus:border-aura-gold'
                      }`}
                    />
                    {touched.fullName && errors.fullName && (
                      <p id="fullName-error" className="mt-1.5 text-xs text-red-400">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label htmlFor="email" className="block text-xs uppercase tracking-wider text-aura-gold font-semibold mb-2">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="e.g. eleanor@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={Boolean(touched.email && errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-aura-charcoal text-aura-ivory placeholder-aura-muted/60 text-sm border focus:outline-none transition-colors ${
                        touched.email && errors.email
                          ? 'border-red-500/80 focus:border-red-500'
                          : 'border-aura-borderGold/30 focus:border-aura-gold'
                      }`}
                    />
                    {touched.email && errors.email && (
                      <p id="email-error" className="mt-1.5 text-xs text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone Number */}
                  <div>
                    <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-aura-gold font-semibold mb-2">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={Boolean(touched.phone && errors.phone)}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-aura-charcoal text-aura-ivory placeholder-aura-muted/60 text-sm border focus:outline-none transition-colors ${
                        touched.phone && errors.phone
                          ? 'border-red-500/80 focus:border-red-500'
                          : 'border-aura-borderGold/30 focus:border-aura-gold'
                      }`}
                    />
                    {touched.phone && errors.phone && (
                      <p id="phone-error" className="mt-1.5 text-xs text-red-400">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Event Type */}
                  <div>
                    <label htmlFor="eventType" className="block text-xs uppercase tracking-wider text-aura-gold font-semibold mb-2">
                      Event Type <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-4 py-3 rounded-xl bg-aura-charcoal text-aura-ivory text-sm border border-aura-borderGold/30 focus:border-aura-gold focus:outline-none transition-colors"
                    >
                      {EVENT_TYPES.map((type) => (
                        <option key={type} value={type} className="bg-aura-charcoal text-aura-ivory">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Event Date (Optional) */}
                  <div>
                    <label htmlFor="eventDate" className="block text-xs uppercase tracking-wider text-aura-beige/80 font-medium mb-2">
                      Event Date (Optional)
                    </label>
                    <input
                      id="eventDate"
                      name="eventDate"
                      type="date"
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-aura-charcoal text-aura-ivory text-sm border border-aura-borderGold/30 focus:border-aura-gold focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Event Location (Optional) */}
                  <div>
                    <label htmlFor="eventLocation" className="block text-xs uppercase tracking-wider text-aura-beige/80 font-medium mb-2">
                      Event Location (Optional)
                    </label>
                    <input
                      id="eventLocation"
                      name="eventLocation"
                      type="text"
                      placeholder="e.g. Grand Ballroom / City"
                      value={formData.eventLocation}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-aura-charcoal text-aura-ivory placeholder-aura-muted/60 text-sm border border-aura-borderGold/30 focus:border-aura-gold focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Estimated Budget (Optional) */}
                  <div>
                    <label htmlFor="estimatedBudget" className="block text-xs uppercase tracking-wider text-aura-beige/80 font-medium mb-2">
                      Budget Range (Optional)
                    </label>
                    <input
                      id="estimatedBudget"
                      name="estimatedBudget"
                      type="text"
                      placeholder="e.g. Standard / Premium"
                      value={formData.estimatedBudget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-aura-charcoal text-aura-ivory placeholder-aura-muted/60 text-sm border border-aura-borderGold/30 focus:border-aura-gold focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Additional Message */}
                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-wider text-aura-beige/80 font-medium mb-2">
                    Additional Message & Preferences (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="Tell us about your celebration vision, color themes, estimated guest count, or DJ preferences..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-aura-charcoal text-aura-ivory placeholder-aura-muted/60 text-sm border border-aura-borderGold/30 focus:border-aura-gold focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Dual Action Options: Submit Form OR Contact on WhatsApp */}
                <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 w-full inline-flex items-center justify-center gap-2 py-4 px-8 rounded-full text-sm font-semibold tracking-wide text-aura-black bg-gold-gradient shadow-gold-subtle transition-all duration-300 ${
                      isSubmitting
                        ? 'opacity-70 cursor-not-allowed'
                        : 'hover:shadow-gold-glow hover:scale-[1.02] active:scale-[0.99]'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-aura-black" />
                        <span>Processing Your Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-aura-black" />
                        <span>Submit Quote Request</span>
                      </>
                    )}
                  </button>

                  {/* Or WhatsApp Option */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-4 px-6 rounded-full text-sm font-semibold text-white bg-[#25D366]/90 hover:bg-[#25D366] transition-all duration-300 shadow-sm hover:scale-[1.02]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Inquire via WhatsApp</span>
                  </a>
                </div>

                <p className="text-center text-xs text-aura-muted font-light pt-2">
                  🔒 We respect your privacy. Your information is securely handled and never shared.
                </p>
              </motion.form>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
