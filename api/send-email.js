import { Resend } from 'resend';
import { kv } from '@vercel/kv';

const resend = new Resend(process.env.RESEND_API_KEY);

// ============================================
// HELPER FUNCTIONS
// ============================================

async function checkIPRateLimit(ip) {
  const key = `rate_limit:ip:${ip}`;
  const requests = await kv.get(key) || 0;

  if (requests >= 5) {
    return { allowed: false, remaining: 0 };
  }

  await kv.set(key, requests + 1, { ex: 3600 });
  return { allowed: true, remaining: 5 - requests - 1 };
}

async function checkEmailRateLimit(email) {
  const key = `rate_limit:email:${email.toLowerCase()}`;
  const requests = await kv.get(key) || 0;

  if (requests >= 3) {
    return { allowed: false, remaining: 0 };
  }

  await kv.set(key, requests + 1, { ex: 86400 });
  return { allowed: true, remaining: 3 - requests - 1 };
}

function containsSpam(text) {
  const spamWords = [
    'viagra', 'cialis', 'casino', 'lottery', 'winner',
    'congratulations', 'click here', 'free money', 'million dollars',
    'nigerian prince', 'bitcoin investment', 'crypto investment',
    'weight loss', 'pharmacy', 'porn', 'xxx'
  ];

  const lowerText = text.toLowerCase();
  return spamWords.some(word => lowerText.includes(word));
}

function isDisposableEmail(email) {
  const disposableDomains = [
    'tempmail.com', 'guerrillamail.com', '10minutemail.com',
    'mailinator.com', 'throwaway.email', 'temp-mail.org',
    'yopmail.com', 'maildrop.cc', 'sharklasers.com',
    'trashmail.com', 'fakeinbox.com'
  ];

  const domain = email.split('@')[1]?.toLowerCase();
  return disposableDomains.includes(domain);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegex.test(email);
}

// ============================================
// MAIN HANDLER
// ============================================

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      errorCode: 'methodNotAllowed'
    });
  }

  try {
    const { name, email, message, honeypot } = req.body;

    // Honeypot Check
    if (honeypot) {
      console.log('🤖 Bot detected via honeypot');
      return res.status(200).json({
        success: true,
        message: 'შეტყობინება გაიგზავნა'
      });
    }

    // Required Fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        errorCode: 'allFieldsRequired'
      });
    }

    // Email Format
    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        errorCode: 'invalidEmailFormat'
      });
    }

    // Length Limits
    if (name.length > 100) {
      return res.status(400).json({
        success: false,
        errorCode: 'nameTooLong'
      });
    }

    if (message.length < 10) {
      return res.status(400).json({
        success: false,
        errorCode: 'messageTooShort'
      });
    }

    if (message.length > 2000) {
      return res.status(400).json({
        success: false,
        errorCode: 'messageTooLong'
      });
    }

    // Disposable Email Check
    if (isDisposableEmail(email)) {
      return res.status(400).json({
        success: false,
        errorCode: 'disposableEmailNotAllowed'
      });
    }

    // Spam Content Check
    if (containsSpam(name + ' ' + message)) {
      console.log('🚫 Spam content detected');
      return res.status(400).json({
        success: false,
        errorCode: 'spamContentDetected'
      });
    }

    // IP Rate Limit
    const ip = req.headers['x-forwarded-for']?.split(',')[0] ||
               req.headers['x-real-ip'] ||
               req.socket.remoteAddress ||
               'unknown';

    const ipLimit = await checkIPRateLimit(ip);
    if (!ipLimit.allowed) {
      return res.status(429).json({
        success: false,
        errorCode: 'ipRateLimitExceeded'
      });
    }

    // Email Rate Limit
    const emailLimit = await checkEmailRateLimit(email);
    if (!emailLimit.allowed) {
      return res.status(429).json({
        success: false,
        errorCode: 'emailRateLimitExceeded'
      });
    }

    // ============================================
    // SEND EMAIL - FIXED VERSION
    // ============================================

    console.log('📧 Attempting to send email...');
    console.log('From: onboarding@resend.dev');
    console.log('To:', process.env.ADMIN_EMAIL);
    console.log('Name:', name);
    console.log('Email:', email);

    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.ADMIN_EMAIL,
      subject: `🔔 ახალი შეტყობინება - ${name}`,
      replyTo: email,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #007bff; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .info { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #007bff; }
            .footer { background: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #666; }
            .label { font-weight: bold; color: #555; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">📧 ახალი კონტაქტის შეტყობინება</h2>
            </div>

            <div class="content">
              <div class="info">
                <p><span class="label">👤 სახელი:</span> ${name}</p>
                <p><span class="label">📧 Email:</span> <a href="mailto:${email}">${email}</a></p>
                <p><span class="label">🌐 IP Address:</span> ${ip}</p>
                <p><span class="label">📅 თარიღი:</span> ${new Date().toLocaleString('ka-GE', {
                  timeZone: 'Asia/Tbilisi'
                })}</p>
              </div>

              <div class="info">
                <p class="label">💬 მესიჯი:</p>
                <p style="white-space: pre-wrap;">${message}</p>
              </div>

              <div class="info" style="border-left-color: #28a745;">
                <p style="margin: 0; font-size: 12px;">
                  <span class="label">ℹ️ Rate Limit Status:</span><br>
                  IP: ${ipLimit.remaining} მოთხოვნა დარჩა (1 საათში)<br>
                  Email: ${emailLimit.remaining} მოთხოვნა დარჩა (24 საათში)
                </p>
              </div>
            </div>

            <div class="footer">
              <p>ეს შეტყობინება გამოიგზავნა თქვენი საიტის კონტაქტის ფორმიდან</p>
              <p>პასუხის გასაცემად დააჭირეთ "Reply" ღილაკს</p>
            </div>
          </div>
        </body>
        </html>
      `
    });

    // ✅ DETAILED LOGGING
    console.log('📬 Resend API Response:', JSON.stringify(result, null, 2));

    // Check if result has error
    if (result.error) {
      console.error('❌ Resend returned error:', result.error);
      return res.status(500).json({
        success: false,
        errorCode: 'emailSendFailed',
        details: result.error
      });
    }

    // Check if result has id (success)
    if (result.data && result.data.id) {
      console.log('✅ Email sent successfully! ID:', result.data.id);
      return res.status(200).json({
        success: true,
        message: 'შეტყობინება წარმატებით გაიგზავნა!',
        emailId: result.data.id
      });
    }

    // Fallback - no error but also no id
    console.warn('⚠️ Resend response unclear:', result);
    return res.status(200).json({
      success: true,
      message: 'შეტყობინება გაიგზავნა',
      emailId: result.id || 'unknown'
    });

  } catch (error) {
    console.error('❌ Email sending error:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });

    return res.status(500).json({
      success: false,
      errorCode: 'serverError',
      details: error.message
    });
  }
}
