import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env files with override
dotenv.config({ path: path.resolve(__dirname, '../.env'), override: true });
dotenv.config({ path: path.resolve(__dirname, '../server/.env'), override: true });
dotenv.config({ override: true });

const host = process.env.SMTP_HOST || 'smtp.gmail.com';
const port = parseInt(process.env.SMTP_PORT || '465', 10);
const secure = process.env.SMTP_SECURE === 'true' || port === 465;
const user = process.env.SMTP_USER || 'auraevents321@gmail.com';
const rawPass = process.env.SMTP_PASS || '';
const pass = rawPass.trim().replace(/\s+/g, '');
const businessEmail = process.env.BUSINESS_EMAIL || 'auraevents321@gmail.com';

console.log('\n=============================================================');
console.log('   AURA EVENTS — Gmail SMTP Connectivity Verification');
console.log('=============================================================');
console.log(`SMTP Host:       ${host}`);
console.log(`SMTP Port:       ${port} (Secure: ${secure ? 'SSL/TLS' : 'STARTTLS'})`);
console.log(`Gmail Account:   ${user}`);
console.log(`Business Alert:  ${businessEmail}`);
console.log(`Password Status: ${pass ? 'Configured (' + pass.length + ' chars)' : 'NOT CONFIGURED (Empty)'}`);
console.log('-------------------------------------------------------------');

if (!pass) {
  console.log('\n[!] STATUS: PENDING CONFIGURATION');
  console.log('\nYour SMTP_PASS in the .env file is currently empty.');
  console.log('\nTo configure your Gmail App Password:');
  console.log('  1. Open your Google Account Security: https://myaccount.google.com/security');
  console.log('  2. Verify that "2-Step Verification" is turned ON.');
  console.log('  3. Search for "App passwords" or visit: https://myaccount.google.com/apppasswords');
  console.log('  4. Enter an App Name (e.g. "AURA EVENTS") and click "Create".');
  console.log('  5. Google will display a 16-character password (e.g. "abcd efgh ijkl mnop").');
  console.log('  6. Paste it into your backend .env file:');
  console.log('       SMTP_PASS=abcd efgh ijkl mnop');
  console.log('  7. Re-run this verification script:');
  console.log('       npm run verify:smtp\n');
  console.log('=============================================================\n');
  process.exit(0);
}

console.log('\n[*] Attempting SSL/TLS connection and handshake with Gmail SMTP...\n');

const transporter = nodemailer.createTransport({
  host,
  port,
  secure,
  auth: {
    user,
    pass,
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.error('\x1b[31m[x] SMTP CONNECTION FAILED\x1b[0m');
    console.error(`Error details: ${err.message}`);
    console.log('\nTroubleshooting tips:');
    console.log('  1. Ensure 2-Step Verification is enabled on auraevents321@gmail.com');
    console.log('  2. Use a Google "App Password" (16 characters), NOT your regular Google password.');
    console.log('  3. Ensure no trailing characters or quotes in your .env file.');
    console.log('=============================================================\n');
    process.exit(1);
  } else {
    console.log('\x1b[32m[✓] SMTP CONNECTION SUCCESSFUL!\x1b[0m');
    console.log(`[✓] Authenticated as: ${user}`);
    console.log(`[✓] Secure TLS handshake verified with ${host}:${port}`);
    console.log('[✓] AURA EVENTS email delivery system is ready to send customer confirmations and quote alerts!\n');
    console.log('=============================================================\n');
    process.exit(0);
  }
});
