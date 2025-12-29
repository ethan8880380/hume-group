import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ValuationRequest {
  // Property Address
  address: string;
  city: string;
  state: string;
  zipCode: string;
  // Contact Information
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  additionalDetails?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ValuationRequest = await request.json();
    const {
      address,
      city,
      state,
      zipCode,
      firstName,
      lastName,
      email,
      phone,
      additionalDetails,
    } = body;

    // Validate required fields
    if (!address || !city || !state || !zipCode || !firstName || !lastName || !email) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const fullAddress = `${address}, ${city}, ${state} ${zipCode}`;

    // Create transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

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
      subject: `🏠 New Home Valuation Request from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #16a34a; padding-bottom: 10px;">
            🏠 New Home Valuation Request
          </h2>
          
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #16a34a;">
            <h3 style="color: #166534; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #555; margin-top: 0;">Property Address</h3>
            <p style="font-size: 16px; font-weight: bold;">${fullAddress}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #555; margin-top: 0;">Additional Details</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${additionalDetails || "None provided"}</p>
          </div>
          
          <p style="color: #888; font-size: 12px; margin-top: 30px; text-align: center;">
            This email was sent from the Hume Group website home valuation form.
          </p>
        </div>
      `,
      text: `
New Home Valuation Request

Contact Information
-------------------
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone || "Not provided"}

Property Address
----------------
${fullAddress}

Additional Details
------------------
${additionalDetails || "None provided"}

---
This email was sent from the Hume Group website home valuation form.
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Log the request
    console.log('Valuation request received:', {
      address: fullAddress,
      contact: `${firstName} ${lastName} (${email})`,
      phone: phone || "Not provided",
      additionalDetails: additionalDetails || "None",
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Valuation request submitted successfully',
    });

  } catch (error) {
    console.error('Valuation API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to process request' 
      },
      { status: 500 }
    );
  }
}
