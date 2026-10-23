
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import {
  getCustomerThankYouTemplate,
  getBusinessNotificationTemplate,
} from './emailTemplates.js';

// Resolve directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables.
// Render environment variables are used when no local .env overrides exist.
dotenv.config({
  path: path.resolve(__dirname, '../.env'),
  override: true,
});
dotenv.config({
  path: path.resolve(__dirname, '.env'),
  override: true,
});
dotenv.config({ override: true });

const app = express();
app.set('trust proxy', 1);

const PORT = process.env.PORT || 5000;
const FRONTEND_URL =
  process.env.FRONTEND_URL || 'http://localhost:5173';

const BUSINESS_EMAIL =
  process.env.BUSINESS_EMAIL || 'auraevents321@gmail.com';

// --------------------------------------------------
// Middleware
// --------------------------------------------------

app.use(express.json({ limit: '100kb' }));

const allowedOrigins = [
  FRONTEND_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://localhost:4173',
  'https://auravents.in',
  'https://www.auravents.in',
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header, such as curl.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error('CORS policy: Origin not allowed.')
      );
    },
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  })
);

// Quote requests: maximum 10 submissions per 15 minutes per IP.
const quoteRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error:
      'Too many requests. Please wait a few minutes before trying again or contact us on WhatsApp.',
  },
});

// --------------------------------------------------
// Resend email service
// --------------------------------------------------

async function sendResendEmail({
  to,
  subject,
  text,
  html,
  replyTo,
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured.');
  }

  if (!from) {
    throw new Error('RESEND_FROM_EMAIL is not configured.');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text,
        html,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
      signal: controller.signal,
    });

    const responseText = await response.text();

    let result = {};

    try {
      result = responseText ? JSON.parse(responseText) : {};
    } catch {
      result = {};
    }

    if (!response.ok) {
      // Do not log or return the API key.
      throw new Error(
        `Resend API error (${response.status}): ${
          result.message ||
          result.name ||
          'Email request failed'
        }`
      );
    }

    return result;
  } finally {
    clearTimeout(timeout);
  }
}

// --------------------------------------------------
// Allowed event types
// --------------------------------------------------

const VALID_EVENT_TYPES = [
  'Stage Decoration',
  'Birthday Decoration',
  'Wedding',
  'Engagement',
  'Corporate Event',
  'DJ Service',
  'Other',
];

// --------------------------------------------------
// Health check
// GET /api/health
// --------------------------------------------------

app.get('/api/health', (req, res) => {
  const resendConfigured = Boolean(
    process.env.RESEND_API_KEY &&
    process.env.RESEND_FROM_EMAIL
  );

  res.json({
    status: 'ok',
    service: 'AURA EVENTS API',
    timestamp: new Date().toISOString(),
    emailProvider: 'Resend',
    resendConfigured,
    businessEmail: BUSINESS_EMAIL,
  });
});

// --------------------------------------------------
// Legacy SMTP status URLs retained for compatibility.
// These check configuration only; they do not send mail.
// GET /api/test-smtp
// GET /api/verify-smtp
// --------------------------------------------------

function handleResendStatus(req, res) {
  const configured = Boolean(
    process.env.RESEND_API_KEY &&
    process.env.RESEND_FROM_EMAIL
  );

  return res.status(configured ? 200 : 503).json({
    success: configured,
    configured,
    provider: 'Resend',
    message: configured
      ? 'Resend environment variables are configured. Submit a test quote to test email delivery.'
      : 'Configure RESEND_API_KEY and RESEND_FROM_EMAIL in Render.',
  });
}

app.get('/api/test-smtp', handleResendStatus);
app.get('/api/verify-smtp', handleResendStatus);

// --------------------------------------------------
// Quote submission handler
// POST /api/quote
// POST /api/quotes
// --------------------------------------------------

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
      honeypot,
    } = req.body || {};

    // 1. Anti-spam honeypot
    if (
      typeof honeypot === 'string' &&
      honeypot.trim() !== ''
    ) {
      console.warn(
        '[Anti-Spam] Honeypot triggered. Submission dropped.'
      );

      return res.status(200).json({
        success: true,
        quoteId: 'AURA-' + Date.now().toString(36).toUpperCase(),
        message: 'Your quote request has been received.',
      });
    }

    // 2. Validate input
    const errors = {};

    if (
      typeof fullName !== 'string' ||
      fullName.trim().length < 2
    ) {
      errors.fullName =
        'Full Name is required (minimum 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      typeof email !== 'string' ||
      !emailRegex.test(email.trim())
    ) {
      errors.email = 'A valid email address is required.';
    }

    const digitsOnly =
      typeof phone === 'string'
        ? phone.replace(/\D/g, '')
        : '';

    if (digitsOnly.length < 7) {
      errors.phone =
        'A valid phone number with at least 7 digits is required.';
    }

    if (
      typeof eventType !== 'string' ||
      !VALID_EVENT_TYPES.includes(eventType)
    ) {
      errors.eventType =
        `Event Type must be one of: ${VALID_EVENT_TYPES.join(', ')}`;
    }

    if (eventDate) {
      const parsedDate = new Date(eventDate);

      if (Number.isNaN(parsedDate.getTime())) {
        errors.eventDate = 'Invalid date format.';
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        error:
          'Validation failed. Please correct the highlighted fields.',
        details: errors,
      });
    }

    // 3. Sanitize input
    const sanitizedData = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      eventType,
      eventDate: eventDate || null,
      eventLocation:
        typeof eventLocation === 'string'
          ? eventLocation.trim().slice(0, 150)
          : null,
      estimatedBudget:
        typeof estimatedBudget === 'string'
          ? estimatedBudget.trim().slice(0, 50)
          : null,
      message:
        typeof message === 'string'
          ? message.trim().slice(0, 2000)
          : null,
      submittedAt: new Date().toLocaleString('en-US', {
        dateStyle: 'full',
        timeStyle: 'short',
      }),
    };

    // 4. Generate quote reference
    const dateStamp = new Date()
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, '');

    const randomSuffix = Math.floor(
      1000 + Math.random() * 9000
    );

    const quoteId = `AURA-${dateStamp}-${randomSuffix}`;

    sanitizedData.quoteId = quoteId;

    console.log(
      `[Quote Processing] Received quote: ${quoteId} from ${sanitizedData.fullName} (${sanitizedData.eventType})`
    );

    // 5. Generate the existing email templates
    const customerTemplate = getCustomerThankYouTemplate({
      fullName: sanitizedData.fullName,
    });

    const businessTemplate =
      getBusinessNotificationTemplate(sanitizedData);

    // 6. Send both emails using Resend
    let customerEmailSent = false;
    let businessEmailSent = false;

    try {
      const [customerResult, businessResult] =
        await Promise.allSettled([
          // Customer confirmation email
          sendResendEmail({
            to: sanitizedData.email,
            subject: 'Thank You for Choosing AURA EVENTS!',
            text: customerTemplate.text,
            html: customerTemplate.html,
            replyTo: BUSINESS_EMAIL,
          }),

          // Business notification email
          sendResendEmail({
            to: BUSINESS_EMAIL,
            subject:
              `New Event Quote Request — ${sanitizedData.eventType} (${sanitizedData.fullName}) [${quoteId}]`,
            text: businessTemplate.text,
            html: businessTemplate.html,
            replyTo: sanitizedData.email,
          }),
        ]);

      customerEmailSent =
        customerResult.status === 'fulfilled';

      businessEmailSent =
        businessResult.status === 'fulfilled';

      if (customerEmailSent) {
        console.log(
          `[Resend] Customer email accepted for ${sanitizedData.email}. ID: ${customerResult.value.id || 'not returned'}`
        );
      } else {
        console.error(
          '[Resend] Customer email failed:',
          customerResult.reason?.message ||
            customerResult.reason
        );
      }

      if (businessEmailSent) {
        console.log(
          `[Resend] Business notification accepted for ${BUSINESS_EMAIL}. ID: ${businessResult.value.id || 'not returned'}`
        );
      } else {
        console.error(
          '[Resend] Business notification failed:',
          businessResult.reason?.message ||
            businessResult.reason
        );
      }
    } catch (mailError) {
      // Keep the quote endpoint from crashing on email errors.
      console.error(
        '[Resend] Email dispatch error:',
        mailError.message
      );
    }

    const emailDelivered =
      customerEmailSent && businessEmailSent;

    // 7. Return response to the frontend
    return res.status(200).json({
      success: true,
      quoteId,
      message: emailDelivered
        ? 'Your quote request was submitted successfully. Email requests have been accepted for delivery.'
        : 'Your quote request was submitted successfully. Our team will contact you soon.',
      emailDelivered,
      customerEmailSent,
      businessEmailSent,
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
      error:
        'An unexpected server error occurred while processing your quote request. Please try again or reach out on WhatsApp.',
    });
  }
}

// Preserve both API routes for frontend compatibility
app.post('/api/quote', quoteRateLimiter, handleQuoteSubmission);
app.post('/api/quotes', quoteRateLimiter, handleQuoteSubmission);

// --------------------------------------------------
// Serve frontend static files when dist exists
// --------------------------------------------------

const distPath = path.resolve(__dirname, '../dist');

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }

    const cleanPath = req.path.replace(/^\/|\/$/g, '');

    const dedicatedDirIndex = path.join(
      distPath,
      cleanPath,
      'index.html'
    );

    const directHtmlPath = path.join(
      distPath,
      `${cleanPath}.html`
    );

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

    return next();
  });
}

// --------------------------------------------------
// Global error handler
// --------------------------------------------------

app.use((err, req, res, next) => {
  console.error('[Unhandled Error]', err.message);

  if (res.headersSent) {
    return next(err);
  }

  const isCorsError = err.message?.startsWith('CORS policy:');

  return res.status(isCorsError ? 403 : 500).json({
    success: false,
    error: isCorsError
      ? 'This origin is not allowed to access the API.'
      : 'Internal Server Error',
  });
});

// --------------------------------------------------
// Start server
// --------------------------------------------------

app.listen(PORT, () => {
  console.log('=======================================================');
  console.log('  AURA EVENTS Backend Server');
  console.log(`  Running on port:     ${PORT}`);
  console.log(`  Frontend URL:        ${FRONTEND_URL}`);
  console.log('  Email Provider:      Resend API');
  console.log(
    `  Resend Configured:   ${Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL)}`
  );
  console.log(`  Business Email:      ${BUSINESS_EMAIL}`);
  console.log(`  Health Check:        http://localhost:${PORT}/api/health`);
  console.log('=======================================================');
});
