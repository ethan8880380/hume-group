import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, name, source } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Get Cloze credentials from environment variables
    const clozeApiKey = process.env.CLOZE_API_KEY;
    const clozeUser = process.env.CLOZE_USER_EMAIL;

    console.log('Newsletter subscription attempt:', {
      email,
      source,
      hasApiKey: !!clozeApiKey,
      hasUserEmail: !!clozeUser,
      apiKeyLength: clozeApiKey?.length || 0
    });

    // Method 1: Direct Cloze API (preferred)
    if (clozeApiKey && clozeUser) {
      console.log('Using Cloze direct API method');
      const personData = {
        name: name || email.split('@')[0],
        emails: [{
          value: email,
          work: true
        }],
        stage: 'lead',
        tags: ['#home-connection'],
        customFields: [{
          id: 'lead-source',
          type: 'keywords',
          value: source || 'Website Newsletter'
        }],
        note: `Newsletter Subscriber - Subscribed from: ${source || 'Website'} on ${new Date().toISOString()}`
      };

      const clozeResponse = await fetch('https://api.cloze.com/v1/people/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${clozeApiKey}`,
          'X-Cloze-User': clozeUser,
        },
        body: JSON.stringify(personData),
      });

      if (!clozeResponse.ok) {
        const errorData = await clozeResponse.text();
        console.error('Cloze API error:', errorData);
        
        // Check if it's a duplicate contact (which is okay)
        if (clozeResponse.status === 409 || errorData.includes('already exists')) {
          return NextResponse.json(
            { 
              success: true, 
              message: 'You are already subscribed to our newsletter!' 
            },
            { status: 200 }
          );
        }
        
        throw new Error(`Cloze API returned ${clozeResponse.status}: ${errorData}`);
      }

      const result = await clozeResponse.json();
      
      console.log('✅ Successfully added to Cloze:', {
        email,
        result
      });

      return NextResponse.json(
        { 
          success: true, 
          message: 'Successfully subscribed to newsletter!',
          data: result
        },
        { status: 200 }
      );
    }

    // Method 2: Zapier webhook (alternative)
    const zapierWebhook = process.env.ZAPIER_CLOZE_WEBHOOK;
    if (zapierWebhook) {
      console.log('Using Zapier webhook method');
      const webhookData = {
        email,
        name: name || email.split('@')[0],
        source: source || 'Website Newsletter',
        tags: ['Newsletter Subscriber', '#home-connection'],
        subscribed_at: new Date().toISOString(),
      };

      const response = await fetch(zapierWebhook, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData),
      });

      if (!response.ok) {
        throw new Error(`Webhook returned ${response.status}`);
      }

      console.log('✅ Successfully sent to Zapier webhook');
      
      return NextResponse.json(
        { 
          success: true, 
          message: 'Successfully subscribed to newsletter!',
        },
        { status: 200 }
      );
    }

    // Method 3: Email forwarding via SendGrid (alternative)
    const clozeEmail = process.env.CLOZE_IMPORT_EMAIL;
    const sendgridApiKey = process.env.SENDGRID_API_KEY;

    if (clozeEmail && sendgridApiKey) {
      console.log('Using SendGrid email import method');
      const emailData = {
        personalizations: [{
          to: [{ email: clozeEmail }],
          subject: `Newsletter Subscription - ${source || 'Website'}`,
        }],
        from: { 
          email: process.env.FROM_EMAIL || 'noreply@humegroup.com',
          name: 'The Hume Group Website'
        },
        content: [{
          type: 'text/html',
          value: `
            <h2>New Newsletter Subscription</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Name:</strong> ${name || 'Not provided'}</p>
            <p><strong>Source:</strong> ${source || 'Website'}</p>
            <p><strong>Subscribed:</strong> ${new Date().toLocaleString()}</p>
            <hr>
            <p>Contact: ${email}</p>
            <p>Tags: Newsletter Subscriber, #home-connection, ${source || 'Website'}</p>
          `
        }]
      };

      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sendgridApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        throw new Error(`SendGrid API returned ${response.status}`);
      }

      return NextResponse.json(
        { 
          success: true, 
          message: 'Successfully subscribed to newsletter!',
        },
        { status: 200 }
      );
    }

    // If no integration method is configured
    console.error('❌ No Cloze integration method configured');
    console.error('Available env vars:', {
      hasClozeApiKey: !!process.env.CLOZE_API_KEY,
      hasClozeUserEmail: !!process.env.CLOZE_USER_EMAIL,
      hasZapierWebhook: !!process.env.ZAPIER_CLOZE_WEBHOOK,
      hasClozeImportEmail: !!process.env.CLOZE_IMPORT_EMAIL,
      hasSendgridKey: !!process.env.SENDGRID_API_KEY,
    });
    return NextResponse.json(
      { 
        error: 'Newsletter service not configured. Please add CLOZE_API_KEY or ZAPIER_CLOZE_WEBHOOK to your .env.local file.' 
      },
      { status: 500 }
    );

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}

