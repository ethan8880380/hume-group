# BuyingBuddy IDX Integration Setup Guide

This guide will help you integrate BuyingBuddy IDX feeds into your real estate website.

## What is BuyingBuddy?

BuyingBuddy is an IDX and CRM platform that provides real estate agents with MLS data integration, lead management, and property search functionality. It offers both widget-based and API-based integrations.

## 🚀 Quick Start

### Step 1: Sign Up for BuyingBuddy

1. Go to [buyingbuddy.com](https://buyingbuddy.com)
2. Click "Get Started" or "Sign Up"
3. Choose a plan:
   - **Agent Plan**: $49/month - Includes advanced IDX plugin and CRM
   - **Team Plan**: For multiple agents
   - **Office Plan**: For brokerages

### Step 2: Get MLS Approval

1. Log into your BuyingBuddy dashboard
2. Navigate to "MLS Setup" or "IDX Setup"
3. Select your MLS from the supported list
4. Submit your MLS credentials for approval
5. Wait for BuyingBuddy to verify with your MLS (usually 1-3 business days)

### Step 3: Get Your API Credentials

Once your MLS is approved:

1. Log into your BuyingBuddy dashboard
2. Navigate to "Settings" > "API" or "Developer"
3. Generate or copy your credentials:
   - **API Key**: Your authentication key
   - **Account ID**: Your unique account identifier
   - **Widget ID**: Your widget identifier (if using widgets)

### Step 4: Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# BuyingBuddy Configuration
BUYINGBUDDY_API_KEY=your_api_key_here
BUYINGBUDDY_ACCOUNT_ID=your_account_id_here
BUYINGBUDDY_WIDGET_ID=your_widget_id_here
BUYINGBUDDY_BASE_URL=https://api.buyingbuddy.com

# For client-side widget integration
NEXT_PUBLIC_BUYINGBUDDY_ACCOUNT_ID=your_account_id_here
NEXT_PUBLIC_BUYINGBUDDY_WIDGET_ID=your_widget_id_here
```

### Step 5: Restart Your Development Server

```bash
npm run dev
```

Your site should now be pulling listings from BuyingBuddy!

## Integration Methods

### Method 1: API Integration (Recommended)

The API integration provides the most control and flexibility. It's already configured in `lib/idx-service.ts`.

**Usage in your code:**

```typescript
import { idxService } from '@/lib/idx-service';

// Fetch listings
const result = await idxService.fetchListings({
  limit: 10,
  offset: 0,
  status: 'active',
  minPrice: 200000,
  maxPrice: 500000,
  bedrooms: 3,
  city: 'Tacoma',
  state: 'WA'
});

// Fetch a single listing
const listing = await idxService.fetchListingById('123456');
```

**API Endpoints:**

- `GET /api/listings` - Get all listings with filters
- `GET /api/listings/[id]` - Get a single listing by ID

### Method 2: Widget Integration

BuyingBuddy also provides embeddable widgets that can be added to your pages.

**Usage:**

```tsx
import { BuyingBuddyWidget, BuyingBuddyIframe } from '@/components/ui/buyingbuddy-widget';

// Script-based widget (recommended)
<BuyingBuddyWidget
  widgetType="listings"
  height="800px"
  filters={{
    city: 'Tacoma',
    state: 'WA',
    minPrice: 200000,
    maxPrice: 500000,
  }}
/>

// Iframe-based widget (simpler, less customization)
<BuyingBuddyIframe
  widgetType="search"
  height="600px"
/>
```

**Widget Types:**

- `search` - Property search form
- `listings` - Grid of property listings
- `featured` - Featured properties
- `map` - Map view of properties
- `single-listing` - Single property details

### Method 3: Hybrid Approach

Use the API for your main listings pages and widgets for specific features:

```tsx
// Main listings page - use API
import { useListings } from '@/hooks/use-listings';

function ListingsPage() {
  const { listings, loading } = useListings({ limit: 12 });
  // Your custom listing cards
}

// Add a search widget in your hero section
import { BuyingBuddyWidget } from '@/components/ui/buyingbuddy-widget';

function Hero() {
  return (
    <div>
      <h1>Find Your Dream Home</h1>
      <BuyingBuddyWidget widgetType="search" height="200px" />
    </div>
  );
}
```

## API Documentation

### Supported Query Parameters

When using the API, you can filter listings with these parameters:

- `limit` - Number of results per page (default: 10)
- `offset` - Pagination offset (default: 0)
- `status` - Listing status: `active`, `pending`, `sold`
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `bedrooms` - Minimum number of bedrooms
- `bathrooms` - Minimum number of bathrooms
- `propertyType` - Type: `Single Family`, `Condo`, `Townhouse`, etc.
- `city` - City name
- `state` - State abbreviation (e.g., `WA`)

### Response Format

```typescript
{
  listings: Listing[],
  total: number,
  limit: number,
  offset: number,
  hasMore: boolean
}
```

### Listing Object

```typescript
interface Listing {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  lotSize: number;
  propertyType: string;
  status: 'active' | 'pending' | 'sold';
  images: string[];
  description: string;
  yearBuilt: number;
  mlsNumber: string;
  latitude?: number;
  longitude?: number;
  features: string[];
  createdAt: string;
  updatedAt: string;
}
```

## Customization

### Custom Styling for Widgets

You can customize widget appearance with CSS:

```css
/* In your global CSS file */
.buyingbuddy-widget {
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.buyingbuddy-widget .property-card {
  /* Your custom styles */
}
```

### Custom Data Transformation

If BuyingBuddy's data format differs from what you need, update the transformer in `lib/idx-service.ts`:

```typescript
private transformBuyingBuddyData(data: BuyingBuddyData): Listing {
  // Add custom transformation logic here
}
```

## Troubleshooting

### Issue: "BuyingBuddy API error: 401"

**Solution**: Your API key is invalid or expired. Check:
1. API key is correctly copied from BuyingBuddy dashboard
2. No extra spaces in your `.env.local` file
3. You've restarted your development server after adding the key

### Issue: "BuyingBuddy API error: 403"

**Solution**: MLS approval is still pending or your account doesn't have access to the requested MLS.
1. Check your MLS approval status in BuyingBuddy dashboard
2. Verify your plan includes the MLS you're trying to access

### Issue: No listings returned

**Solution**: 
1. Check that your MLS has active listings
2. Try broader filter parameters
3. Check BuyingBuddy dashboard to see if data is syncing correctly

### Issue: Widgets not loading

**Solution**:
1. Verify `NEXT_PUBLIC_*` environment variables are set
2. Check browser console for JavaScript errors
3. Ensure widget script is loading (check Network tab)
4. Try the iframe version as a fallback

## Advanced Features

### Lead Capture

BuyingBuddy includes built-in lead capture. Configure it in your dashboard:

1. Go to "Settings" > "Lead Capture"
2. Customize your registration form
3. Set up email notifications
4. Configure CRM integration

### Automatic Updates

BuyingBuddy automatically syncs with your MLS:
- New listings are added within minutes
- Price changes and status updates are reflected in real-time
- Sold listings are marked automatically

### Mobile Responsiveness

All BuyingBuddy widgets are mobile-responsive by default. Test on:
- Mobile phones (portrait/landscape)
- Tablets
- Desktop screens

### SEO Optimization

For better SEO, use the API integration with server-side rendering:

```tsx
// app/listings/page.tsx
export async function generateMetadata() {
  const listings = await idxService.fetchListings({ limit: 1 });
  return {
    title: 'Property Listings',
    description: `Browse ${listings.total} properties in your area`
  };
}
```

## Compliance

### MLS Rules

Ensure compliance with your MLS rules:

1. **IDX Logo**: Display the IDX logo on all listing pages
2. **Disclaimer**: Include the required MLS disclaimer
3. **Attribution**: Credit the listing agent/broker
4. **Data Accuracy**: Display "Information deemed reliable but not guaranteed"

BuyingBuddy typically includes these automatically in their widgets.

### DMCA Compliance

BuyingBuddy handles DMCA compliance for photo copyright. If you're displaying photos:
1. Use only photos provided through the BuyingBuddy feed
2. Don't cache photos locally
3. Remove listings when they're marked as removed in the feed

## Support

### BuyingBuddy Support

- **Email**: support@buyingbuddy.com
- **Phone**: Check your BuyingBuddy dashboard for support number
- **Live Chat**: Available in your BuyingBuddy dashboard
- **Documentation**: [BuyingBuddy Help Center](https://help.buyingbuddy.com)

### Developer Support

For technical integration questions:
1. Check BuyingBuddy's developer documentation
2. Contact their API support team
3. Check this repository's issues for common problems

## Migration from Other IDX Providers

### From SimplyRETS

This codebase supports both BuyingBuddy and SimplyRETS. To switch:

1. Add BuyingBuddy credentials to `.env.local`
2. The system will automatically use BuyingBuddy if `BUYINGBUDDY_API_KEY` is present
3. SimplyRETS will be used as a fallback if BuyingBuddy is not configured

### From IDX Broker, RealScout, or Others

1. Export your current settings/preferences
2. Set up BuyingBuddy with equivalent filters
3. Test thoroughly before switching over
4. Consider running both for a transition period

## Best Practices

1. **Caching**: Implement caching to reduce API calls and improve performance
2. **Error Handling**: Always have fallback content if the API is unavailable
3. **Loading States**: Show skeleton loaders while fetching data
4. **Image Optimization**: Use Next.js Image component for listing photos
5. **Analytics**: Track which listings get the most views
6. **A/B Testing**: Test different layouts and filters to optimize conversions

## Next Steps

1. ✅ Configure BuyingBuddy credentials
2. ✅ Test the API integration
3. ✅ Customize the listing display
4. ✅ Add lead capture forms
5. ✅ Optimize for mobile
6. ✅ Set up analytics
7. ✅ Launch and monitor performance

## Additional Resources

- [BuyingBuddy Website](https://buyingbuddy.com)
- [BuyingBuddy API Documentation](https://docs.buyingbuddy.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [MLS Guidelines](https://www.nar.realtor/idx)


