# IDX Integration Setup Guide

This guide will help you integrate real IDX (Internet Data Exchange) feeds into your real estate website.

## What is IDX?

IDX (Internet Data Exchange) is a system that allows real estate websites to display property listings from Multiple Listing Services (MLS). It enables real estate professionals to show current property data on their websites.

## 🚀 **BuyingBuddy Setup (Recommended - Now Default)**

BuyingBuddy is a comprehensive IDX and CRM platform specifically designed for real estate agents.

### **Quick Start with BuyingBuddy**

1. **Sign Up**: Visit [buyingbuddy.com](https://buyingbuddy.com) and choose a plan ($49/month for agents)
2. **Get MLS Approval**: Add your MLS credentials in the dashboard (1-3 business days approval)
3. **Get Credentials**: Navigate to Settings > API to get your:
   - API Key
   - Account ID
   - Widget ID
4. **Configure**: Add to `.env.local`:
   ```bash
   BUYINGBUDDY_API_KEY=your_api_key
   BUYINGBUDDY_ACCOUNT_ID=your_account_id
   BUYINGBUDDY_WIDGET_ID=your_widget_id
   NEXT_PUBLIC_BUYINGBUDDY_ACCOUNT_ID=your_account_id
   NEXT_PUBLIC_BUYINGBUDDY_WIDGET_ID=your_widget_id
   ```
5. **Restart**: Run `npm run dev` and you're live!

### **BuyingBuddy Features**

- ✅ Built-in CRM for lead management
- ✅ Multiple integration methods (API + Widgets)
- ✅ Real-time MLS data sync
- ✅ Mobile-responsive widgets
- ✅ Lead capture forms included
- ✅ Automated follow-ups

**For detailed BuyingBuddy setup, see [BUYINGBUDDY_SETUP.md](./BUYINGBUDDY_SETUP.md)**

---

## 📋 **SimplyRETS Setup (Alternative)**

SimplyRETS is a user-friendly IDX provider that makes it easy to get started with real estate data.

### **Step 1: Sign Up**
1. Go to [simplyrets.com](https://simplyrets.com)
2. Click "Get Started" or "Sign Up"
3. Fill out the registration form with your real estate business information
4. Choose your plan (they have a free tier for testing)

### **Step 2: Get API Credentials**
1. Log into your SimplyRETS dashboard
2. Navigate to "API Keys" or "Credentials" section
3. Generate a new API key (or use the default one provided)
4. Note down your API Key

### **Step 3: Configure Your MLS Access**
1. Add your MLS credentials in the SimplyRETS dashboard
2. Select your MLS from their supported list
3. Enter your MLS login credentials (username/password)
4. Wait for verification (usually takes a few minutes)

### **Step 4: Test the API**
SimplyRETS provides a test endpoint you can use to verify your setup:
- Test URL: `https://api.simplyrets.com/properties`
- Add your API key as a header: `Authorization: Basic YOUR_API_KEY`

### **Step 5: Configure Environment Variables**
Create a `.env.local` file in your project root:
```bash
# To use SimplyRETS instead of BuyingBuddy, comment out BuyingBuddy vars
# and uncomment these:
# SIMPLYRETS_API_KEY=your_simplyrets_api_key_here
# SIMPLYRETS_BASE_URL=https://api.simplyrets.com
```

**Note**: If both BuyingBuddy and SimplyRETS are configured, BuyingBuddy will be used by default.

## Other Popular IDX Providers

### 1. **RETS (Real Estate Transaction Standard)**
- **Description**: Standard protocol for real estate data exchange
- **Providers**: Many MLS systems use RETS
- **Setup**: Requires RETS login credentials and server URL

### 2. **MLS APIs**
- **Description**: Direct APIs from local MLS providers
- **Examples**: 
  - Northwest MLS (NWMLS)
  - MLSListings
  - CRMLS
  - Bright MLS

### 3. **Third-Party IDX Services**
- **Examples**:
  - **BuyingBuddy**: IDX + CRM platform with widgets and API (Now default in this app)
  - **RealScout**: Modern IDX API with advanced features
  - **IDX Broker**: Comprehensive IDX solutions
  - **Realtyna**: WordPress and custom IDX solutions
  - **WolfNet**: MLS data and website solutions

## Setup Instructions

### 1. Choose Your IDX Provider

First, determine which IDX provider you want to use:

- **Local MLS**: Contact your local MLS for API access
- **Third-party**: Research providers like RealScout, IDX Broker, etc.
- **Custom**: If you have direct MLS access

### 2. Get API Credentials

Once you've chosen a provider, you'll need:
- API Base URL
- API Key or Authentication credentials
- Any additional configuration parameters

### 3. Configure Environment Variables

Create a `.env.local` file in your project root and add your credentials:

```bash
# For RETS
RETS_BASE_URL=https://your-rets-provider.com/api
RETS_API_KEY=your_rets_api_key_here

# For MLS
MLS_BASE_URL=https://your-mls-provider.com/api
MLS_API_KEY=your_mls_api_key_here

# For IDX
IDX_BASE_URL=https://your-idx-provider.com/api
IDX_API_KEY=your_idx_api_key_here
```

### 4. Update the IDX Service

Edit `lib/idx-service.ts` and replace the mock data with real API calls:

```typescript
// Example RETS API call
async fetchListings(params: any) {
  const response = await fetch(`${this.config.baseUrl}/properties`, {
    headers: {
      'Authorization': `Bearer ${this.config.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params)
  });
  
  const data = await response.json();
  return this.transformListings(data);
}

// Example MLS API call
async fetchListings(params: any) {
  const response = await fetch(`${this.config.baseUrl}/listings`, {
    headers: {
      'X-API-Key': this.config.apiKey,
      'Content-Type': 'application/json',
    }
  });
  
  const data = await response.json();
  return this.transformListings(data);
}
```

### 5. Data Transformation

You'll need to transform the IDX data to match your `Listing` interface:

```typescript
private transformListings(rawData: any): Listing[] {
  return rawData.map((item: any) => ({
    id: item.ListingKey || item.id,
    address: item.PropertyAddress || item.address,
    city: item.PropertyCity || item.city,
    state: item.PropertyState || item.state,
    zipCode: item.PropertyZipCode || item.zipCode,
    price: parseFloat(item.ListPrice || item.price),
    bedrooms: parseInt(item.BedroomsTotal || item.bedrooms),
    bathrooms: parseFloat(item.BathroomsTotalInteger || item.bathrooms),
    squareFeet: parseInt(item.LivingArea || item.squareFeet),
    lotSize: parseFloat(item.LotSizeAcres || item.lotSize),
    propertyType: item.PropertyType || item.propertyType,
    status: item.Status || item.status,
    images: item.Media || item.images || [],
    description: item.PublicRemarks || item.description,
    yearBuilt: parseInt(item.YearBuilt || item.yearBuilt),
    mlsNumber: item.ListingId || item.mlsNumber,
    latitude: parseFloat(item.Latitude || item.latitude),
    longitude: parseFloat(item.Longitude || item.longitude),
    features: item.Features || item.features || [],
    createdAt: item.ListDate || item.createdAt,
    updatedAt: item.ModifiedDate || item.updatedAt,
  }));
}
```

## Provider-Specific Examples

### RealScout API
```typescript
async fetchListings(params: any) {
  const response = await fetch(`https://api.realscout.com/v3/properties`, {
    headers: {
      'Authorization': `Bearer ${this.config.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      location: params.city,
      price_min: params.minPrice,
      price_max: params.maxPrice,
      beds_min: params.bedrooms,
      limit: params.limit,
      offset: params.offset
    })
  });
  
  const data = await response.json();
  return this.transformRealScoutData(data);
}
```

### IDX Broker API
```typescript
async fetchListings(params: any) {
  const response = await fetch(`https://api.idxbroker.com/clients/featured`, {
    headers: {
      'Authorization': `Bearer ${this.config.apiKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  });
  
  const data = await response.json();
  return this.transformIDXBrokerData(data);
}
```

## Testing Your Integration

1. **Start with mock data**: The current setup uses mock data for development
2. **Test API calls**: Use tools like Postman to test your IDX API endpoints
3. **Gradual migration**: Replace mock data with real API calls one endpoint at a time
4. **Error handling**: Add proper error handling for API failures

## Common Issues and Solutions

### Rate Limiting
Most IDX APIs have rate limits. Implement caching:
```typescript
// Add caching to reduce API calls
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async fetchListings(params: any) {
  const cacheKey = JSON.stringify(params);
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  
  // Make API call and cache result
  const data = await this.makeAPICall(params);
  cache.set(cacheKey, { data, timestamp: Date.now() });
  return data;
}
```

### Data Format Issues
Different providers use different field names. Create provider-specific transformers:
```typescript
private transformByProvider(provider: string, data: any) {
  switch (provider) {
    case 'rets':
      return this.transformRETSData(data);
    case 'mls':
      return this.transformMLSData(data);
    case 'idx':
      return this.transformIDXData(data);
    default:
      return this.transformGenericData(data);
  }
}
```

## Next Steps

1. **Choose your IDX provider** and get API credentials
2. **Update the environment variables** with your credentials
3. **Modify the IDX service** to use real API calls
4. **Test thoroughly** with real data
5. **Add caching** for better performance
6. **Implement error handling** for production use

## Support

If you need help with a specific IDX provider, check their documentation or contact their support team. Most providers offer integration guides and SDKs for popular platforms. 