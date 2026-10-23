# AURA EVENTS — Luxury Event Decoration & DJ Services

> **“We Make Every Celebration Special”**

A complete, production-ready, high-performance website and enquiry management system for **AURA EVENTS**, specializing in luxury stage decor, birthday party styling, wedding & corporate celebrations, and high-energy DJ services.

Built with **React (Vite)**, **Tailwind CSS**, **Framer Motion**, **Lucide Icons**, and an **Express + Nodemailer** backend with automated quote confirmation workflows and WhatsApp integration.

---

## 🌟 Key Highlights

- **Luxury Visual Identity**: Bespoke color palette featuring Rich Black (`#090807`), Deep Charcoal (`#15120F`), Champagne Gold (`#D8B46A`), Warm Ivory (`#FFF8EA`), and Soft Beige (`#E8D9C0`).
- **High-Performance Architecture**: Built with Vite + React 18, optimized asset loading, preloaded hero stage imagery, and zero layout shift.
- **Brand Imagery Integration**: Direct integration with original AURA EVENTS brand assets (`public/images/aura.logo.png`, `hero.png`, `img1.png`, `img2.png`, `img3.png`, `img4.png`).
- **End-to-End Quote Workflow**:
  - Live client-side and server-side validation.
  - Rate limiting & anti-bot honeypot protection.
  - Unique quote reference generator (e.g. `AURA-20261023-8392`).
  - Automatic luxury HTML confirmation email sent to the customer.
  - Immediate notification email dispatched to the business inbox.
  - Real-time animated gold checkmark success panel with WhatsApp instant follow-up.
- **WhatsApp Click-to-Chat**: Floating action button and contextual quote links using the official `https://wa.me/` standard with service-aware pre-filled messages.
- **Interactive Lightbox Portfolio**: Keyboard-navigable image gallery (`Esc`, `ArrowLeft`, `ArrowRight`) with category filtering.
- **Accessibility & Motion**: Respects `prefers-reduced-motion`, semantic HTML landmarks, full keyboard support, and ARIA labels.

---

## 📁 Project Structure

```text
aura-events/
├── public/
│   └── images/
│       ├── aura.logo.png       # Original AURA EVENTS logo (object-fit: contain)
│       ├── hero.png            # Stage background artwork
│       ├── img1.png            # Stage Decoration service card
│       ├── img2.png            # Birthday Decoration service card
│       ├── img3.png            # All Types of Events service card
│       └── img4.png            # DJ Service card
├── server/
│   ├── .env.example            # Environment variables template
│   ├── emailTemplates.js       # Luxury HTML & plaintext email templates
│   ├── package.json            # Standalone backend package file
│   └── server.js               # Express API, rate limiter, Nodemailer integration
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Sticky navbar with blur & mobile menu
│   │   ├── Hero.jsx            # Cinematic hero with gold accents
│   │   ├── Services.jsx        # 4-card responsive grid
│   │   ├── ServiceCard.jsx     # Card artwork, zoom effect & "Enquire Now"
│   │   ├── About.jsx           # Editorial story & core service checklist
│   │   ├── WhyChooseUs.jsx     # 4 brand pillars with custom icons
│   │   ├── Gallery.jsx         # Portfolio grid & keyboard lightbox
│   │   ├── HowItWorks.jsx      # 4-step event planning timeline
│   │   ├── QuoteForm.jsx       # Interactive form, validation & success state
│   │   ├── Contact.jsx         # Direct channels, hours & location
│   │   ├── Footer.jsx          # Brand logo, dynamic copyright & quick links
│   │   └── WhatsAppButton.jsx  # Floating WhatsApp button with pulse effect
│   ├── config/
│   │   └── siteConfig.js       # Centralized business info & WhatsApp configuration
│   ├── App.jsx                 # Root component & service selection state
│   ├── index.css               # Tailwind directives & luxury styling classes
│   └── main.jsx                # React DOM entry point
├── index.html                  # SEO metadata, Open Graph, fonts & preload
├── package.json                # Project dependencies & concurrently scripts
├── tailwind.config.js          # Extended brand color scheme & fonts
└── vite.config.js              # Vite React configuration with /api proxy
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher

### 2. Install Dependencies
Run the following command in the project root:

```bash
npm install
```

---

## 💻 Running the Application

### Option A: Run Both Frontend & Backend Together (Recommended)
You can run both Vite (frontend on `http://localhost:5173`) and Express (backend on `http://localhost:5000`) simultaneously with one command:

```bash
npm run dev
```

### Option B: Run Individually in Separate Terminals

**Terminal 1 — Backend Express Server:**
```bash
npm run dev:server
```
*Runs on `http://localhost:5000` (Health Check: `http://localhost:5000/api/health`)*

**Terminal 2 — Frontend React App:**
```bash
npm run dev:client
```
*Opens on `http://localhost:5173`*

---

## ⚙️ Configuration

### 1. Centralized Business & WhatsApp Settings
Edit `src/config/siteConfig.js` to change:
- **WhatsApp Phone Number**: Set `whatsappNumber` in international format without spaces, hyphens, or a plus sign (e.g., `919876543210`).
- **Contact Details**: Phone, email, service area description, operating hours.
- **Social Media Links**: Add URLs when available.

You can also pass environment variables in a root `.env`:
```env
VITE_WHATSAPP_NUMBER=919876543210
VITE_BUSINESS_PHONE=+91 98765 43210
VITE_BUSINESS_EMAIL=contact@auraevents.com
```

### 2. Gmail SMTP Setup (Configured for auraevents321@gmail.com)
The backend is configured for Gmail SMTP over secure SSL/TLS on port 465.

Edit your `.env` file (located in the root or `server/` directory):

```env
PORT=5000
FRONTEND_URL=http://localhost:5173

# Gmail SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=auraevents321@gmail.com
SMTP_PASS=your-16-character-app-password
SMTP_FROM="AURA EVENTS" <auraevents321@gmail.com>

# Business Notification Email
BUSINESS_EMAIL=auraevents321@gmail.com
```

#### How to Generate your Gmail 16-Character App Password:
1. Go to your **Google Account Security** settings: [https://myaccount.google.com/security](https://myaccount.google.com/security)
2. Ensure **2-Step Verification** is turned **ON** for `auraevents321@gmail.com`.
3. Open **App passwords**: [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
4. Under App name, type `AURA EVENTS` and click **Create**.
5. Google will display a 16-character password (e.g., `abcd efgh ijkl mnop`).
6. Copy that 16-character password and paste it into `SMTP_PASS=` in `.env`:
   ```env
   SMTP_PASS=abcd efgh ijkl mnop
   ```
7. Save the file.

#### Verify Your SMTP Connection (Without Sending Fake Emails):
Run the automated verification script:
```bash
npm run verify:smtp
```
Or check via browser / API while the server is running:
`http://localhost:5000/api/test-smtp`

If authenticated, the script and endpoint will output:
`[✓] Successfully connected and authenticated with smtp.gmail.com:465 using SSL/TLS!`

> **Important**: Email-provider acceptance by SMTP does not guarantee delivery to the recipient's primary inbox, as recipient spam filters and domain SPF/DKIM records influence delivery. For high-volume production, use verified domain providers such as Amazon SES, Resend, or Brevo.

---

## 🧪 Testing Quote Submissions

1. Start both servers (`npm run dev`).
2. Open `http://localhost:5173`.
3. Click any **“Enquire Now”** button under a service card (e.g., *DJ Service*).
4. Notice how the page smoothly scrolls to the form and pre-selects *DJ Service*.
5. Fill in:
   - Full Name: `Eleanor Vance`
   - Email: `your_test_email@example.com`
   - Phone: `+91 98765 43210`
   - Event Date, Location, Budget, and Message.
6. Click **“Submit Quote Request”**.
7. Observe the loading state. Upon confirmation from the backend:
   - The animated gold checkmark appears.
   - A unique Quote Reference ID (e.g. `AURA-20261023-8392`) is shown.
   - The customer receives an acknowledgement email.
   - The business receives a complete enquiry email.
   - Quick action buttons allow returning to the home screen or continuing discussion on WhatsApp.

---

## 🏗️ Building for Production

To create an optimized production build:

```bash
npm run build
```

This generates compiled, minified, and tree-shaken static assets inside the `dist/` directory.

To test the production build locally:

```bash
npm run preview
```

---

## 🌐 Deployment Instructions

### Frontend (Vercel / Netlify / Cloudflare Pages)
1. Link your Git repository.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Set environment variable: `VITE_WHATSAPP_NUMBER` and `VITE_BUSINESS_EMAIL` (if customized).

### Backend (Render / Railway / Fly.io / VPS)
1. Point to the `server/` directory or root repository.
2. Start command: `node server/server.js`
3. Set the production environment variables:
   - `PORT=5000`
   - `FRONTEND_URL=https://your-production-domain.com`
   - `SMTP_HOST=...`
   - `SMTP_PORT=587`
   - `SMTP_SECURE=false`
   - `SMTP_USER=...`
   - `SMTP_PASS=...`
   - `BUSINESS_EMAIL=...`

---

## 📄 License
© AURA EVENTS. All rights reserved.
