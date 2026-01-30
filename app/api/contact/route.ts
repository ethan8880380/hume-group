import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  _hp?: string; // Honeypot field
  _ts?: number; // Form load timestamp
  _recaptcha?: string; // reCAPTCHA v3 token
}

interface RecaptchaResponse {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  "error-codes"?: string[];
}

// Verify reCAPTCHA token with Google
async function verifyRecaptcha(token: string): Promise<{ success: boolean; score: number }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    console.warn("reCAPTCHA secret key not configured");
    return { success: true, score: 1 }; // Allow if not configured
  }
  
  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${token}`,
    });
    
    const data: RecaptchaResponse = await response.json();
    
    return {
      success: data.success,
      score: data.score || 0,
    };
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return { success: false, score: 0 };
  }
}

// Spam detection patterns
const SPAM_PATTERNS = [
  /\b(viagra|cialis|casino|lottery|winner|bitcoin|crypto|investment opportunity)\b/i,
  /\b(click here|buy now|limited time|act now|free money)\b/i,
  /https?:\/\/[^\s]+\.[^\s]+/gi, // Multiple URLs
  /\[url=|<a\s+href=/i, // BBCode or HTML links
];

// Common spam email domains
const SPAM_EMAIL_DOMAINS = [
  'tempmail.com', 'throwaway.email', 'mailinator.com', 'guerrillamail.com',
  'fakeinbox.com', 'trashmail.com', 'getnada.com', '10minutemail.com',
];

function isSpamContent(content: string): boolean {
  // Check for spam patterns
  let matchCount = 0;
  for (const pattern of SPAM_PATTERNS) {
    if (pattern.test(content)) {
      matchCount++;
    }
  }
  // If more than 1 spam pattern matched, likely spam
  if (matchCount > 1) return true;
  
  // Check for excessive caps (more than 50% uppercase, min 20 chars)
  if (content.length > 20) {
    const upperCount = (content.match(/[A-Z]/g) || []).length;
    const letterCount = (content.match(/[a-zA-Z]/g) || []).length;
    if (letterCount > 0 && upperCount / letterCount > 0.5) return true;
  }
  
  return false;
}

// Detect gibberish/random strings (like "phQmVuXySoxbxmmrU")
function isGibberish(text: string): boolean {
  // Skip short text
  if (text.length < 6) return false;
  
  // Check for random case switching (aAbBcC pattern) - real names don't do this
  const caseChanges = (text.match(/[a-z][A-Z]|[A-Z][a-z]/g) || []).length;
  const letterCount = (text.match(/[a-zA-Z]/g) || []).length;
  
  // High frequency of case changes relative to length = gibberish
  // "phQmVuXySoxbxmmrU" has many case changes
  if (letterCount > 8 && caseChanges / letterCount > 0.3) return true;
  
  // Check for lack of vowels (gibberish often has weird vowel ratios)
  const vowels = (text.match(/[aeiouAEIOU]/g) || []).length;
  const consonants = letterCount - vowels;
  
  // Very low vowel ratio suggests gibberish (normal English ~40% vowels)
  if (letterCount > 8 && vowels / letterCount < 0.15) return true;
  
  // Very long "words" without spaces are suspicious for names
  const words = text.split(/\s+/);
  for (const word of words) {
    // Names longer than 15 chars without hyphens are suspicious
    if (word.length > 15 && !word.includes('-') && !word.includes("'")) {
      return true;
    }
  }
  
  // Check for no recognizable word patterns (consecutive consonants)
  // More than 4 consonants in a row is rare in English names
  if (/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]{5,}/i.test(text)) {
    return true;
  }
  
  return false;
}

// Check if a name looks legitimate
function isValidName(name: string): boolean {
  // Names should be reasonably short
  if (name.length > 30) return false;
  
  // Names should mostly be letters, spaces, hyphens, apostrophes
  const validChars = name.replace(/[a-zA-Z\s\-'\.]/g, '');
  if (validChars.length > 0) return false; // Has invalid characters
  
  // Check if it's gibberish
  if (isGibberish(name)) return false;
  
  return true;
}

function isSpamEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  return SPAM_EMAIL_DOMAINS.some(spamDomain => domain === spamDomain);
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { firstName, lastName, email, phone, message, _hp, _ts, _recaptcha } = body;

    // Anti-bot: Check honeypot field (should be empty)
    if (_hp) {
      // Return fake success to not tip off bots
      return NextResponse.json(
        { success: true, message: "Email sent successfully" },
        { status: 200 }
      );
    }

    // Anti-bot: Check submission time (minimum 3 seconds)
    if (_ts) {
      const timeElapsed = Date.now() - _ts;
      if (timeElapsed < 3000) {
        // Too fast, likely a bot - return fake success
        return NextResponse.json(
          { success: true, message: "Email sent successfully" },
          { status: 200 }
        );
      }
    }

    // Anti-bot: Verify reCAPTCHA v3 token
    if (_recaptcha) {
      const recaptchaResult = await verifyRecaptcha(_recaptcha);
      
      // Score ranges from 0.0 (likely bot) to 1.0 (likely human)
      // 0.5 is a reasonable threshold - adjust if needed
      if (!recaptchaResult.success || recaptchaResult.score < 0.5) {
        // Low score = likely bot - return fake success
        return NextResponse.json(
          { success: true, message: "Email sent successfully" },
          { status: 200 }
        );
      }
    }

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Anti-spam: Check for spam email domains
    if (isSpamEmail(email)) {
      return NextResponse.json(
        { success: true, message: "Email sent successfully" },
        { status: 200 }
      );
    }

    // Anti-spam: Check content for spam patterns
    const fullContent = `${firstName} ${lastName} ${message}`;
    if (isSpamContent(fullContent)) {
      return NextResponse.json(
        { success: true, message: "Email sent successfully" },
        { status: 200 }
      );
    }

    // Anti-spam: Check for gibberish names
    if (!isValidName(firstName) || !isValidName(lastName)) {
      return NextResponse.json(
        { success: true, message: "Email sent successfully" },
        { status: 200 }
      );
    }

    // Anti-spam: Check for gibberish message
    if (isGibberish(message)) {
      return NextResponse.json(
        { success: true, message: "Email sent successfully" },
        { status: 200 }
      );
    }

    // Anti-spam: Message too short to be meaningful (likely spam)
    if (message.trim().length < 10) {
      return NextResponse.json(
        { success: true, message: "Email sent successfully" },
        { status: 200 }
      );
    }

    // Create transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Format phone number
    const formattedPhone = phone || "Not provided";

    // Build recipient list - supports multiple emails via CONTACT_EMAIL and CONTACT_EMAIL_2
    const recipients: string[] = [];
    if (process.env.CONTACT_EMAIL) recipients.push(process.env.CONTACT_EMAIL);
    if (process.env.CONTACT_EMAIL_2) recipients.push(process.env.CONTACT_EMAIL_2);
    if (recipients.length === 0 && process.env.GMAIL_USER) {
      recipients.push(process.env.GMAIL_USER);
    }

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: recipients,
      replyTo: email,
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #555; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${formattedPhone}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h3 style="color: #555; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <p style="color: #888; font-size: 12px; margin-top: 30px; text-align: center;">
            This email was sent from the Hume Group website contact form.
          </p>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${formattedPhone}

Message:
${message}

---
This email was sent from the Hume Group website contact form.
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}

