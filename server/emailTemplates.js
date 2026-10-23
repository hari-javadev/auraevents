/**
 * Email templates for AURA EVENTS
 * Designed for maximum deliverability, cross-client compatibility (Gmail, Outlook, Apple Mail),
 * and compliance with anti-spam standards (CAN-SPAM, RFC 5322).
 */

/**
 * Customer Thank-You Email Template
 * 
 * Requirements:
 * - Sent ONLY to the submitter's email address.
 * - Never includes business enquiry details.
 * - Clean inline-styled HTML + 1:1 matching plain-text part.
 * - High text contrast, no broken tracking pixels, no script tags.
 */
export function getCustomerThankYouTemplate({ fullName }) {
  const customerName = fullName && fullName.trim() ? fullName.trim() : 'Valued Client';

  // Exact plaintext message matching HTML content 1:1
  const text = `Dear ${customerName},

Thank you for contacting AURA EVENTS! We have successfully received your event enquiry. Our team will review your requirements and contact you soon.

We appreciate your interest in our services and look forward to making your celebration special!

Best regards,
AURA EVENTS Team

---
AURA EVENTS • We Make Every Celebration Special
This email was sent in response to your enquiry on our website.`.trim();

  // Bulletproof HTML email with 100% inline styles and table-based architecture
  const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no" />
  <title>Thank You for Choosing AURA EVENTS!</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0a09; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #FAF6EE;">
  
  <!-- Outer Wrapper Table -->
  <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#0b0a09" style="background-color: #0b0a09; width: 100%; margin: 0; padding: 30px 10px;">
    <tr>
      <td align="center" valign="top">
        
        <!-- Main Email Container Card -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#15120F" style="max-width: 580px; background-color: #15120F; border: 1px solid #D8B46A; border-radius: 10px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.6);">
          
          <!-- Brand Header -->
          <tr>
            <td align="center" bgcolor="#1C1814" style="background-color: #1C1814; padding: 32px 20px 24px 20px; border-bottom: 1px solid rgba(216, 180, 106, 0.3);">
              <h1 style="margin: 0; padding: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 26px; font-weight: bold; letter-spacing: 4px; color: #D8B46A; text-transform: uppercase;">
                AURA EVENTS
              </h1>
              <p style="margin: 6px 0 0 0; font-size: 11px; letter-spacing: 2px; color: #E8D9C0; text-transform: uppercase; font-weight: 500;">
                Premium Event Styling &amp; DJ Production
              </p>
            </td>
          </tr>

          <!-- Email Content Body -->
          <tr>
            <td style="padding: 36px 32px 30px 32px; font-size: 15px; line-height: 1.75; color: #FAF6EE; background-color: #15120F;">
              
              <p style="margin: 0 0 18px 0; font-size: 16px; color: #FAF6EE;">
                Dear ${customerName},
              </p>

              <p style="margin: 0 0 18px 0; color: #FAF6EE;">
                Thank you for contacting AURA EVENTS! We have successfully received your event enquiry. Our team will review your requirements and contact you soon.
              </p>

              <p style="margin: 0 0 24px 0; color: #FAF6EE;">
                We appreciate your interest in our services and look forward to making your celebration special!
              </p>

              <!-- Signature Area -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-top: 24px; padding-top: 18px; border-top: 1px solid rgba(216, 180, 106, 0.25);">
                <tr>
                  <td style="font-size: 14px; line-height: 1.5; color: #FAF6EE;">
                    Best regards,<br />
                    <strong style="color: #D8B46A; font-size: 15px; letter-spacing: 0.5px;">AURA EVENTS Team</strong>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer Information -->
          <tr>
            <td align="center" bgcolor="#0E0C0A" style="background-color: #0E0C0A; padding: 20px 24px; border-top: 1px solid rgba(216, 180, 106, 0.2); font-size: 11px; line-height: 1.6; color: #D1C4AF;">
              <p style="margin: 0 0 4px 0; color: #D1C4AF;">
                <strong>AURA EVENTS</strong> &bull; We Make Every Celebration Special
              </p>
              <p style="margin: 0; color: #B5A895;">
                This email was sent in response to your enquiry on our website.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`.trim();

  return { html, text };
}

/**
 * Business Notification Email Template
 * Sent ONLY to auraevents321@gmail.com with complete customer enquiry details.
 */
export function getBusinessNotificationTemplate({
  fullName,
  email,
  phone,
  eventType,
  eventDate,
  eventLocation,
  estimatedBudget,
  message,
  quoteId,
  submittedAt,
}) {
  const formattedDate = eventDate
    ? new Date(eventDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Not specified';

  const text = `
NEW EVENT QUOTE ENQUIRY [${quoteId}]
==================================================
Customer Details:
- Name:     ${fullName}
- Email:    ${email}
- Phone:    ${phone}

Event Specifications:
- Event:    ${eventType}
- Date:     ${formattedDate}
${eventLocation ? `- Location: ${eventLocation}\n` : ''}${estimatedBudget ? `- Budget:   ${estimatedBudget}\n` : ''}- Submitted:${submittedAt}

Customer Message:
${message || 'No additional message provided.'}
==================================================
`.trim();

  const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Event Quote Request — AURA EVENTS</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0a09; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #FAF6EE;">
  
  <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#0b0a09" style="background-color: #0b0a09; width: 100%; padding: 25px 10px;">
    <tr>
      <td align="center" valign="top">
        
        <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#15120F" style="max-width: 600px; background-color: #15120F; border: 1px solid #D8B46A; border-radius: 8px; overflow: hidden;">
          
          <tr>
            <td align="center" bgcolor="#1C1814" style="background-color: #1C1814; padding: 24px 20px; border-bottom: 1px solid rgba(216, 180, 106, 0.3);">
              <h2 style="margin: 0; font-family: Georgia, serif; font-size: 20px; color: #D8B46A; letter-spacing: 2px;">
                NEW EVENT QUOTE REQUEST
              </h2>
              <p style="margin: 6px 0 0 0; color: #E8D9C0; font-size: 13px;">
                Reference: <strong style="color: #D8B46A;">${quoteId}</strong>
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 26px 24px; font-size: 14px; line-height: 1.6; color: #FAF6EE;">
              
              <h3 style="color: #D8B46A; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; margin: 0 0 12px 0; border-bottom: 1px solid rgba(216, 180, 106, 0.25); padding-bottom: 6px;">
                Customer Information
              </h3>
              <table width="100%" border="0" cellpadding="6" cellspacing="0" style="margin-bottom: 20px; font-size: 14px;">
                <tr>
                  <td width="35%" style="color: #D8B46A; font-weight: bold;">Full Name:</td>
                  <td style="color: #FAF6EE;"><strong>${fullName}</strong></td>
                </tr>
                <tr>
                  <td style="color: #D8B46A; font-weight: bold;">Email:</td>
                  <td><a href="mailto:${email}" style="color: #EECB76; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="color: #D8B46A; font-weight: bold;">Phone:</td>
                  <td><a href="tel:${phone}" style="color: #EECB76; text-decoration: none;">${phone}</a></td>
                </tr>
              </table>

              <h3 style="color: #D8B46A; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; margin: 20px 0 12px 0; border-bottom: 1px solid rgba(216, 180, 106, 0.25); padding-bottom: 6px;">
                Event Specifications
              </h3>
              <table width="100%" border="0" cellpadding="6" cellspacing="0" style="margin-bottom: 20px; font-size: 14px;">
                <tr>
                  <td width="35%" style="color: #D8B46A; font-weight: bold;">Event Type:</td>
                  <td><span style="background-color: rgba(216, 180, 106, 0.15); border: 1px solid #D8B46A; color: #EECB76; padding: 3px 8px; border-radius: 4px; font-weight: bold;">${eventType}</span></td>
                </tr>
                <tr>
                  <td style="color: #D8B46A; font-weight: bold;">Event Date:</td>
                  <td style="color: #FAF6EE;">${formattedDate}</td>
                </tr>
                ${eventLocation ? `
                <tr>
                  <td style="color: #D8B46A; font-weight: bold;">Location:</td>
                  <td style="color: #FAF6EE;">${eventLocation}</td>
                </tr>` : ''}
                ${estimatedBudget ? `
                <tr>
                  <td style="color: #D8B46A; font-weight: bold;">Budget:</td>
                  <td style="color: #FAF6EE;">${estimatedBudget}</td>
                </tr>` : ''}
                <tr>
                  <td style="color: #D8B46A; font-weight: bold;">Submitted:</td>
                  <td style="color: #FAF6EE;">${submittedAt}</td>
                </tr>
              </table>

              ${message ? `
              <h3 style="color: #D8B46A; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; margin: 20px 0 12px 0; border-bottom: 1px solid rgba(216, 180, 106, 0.25); padding-bottom: 6px;">
                Customer Message
              </h3>
              <div style="background-color: #0b0a09; padding: 14px; border-left: 3px solid #D8B46A; border-radius: 4px; font-size: 13.5px; line-height: 1.6; color: #FAF6EE; margin-bottom: 24px;">
                ${message.replace(/\n/g, '<br/>')}
              </div>
              ` : ''}

              <!-- Action Links -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-top: 25px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${email}?subject=Re: Your AURA EVENTS Enquiry [${quoteId}]" style="display: inline-block; background-color: #D8B46A; color: #090807; font-weight: bold; padding: 10px 20px; border-radius: 20px; text-decoration: none; margin-right: 10px; font-size: 13px;">Reply by Email</a>
                    <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" target="_blank" style="display: inline-block; background-color: #25D366; color: #ffffff; font-weight: bold; padding: 10px 20px; border-radius: 20px; text-decoration: none; font-size: 13px;">Open in WhatsApp</a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`.trim();

  return { html, text };
}
