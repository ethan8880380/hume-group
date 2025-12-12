# Cloze CRM Integration Setup

This document explains how to integrate Cloze CRM with your newsletter subscription forms.

## Overview

All newsletter subscription boxes in the application can integrate with Cloze CRM. When a user subscribes to the newsletter, their information is automatically added to your Cloze account as a contact.

## Newsletter Subscription Locations

Newsletter subscription boxes are integrated in the following locations:
1. **Footer** - Newsletter section (all pages)
2. **Blog Post Page** - Sticky sidebar subscription box
3. **Listing Detail Page** - Bottom CTA subscription section

## Integration Methods

Cloze supports two integration methods. Choose the one that works best for you:

### Method 1: Zapier Webhook (Recommended - Easiest)

This is the easiest method and doesn't require coding changes.

#### Step 1: Create a Zapier Account

1. Sign up for [Zapier](https://zapier.com/) (free plan works fine)
2. Create a new Zap

#### Step 2: Set Up the Webhook Trigger

1. Search for **Webhooks by Zapier** as the trigger
2. Choose **Catch Hook** as the trigger event
3. Zapier will give you a webhook URL - **copy this URL**

#### Step 3: Set Up Cloze Action

1. Click **Continue** and add an action
2. Search for **Cloze** and select it
3. Choose **Create or Update Person** as the action event
4. Connect your Cloze account
5. Map the fields:
   - **Email** → `email`
   - **Name** → `name`
   - **Tags** → Add "Newsletter Subscriber"
   - **Note** → Use `source` and `subscribed_at` to track where they came from

#### Step 4: Configure Environment Variable

Add the webhook URL to your `.env.local` file:

```bash
# Zapier Webhook for Cloze Integration
ZAPIER_CLOZE_WEBHOOK=https://hooks.zapier.com/hooks/catch/XXXXXX/XXXXXX/
```

#### Step 5: Test the Integration

1. Restart your development server: Stop (Ctrl+C) and run `npm run dev` again
2. Navigate to any page with a newsletter subscription box
3. Enter a test email address and click "Subscribe"
4. Check your Zapier dashboard to see if the webhook was triggered
5. Check your Cloze account to verify the contact was created

---

### Method 2: Email Forwarding via SendGrid (Alternative)

If you prefer not to use Zapier, you can use Cloze's email import feature with SendGrid.

#### Step 1: Get Your Cloze Import Email

1. Log in to your [Cloze account](https://app.cloze.com/)
2. Go to **Settings** → **Email**
3. Find your unique Cloze import email address (usually looks like `username+import@cloze.com`)
4. Copy this email address

#### Step 2: Set Up SendGrid

1. Sign up for [SendGrid](https://sendgrid.com/) (free plan works)
2. Create an API key with "Mail Send" permissions
3. Verify a sender email address

#### Step 3: Configure Environment Variables

Add the following to your `.env.local` file:

```bash
# Cloze Email Import Method
CLOZE_IMPORT_EMAIL=your_username+import@cloze.com
SENDGRID_API_KEY=your_sendgrid_api_key_here
FROM_EMAIL=noreply@yourdomain.com
```

#### Step 4: Test the Integration

1. Restart your development server
2. Submit a test subscription
3. Check your Cloze account - the contact should appear within a few minutes

## Component Usage

The `NewsletterSubscribe` component is a reusable component located at `components/newsletter-subscribe.tsx`.

### Basic Usage

```tsx
import { NewsletterSubscribe } from "@/components/newsletter-subscribe";

// Inline variant (default)
<NewsletterSubscribe 
  variant="inline"
  source="Your Page Name"
  inputClassName="your-custom-classes"
  buttonClassName="your-custom-classes"
/>

// Card variant (stacked layout)
<NewsletterSubscribe 
  variant="card"
  source="Your Page Name"
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"inline" \| "card"` | `"inline"` | Layout style of the subscription form |
| `source` | `string` | `"Website"` | Identifier for tracking subscription source in Cloze |
| `className` | `string` | `""` | Additional CSS classes for the container |
| `inputClassName` | `string` | `""` | Additional CSS classes for the input field |
| `buttonClassName` | `string` | `""` | Additional CSS classes for the button |
| `buttonSize` | `"default" \| "sm" \| "lg" \| "icon"` | `"lg"` | Size of the subscribe button |

### Features

- ✅ Real-time form validation
- ✅ Loading states during submission
- ✅ Success/error messaging
- ✅ Automatic duplicate detection
- ✅ Accessible and responsive design
- ✅ Source tracking for analytics

## API Endpoint

The newsletter subscription is handled by the API route at `app/api/newsletter/route.ts`.

### Request Format

```json
{
  "email": "user@example.com",
  "name": "John Doe", // Optional
  "source": "Footer Newsletter"
}
```

### Response Format

**Success:**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter!",
  "data": { /* Cloze API response */ }
}
```

**Error:**
```json
{
  "error": "Error message here"
}
```

## Cloze Integration Details

When a user subscribes, the following data is sent to Cloze:

- **Name**: User's name (or derived from email if not provided)
- **Email**: User's email address
- **Segments**: Tagged as "Newsletter Subscriber"
- **Source**: The page/location where they subscribed
- **Notes**: Timestamp and source information

### Duplicate Handling

If a user subscribes with an email that already exists in Cloze:
- The API returns a success message: "You are already subscribed to our newsletter!"
- No duplicate contact is created
- The user sees a friendly confirmation message

---

## Quick Start (Using Zapier - Recommended)

1. Create a Zap: Webhook trigger → Cloze action
2. Copy the Zapier webhook URL
3. Add to `.env.local`:
   ```bash
   ZAPIER_CLOZE_WEBHOOK=https://hooks.zapier.com/hooks/catch/YOUR_WEBHOOK_ID/
   ```
4. Restart server: `npm run dev`
5. Test a subscription!

---

## Troubleshooting

### "Newsletter service not configured" Error

This error occurs when no integration method is configured. You need to set up either:

**Option A: Zapier (Recommended)**
```bash
ZAPIER_CLOZE_WEBHOOK=https://hooks.zapier.com/hooks/catch/XXXXXX/XXXXXX/
```

**Option B: Email Import**
```bash
CLOZE_IMPORT_EMAIL=your_username+import@cloze.com
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=noreply@yourdomain.com
```

After adding the variables, restart your server with `npm run dev`.

### Subscriptions Not Appearing in Cloze

**If using Zapier:**
1. Check your Zapier dashboard to see if the webhook was received
2. Look for any errors in the Zap history
3. Ensure your Cloze account is properly connected in Zapier
4. Verify the field mappings in your Zap

**If using Email Import:**
1. Check your SendGrid dashboard for delivery status
2. Verify your Cloze import email is correct
3. Check your Cloze email settings to ensure import is enabled
4. Look at the server logs for SendGrid API errors

### Testing the Integration

When testing, check the following:
1. Browser console (F12) for client-side errors
2. Terminal/server logs for detailed API error messages
3. For Zapier: Use "Test Trigger" feature to ensure the webhook is working
4. For Email: Check SendGrid's activity feed for delivery status

## Security Notes

- API keys are stored in environment variables and never exposed to the client
- All API calls to Cloze are made server-side via the Next.js API route
- The API route includes error handling to prevent sensitive information leakage

## Additional Resources

- [Cloze API Documentation](https://api.cloze.com/api-docs/)
- [Cloze Help Center](https://help.cloze.com/)
- [Next.js API Routes Documentation](https://nextjs.org/docs/api-routes/introduction)

## Support

For issues related to:
- **Cloze API**: Contact [Cloze Support](https://help.cloze.com/)
- **Integration Issues**: Check the server logs and ensure environment variables are set correctly

