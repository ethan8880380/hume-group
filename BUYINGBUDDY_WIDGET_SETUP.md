# BuyingBuddy Widget Integration - Quick Setup

Your site is now configured to use **BuyingBuddy widgets only** - no mock data or API fallbacks.

## ✅ What's Been Updated

### 1. **Featured Homes Section** (`components/sections/home/featured-homes.tsx`)
- Now uses `BuyingBuddyWidget` with type `"featured"`
- Displays Tacoma, WA listings by default
- No mock data fallback

### 2. **Listings Page** (`app/listings/page.tsx`)
- Uses `BuyingBuddyWidget` with type `"listings"`
- Full-page widget with search filters
- No mock data fallback

### 3. **Widget Component** (`components/ui/buyingbuddy-widget.tsx`)
- Two integration methods available:
  - **Script-based** (BuyingBuddyWidget) - Recommended
  - **Iframe-based** (BuyingBuddyIframe) - Fallback option

## 🔧 Required Configuration

Add these environment variables to your `.env.local` file:

```bash
# Required for widgets
NEXT_PUBLIC_BUYINGBUDDY_ACCOUNT_ID=your_account_id_here
NEXT_PUBLIC_BUYINGBUDDY_WIDGET_ID=your_widget_id_here

# Optional: API key (if you want to use API features later)
BUYINGBUDDY_API_KEY=9u2duo3ekzq-a55hdy22c91
```

## 📍 Where to Get Your Credentials

1. **Log into BuyingBuddy**: [buyingbuddy.com](https://buyingbuddy.com)
2. **Navigate to Settings** → **API** or **Widgets**
3. **Copy your credentials**:
   - Account ID
   - Widget ID
   - API Key (you already have this: `9u2duo3ekzq-a55hdy22c91`)

## 🚀 How It Works

### Homepage (`/`)
The **Featured Homes** section loads a BuyingBuddy widget that shows:
- Featured/recent listings
- Filtered to Tacoma, WA
- 600px height widget

### Listings Page (`/listings`)
Full listings page with:
- Search filters (city, price, bedrooms, property type)
- 1200px height widget for browsing
- Filters are passed to the widget dynamically

## 🎨 Customization Options

### Change Widget Type
```tsx
<BuyingBuddyWidget
  widgetType="search"    // Options: "search", "listings", "featured", "map", "single-listing"
  height="600px"
  filters={{ city: 'Tacoma', state: 'WA' }}
/>
```

### Adjust Filters
```tsx
<BuyingBuddyWidget
  widgetType="listings"
  filters={{
    city: 'Seattle',
    state: 'WA',
    minPrice: 300000,
    maxPrice: 800000,
    bedrooms: 3,
    propertyType: 'Single Family'
  }}
/>
```

### Custom Styling
```tsx
<BuyingBuddyWidget
  widgetType="listings"
  height="800px"
  className="rounded-xl shadow-lg border border-gray-200"
/>
```

## 🔄 Widget vs Iframe

### Script-Based Widget (Default)
```tsx
import { BuyingBuddyWidget } from '@/components/ui/buyingbuddy-widget';

<BuyingBuddyWidget widgetType="listings" />
```
✅ More customizable
✅ Better integration
✅ Matches your site theme

### Iframe-Based (Alternative)
```tsx
import { BuyingBuddyIframe } from '@/components/ui/buyingbuddy-widget';

<BuyingBuddyIframe widgetType="listings" />
```
✅ Simpler
✅ More isolated
✅ Faster to load

## 🧪 Testing

1. **Add credentials** to `.env.local`
2. **Restart dev server**: Stop the current server (Ctrl+C) and run `npm run dev`
3. **Visit pages**:
   - Homepage: http://localhost:3001
   - Listings: http://localhost:3001/listings

## ⚠️ Troubleshooting

### Widget not showing?
**Check:**
1. Environment variables are set correctly
2. Variable names start with `NEXT_PUBLIC_` for client-side use
3. Dev server was restarted after adding variables

### "Configuration missing" message?
**Fix:**
- Make sure `NEXT_PUBLIC_BUYINGBUDDY_WIDGET_ID` is set
- Make sure `NEXT_PUBLIC_BUYINGBUDDY_ACCOUNT_ID` is set
- Restart your dev server

### Widget shows but no listings?
**Check:**
1. MLS approval status in your BuyingBuddy dashboard
2. Widget ID is correct
3. Your account has active MLS feeds

## 📝 Next Steps

1. ✅ Add environment variables
2. ✅ Restart dev server
3. ✅ Test homepage and listings page
4. ✅ Customize widget appearance if needed
5. ✅ Add widgets to other pages (buying, selling, etc.)

## 🎯 Adding Widgets to Other Pages

You can add BuyingBuddy widgets to any page:

```tsx
// In any component
import { BuyingBuddyWidget } from '@/components/ui/buyingbuddy-widget';

export default function MyPage() {
  return (
    <div>
      <h1>My Page</h1>
      <BuyingBuddyWidget
        widgetType="search"
        height="400px"
        filters={{ city: 'Tacoma', state: 'WA' }}
      />
    </div>
  );
}
```

## 📞 Support

- **BuyingBuddy Support**: Check your dashboard for support contact
- **Documentation**: [BUYINGBUDDY_SETUP.md](./BUYINGBUDDY_SETUP.md) for detailed info
- **API Key**: You have `9u2duo3ekzq-a55hdy22c91`

---

**Current Status**: 🟡 Widgets configured, waiting for Account ID and Widget ID to be fully functional.


