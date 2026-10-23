import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { getCustomerThankYouTemplate, getBusinessNotificationTemplate } from './emailTemplates.js';

// Resolve directory paths for rock-solid .env loading
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root and server directory
dotenv.config({ path: path.resolve(__dirname, '../.env'), override: true });
dotenv.config({ path: path.resolve(__dirname, '.env'), override: true });
dotenv.config({ override: true });

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL || 'auraevents321@gmail.com';

// Security Middleware: Body limit
app.use(express.json({ limit: '100kb' }));

// CORS Configuration: Allow frontend origins
const allowedOrigins = [
  FRONTEND_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://localhost:4173',
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server, curl, mobile, or allowed frontend origins
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('CORS policy: Not allowed by Access-Control-Allow-Origin'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

// Rate limiter for Quote requests: 10 submissions per 15 minutes per IP
const quoteRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests from this IP. Please wait a few minutes before trying again or message us directly on WhatsApp.',
  },
});

/**
 * Create Nodemailer Transporter dynamically using environment variables
 * Automatically strips whitespace from Gmail 16-character App Passwords
 */
function getTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const user = process.env.SMTP_USER || 'auraevents321@gmail.com';
  const pass = process.env.SMTP_PASS ? process.env.SMTP_PASS.trim().replace(/\s+/g, '') : '';

  if (pass && pass.length > 0) {
    return nodemailer.createTransport({
      name: 'gmail.com', // HELO/EHLO hostname: prevents local machine dynamic hostname penalty
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });
  }
  return null;
}

// Allowed Event Types for validation
const VALID_EVENT_TYPES = [
  'Stage Decoration',
  'Birthday Decoration',
  'Wedding',
  'Engagement',
  'Corporate Event',
  'DJ Service',
  'Other',
];

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  const transporter = getTransporter();
  res.json({
    status: 'ok',
    service: 'AURA EVENTS API',
    timestamp: new Date().toISOString(),
    smtpConfigured: Boolean(transporter),
    smtpHost: process.env.SMTP_HOST || 'smtp.gmail.com',
    smtpPort: parseInt(process.env.SMTP_PORT || '465', 10),
    smtpUser: process.env.SMTP_USER || 'auraevents321@gmail.com',
  });
});

/**
 * SMTP Connectivity Test & Verification Endpoint
 * GET /api/test-smtp or GET /api/verify-smtp
 * Validates the credentials against the Gmail SMTP server using transporter.verify()
 */
async function handleSmtpVerification(req, res) {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const user = process.env.SMTP_USER || 'auraevents321@gmail.com';
  const pass = process.env.SMTP_PASS ? process.env.SMTP_PASS.trim() : '';

  if (!pass) {
    return res.status(200).json({
      success: false,
      configured: false,
      message: 'SMTP credentials are not yet configured. Please enter your 16-character Gmail App Password in your .env file (SMTP_PASS=xxxx xxxx xxxx xxxx).',
      config: {
        host,
        port,
        secure,
        user,
        passwordSet: false,
      },
    });
  }

  const transporter = getTransporter();
  if (!transporter) {
    return res.status(500).json({
      success: false,
      configured: false,
      message: 'Unable to initialize Nodemailer transport.',
    });
  }

  try {
    console.log(`[SMTP Verification] Testing connection to ${host}:${port} for ${user}...`);
    await transporter.verify();
    console.log(`[SMTP Verification] SUCCESS! Connected and authenticated with Gmail SMTP.`);

    return res.status(200).json({
      success: true,
      configured: true,
      message: `Successfully connected and authenticated with ${host}:${port} using SSL/TLS. Email delivery is fully operational!`,
      timestamp: new Date().toISOString(),
      config: {
        host,
        port,
        secure,
        user,
        businessEmail: BUSINESS_EMAIL,
        passwordSet: true,
      },
    });
  } catch (err) {
    console.error(`[SMTP Verification Failed] Error: ${err.message}`);
    return res.status(502).json({
      success: false,
      configured: true,
      message: 'Failed to authenticate with Gmail SMTP. Please verify that your Gmail address and 16-character App Password are correct.',
      error: err.message,
    });
  }
}

app.get('/api/test-smtp', handleSmtpVerification);
app.get('/api/verify-smtp', handleSmtpVerification);

/**
 * Quote Request Submission Handler
 * POST /api/quote and POST /api/quotes
 */
async function handleQuoteSubmission(req, res) {
  try {
    const {
      fullName,
      email,
      phone,
      eventType,
      eventDate,
      eventLocation,
      estimatedBudget,
      message,
      honeypot, // Anti-spam hidden input
    } = req.body;

    // 1. Anti-bot honeypot check
    if (honeypot && honeypot.trim() !== '') {
      console.warn('[Anti-Spam] Honeypot triggered. Silently dropping bot submission.');
      return res.status(200).json({
        success: true,
        quoteId: 'AURA-' + Date.now().toString(36).toUpperCase(),
        message: 'Your quote request has been received.',
      });
    }

    // 2. Server-side validation
    const errors = {};

    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      errors.fullName = 'Full Name is required (minimum 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      errors.email = 'A valid email address is required.';
    }

    const digitsOnly = (phone || '').replace(/\D/g, '');
    if (!phone || typeof phone !== 'string' || digitsOnly.length < 7) {
      errors.phone = 'A valid phone number with at least 7 digits is required.';
    }

    if (!eventType || !VALID_EVENT_TYPES.includes(eventType)) {
      errors.eventType = `Event Type must be one of: ${VALID_EVENT_TYPES.join(', ')}`;
    }

    if (eventDate) {
      const parsed = new Date(eventDate);
      if (isNaN(parsed.getTime())) {
        errors.eventDate = 'Invalid date format.';
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed. Please correct the highlighted fields.',
        details: errors,
      });
    }

    // 3. Sanitize inputs
    const sanitizedData = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      eventType,
      eventDate: eventDate || null,
      eventLocation: eventLocation ? eventLocation.trim().slice(0, 150) : null,
      estimatedBudget: estimatedBudget ? estimatedBudget.trim().slice(0, 50) : null,
      message: message ? message.trim().slice(0, 2000) : null,
      submittedAt: new Date().toLocaleString('en-US', {
        dateStyle: 'full',
        timeStyle: 'short',
      }),
    };

    // 4. Generate unique quote reference number
    const dateStamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const quoteId = `AURA-${dateStamp}-${randomSuffix}`;
    sanitizedData.quoteId = quoteId;

    console.log(`[Quote Processing] Received quote: ${quoteId} from ${sanitizedData.fullName} (${sanitizedData.eventType})`);

    // 5. Dispatch Emails via Nodemailer
    const transporter = getTransporter();
    let emailDelivered = false;

    if (transporter) {
      const senderAddress = {
        name: 'AURA EVENTS',
        address: process.env.SMTP_USER || 'auraevents321@gmail.com',
      };
      const customerTemplate = getCustomerThankYouTemplate({ fullName: sanitizedData.fullName });
      const businessTemplate = getBusinessNotificationTemplate(sanitizedData);

      // Email 1: Customer Thank-You Email ONLY to the specific submitter's email
      // Contains no business enquiry details; no other recipients in to, cc, or bcc
      // Configured for maximum deliverability and inbox placement
      const customerMailOptions = {
        from: senderAddress,
        to: sanitizedData.email,
        replyTo: 'auraevents321@gmail.com',
        subject: 'Thank You for Choosing AURA EVENTS!',
        text: customerTemplate.text,
        html: customerTemplate.html,
        date: new Date(),
      };

      // Email 2: Business Notification Email ONLY to auraevents321@gmail.com
      // Contains full enquiry details; no other recipients in to, cc, or bcc
      const businessMailOptions = {
        from: senderAddress,
        to: 'auraevents321@gmail.com',
        replyTo: sanitizedData.email,
        subject: `New Event Quote Request — ${sanitizedData.eventType} (${sanitizedData.fullName}) [${quoteId}]`,
        text: businessTemplate.text,
        html: businessTemplate.html,
        date: new Date(),
      };

      try {
        const [customerResult, businessResult] = await Promise.all([
          transporter.sendMail(customerMailOptions),
          transporter.sendMail(businessMailOptions),
        ]);

        emailDelivered = true;
        console.log(`[Email Sent - Customer] Thank-you email delivered to: ${sanitizedData.email} (ID: ${customerResult.messageId})`);
        console.log(`[Email Sent - Business] Quote notification delivered to: auraevents321@gmail.com (ID: ${businessResult.messageId})`);
      } catch (mailError) {
        console.error('[Email Dispatch Warning] SMTP error during mail delivery:', mailError.message);
        // Do not crash client: request is safely recorded with reference ID
      }
    } else {
      console.log(`[SMTP Notice] Quote ${quoteId} recorded. SMTP_PASS is not set yet in .env, skipping live email delivery.`);
    }

    // 6. Return Clean Success Response
    return res.status(200).json({
      success: true,
      quoteId,
      message: emailDelivered
        ? 'Your quote request has been submitted successfully! A confirmation email has been sent to your inbox.'
        : 'Your quote request has been submitted successfully! Our team will contact you soon.',
      emailDelivered,
      enquiry: {
        quoteId,
        fullName: sanitizedData.fullName,
        eventType: sanitizedData.eventType,
        eventDate: sanitizedData.eventDate,
      },
    });

  } catch (err) {
    console.error('[Quote Submission Error]', err);
    return res.status(500).json({
      success: false,
      error: 'An unexpected server error occurred while processing your quote request. Please try again or reach out on WhatsApp.',
    });
  }
}

// Connect endpoints (supporting both singular and plural for full compatibility)
app.post('/api/quote', quoteRateLimiter, handleQuoteSubmission);
app.post('/api/quotes', quoteRateLimiter, handleQuoteSubmission);

// Serve static assets from dist directory in production if available
const distPath = path.resolve(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));

  // Deliver pre-rendered static SEO HTML pages or index.html for client routing
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();

    const cleanPath = req.path.replace(/^\/|\/$/g, '');
    const dedicatedDirIndex = path.join(distPath, cleanPath, 'index.html');
    const directHtmlPath = path.join(distPath, `${cleanPath}.html`);

    if (cleanPath && fs.existsSync(dedicatedDirIndex)) {
      return res.sendFile(dedicatedDirIndex);
    }
    if (cleanPath && fs.existsSync(directHtmlPath)) {
      return res.sendFile(directHtmlPath);
    }

    const mainIndexPath = path.join(distPath, 'index.html');
    if (fs.existsSync(mainIndexPath)) {
      return res.sendFile(mainIndexPath);
    }
    next();
  });
}

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Unhandled Error]', err.message);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`  AURA EVENTS Backend Server`);
  console.log(`  Running on port:    http://localhost:${PORT}`);
  console.log(`  Frontend URL:        ${FRONTEND_URL}`);
  console.log(`  SMTP Service:        smtp.gmail.com:465 (SSL/TLS)`);
  console.log(`  Business Email:      ${BUSINESS_EMAIL}`);
  console.log(`  Health Check:        http://localhost:${PORT}/api/health`);
  console.log(`  SMTP Verify Check:   http://localhost:${PORT}/api/test-smtp`);
  console.log(`=======================================================`);
});
