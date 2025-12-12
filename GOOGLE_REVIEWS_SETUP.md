# Google Reviews Integration Setup

This guide explains how to set up the Google Places API to pull real reviews into your website.

## Overview

The Google Places API allows you to fetch up to **5 of the most recent reviews** for your business. The integration:
- Caches reviews for 24 hours to minimize API calls
- Falls back to default reviews if the API is not configured or fails
- Displays star ratings, reviewer names, photos, and review dates

## Step 1: Get a Google Cloud API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select an existing one)
3. Enable the **Places API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Places API"
   - Click "Enable"
4. Create API credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the generated API key
5. (Recommended) Restrict your API key:
   - Click on the API key you just created
   - Under "API restrictions", select "Restrict key"
   - Select "Places API" from the list
   - Under "Application restrictions", you can add HTTP referrer restrictions for your domain

## Step 2: Find Your Place ID

Your Place ID is a unique identifier for your business on Google Maps.

### Method 1: Place ID Finder Tool
1. Go to: https://developers.google.com/maps/documentation/places/web-service/place-id
2. Search for your business name (e.g., "The Hume Group Tacoma")
3. Click on your business in the results
4. Copy the Place ID (looks like: `ChIJ...`)

### Method 2: Google Maps URL
1. Go to Google Maps
2. Search for your business
3. Click on your business listing
4. Look at the URL - the Place ID is in the `data` parameter

## Step 3: Add Environment Variables

Add the following to your `.env.local` file:

```env
# Google Places API for Reviews
GOOGLE_PLACES_API_KEY=your_api_key_here
GOOGLE_PLACE_ID=your_place_id_here
```

Example:
```env
GOOGLE_PLACES_API_KEY=AIzaSyB1234567890abcdefghijklmnop
GOOGLE_PLACE_ID=ChIJN1t_tDeuEmsRUsoyG83frY4
```

## Step 4: Test the Integration

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Visit your homepage and check the reviews section

3. You can also test the API endpoint directly:
   ```
   http://localhost:3000/api/reviews
   ```

## Limitations

- **Maximum 5 reviews**: Google Places API only returns the 5 most recent reviews
- **No filtering**: You cannot filter reviews by rating or date
- **Caching**: Reviews are cached for 24 hours to reduce API costs
- **Billing required**: Google Cloud requires billing to be enabled, but there's a generous free tier (~$200/month credit)

## Pricing

As of 2024:
- Place Details (Basic): ~$17 per 1,000 requests
- With 24-hour caching and typical traffic, costs should be minimal ($1-5/month)

See: https://developers.google.com/maps/billing-and-pricing/pricing

## Troubleshooting

### Reviews not appearing
1. Check that both `GOOGLE_PLACES_API_KEY` and `GOOGLE_PLACE_ID` are set
2. Verify the Place ID is correct
3. Check the server logs for error messages
4. Ensure the Places API is enabled in Google Cloud Console

### API key not working
1. Verify the API key in Google Cloud Console
2. Check if the key has the correct API restrictions
3. Ensure billing is enabled on your Google Cloud project

### Getting default reviews instead of real ones
This happens when:
- Environment variables are not set
- The API request fails
- The Place ID is invalid

Check your server logs for specific error messages.

## Alternative: More Reviews

If you need more than 5 reviews, consider these alternatives:

1. **Third-party services**: Elfsight, ReviewsOnMyWebsite, Birdeye
2. **Google Business Profile API**: Requires business owner authentication but gives more access
3. **Manual curation**: Periodically copy your best reviews to the default reviews array


