import { Listing } from '@/app/api/listings/route';

// BuyingBuddy data structure interface
interface BuyingBuddyData {
  listing_id?: number | string;
  mls_number?: number | string;
  address?: string;
  street_number?: string;
  street_name?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  list_price?: number;
  bedrooms?: number;
  bathrooms?: number;
  square_feet?: number;
  lot_size?: number;
  property_type?: string;
  status?: string;
  photos?: string[];
  images?: string[];
  description?: string;
  remarks?: string;
  year_built?: number;
  latitude?: number;
  longitude?: number;
  features?: string[];
  created_at?: string;
  updated_at?: string;
}

// SimplyRETS data structure interface
interface SimplyRETSData {
  mlsId?: number | string;
  listingId?: number | string;
  address?: {
    full?: string;
    streetNumber?: string;
    streetName?: string;
    city?: string;
    state?: string;
    postalCode?: string;
  };
  listPrice?: number;
  property?: {
    bedrooms?: number;
    bathrooms?: number;
    area?: number;
    lotSize?: number;
    type?: string;
    yearBuilt?: number;
    features?: string[];
  };
  listingStatus?: string;
  photos?: string[];
  remarks?: string;
  geo?: {
    lat?: number;
    lng?: number;
  };
  listDate?: string;
  modificationTimestamp?: string;
}

// Configuration for different IDX providers
interface IDXConfig {
  apiKey: string;
  baseUrl: string;
  provider: 'rets' | 'mls' | 'idx' | 'custom' | 'simplyrets' | 'buyingbuddy';
  accountId?: string;
  widgetId?: string;
}

// Popular IDX providers and their configurations
export const IDX_PROVIDERS = {
  BUYINGBUDDY: {
    name: 'BuyingBuddy',
    baseUrl: process.env.BUYINGBUDDY_BASE_URL || 'https://api.buyingbuddy.com',
    apiKey: process.env.BUYINGBUDDY_API_KEY || '',
    accountId: process.env.BUYINGBUDDY_ACCOUNT_ID || '',
    widgetId: process.env.BUYINGBUDDY_WIDGET_ID || '',
  },
  SIMPLYRETS: {
    name: 'SimplyRETS',
    baseUrl: process.env.SIMPLYRETS_BASE_URL || 'https://api.simplyrets.com',
    apiKey: process.env.SIMPLYRETS_API_KEY || '',
  },
  RETS: {
    name: 'RETS (Real Estate Transaction Standard)',
    baseUrl: process.env.RETS_BASE_URL || '',
    apiKey: process.env.RETS_API_KEY || '',
  },
  MLS: {
    name: 'MLS (Multiple Listing Service)',
    baseUrl: process.env.MLS_BASE_URL || '',
    apiKey: process.env.MLS_API_KEY || '',
  },
  IDX: {
    name: 'IDX (Internet Data Exchange)',
    baseUrl: process.env.IDX_BASE_URL || '',
    apiKey: process.env.IDX_API_KEY || '',
  },
  // Add more providers as needed
} as const;

export class IDXService {
  private config: IDXConfig;

  constructor(config: IDXConfig) {
    this.config = config;
  }

  // Fetch listings from IDX provider
  async fetchListings(params: {
    limit?: number;
    offset?: number;
    status?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    propertyType?: string;
    city?: string;
    state?: string;
  }): Promise<{
    listings: Listing[];
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  }> {
    try {
      // BuyingBuddy API call
      if (this.config.provider === 'buyingbuddy') {
        return this.fetchBuyingBuddyListings(params);
      }
      
      // SimplyRETS API call
      if (this.config.provider === 'simplyrets') {
        return this.fetchSimplyRETSListings(params);
      }
      
      // This is where you would make actual API calls to your IDX provider
      // For now, we'll return mock data
      
      // Example RETS API call:
      // const response = await fetch(`${this.config.baseUrl}/properties`, {
      //   headers: {
      //     'Authorization': `Bearer ${this.config.apiKey}`,
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(params)
      // });
      
      // Example MLS API call:
      // const response = await fetch(`${this.config.baseUrl}/listings`, {
      //   headers: {
      //     'X-API-Key': this.config.apiKey,
      //     'Content-Type': 'application/json',
      //   }
      // });

      // For development, return mock data
      return this.getMockListings(params);
    } catch (error) {
      console.error('Error fetching from IDX:', error);
      throw new Error('Failed to fetch listings from IDX provider');
    }
  }

  // Get a single listing by ID
  async fetchListingById(id: string): Promise<Listing | null> {
    try {
      // Use BuyingBuddy API if configured
      if (this.config.provider === 'buyingbuddy' && this.config.apiKey) {
        const response = await fetch(`${this.config.baseUrl}/listings/${id}`, {
          headers: {
            'Authorization': `Bearer ${this.config.apiKey}`,
            'Content-Type': 'application/json',
            'X-Account-ID': this.config.accountId || '',
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          return this.transformBuyingBuddyData(data);
        } else if (response.status === 404) {
          return null;
        } else {
          throw new Error(`BuyingBuddy API error: ${response.status}`);
        }
      }
      
      // Use SimplyRETS API if configured
      if (this.config.provider === 'simplyrets' && this.config.apiKey) {
        // Create base64 auth string (works in both Node.js and browser)
        // For SimplyRETS demo, use simplyrets:simplyrets as username:password
        const credentials = this.config.apiKey === 'simplyrets' ? 'simplyrets:simplyrets' : this.config.apiKey + ':';
        const auth = typeof Buffer !== 'undefined' 
          ? Buffer.from(credentials).toString('base64')
          : btoa(credentials);
          
        const response = await fetch(`${this.config.baseUrl}/properties/${id}`, {
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/json',
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          return this.transformSimplyRETSData(data);
        } else if (response.status === 404) {
          return null;
        } else {
          throw new Error(`SimplyRETS API error: ${response.status}`);
        }
      }
      
      // Fall back to mock data for development
      const mockListings = this.getMockListings({});
      return mockListings.listings.find(listing => listing.id === id) || null;
    } catch (error) {
      console.error('Error fetching listing by ID:', error);
      console.error('Config:', { provider: this.config.provider, hasApiKey: !!this.config.apiKey, baseUrl: this.config.baseUrl });
      throw new Error('Failed to fetch listing');
    }
  }

  // Search listings with advanced filters
  async searchListings(): Promise<{
    listings: Listing[];
    total: number;
    facets?: Record<string, unknown>;
  }> {
    try {
      // Example search API call with filters:
      // const response = await fetch(`${this.config.baseUrl}/search`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${this.config.apiKey}`,
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(filters)
      // });

      // For development, return mock data
      return this.getMockListings({});
    } catch (error) {
      console.error('Error searching listings:', error);
      throw new Error('Failed to search listings');
    }
  }



  // Fetch listings from SimplyRETS API
  private async fetchSimplyRETSListings(params: {
    limit?: number;
    offset?: number;
    status?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    propertyType?: string;
    city?: string;
    state?: string;
  }): Promise<{
    listings: Listing[];
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  }> {
    const queryParams = new URLSearchParams();
    
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.offset) queryParams.append('offset', params.offset.toString());
    if (params.status) queryParams.append('status', params.status);
    if (params.minPrice) queryParams.append('minprice', params.minPrice.toString());
    if (params.maxPrice) queryParams.append('maxprice', params.maxPrice.toString());
    if (params.bedrooms) queryParams.append('minbeds', params.bedrooms.toString());
    if (params.city) queryParams.append('city', params.city);
    if (params.state) queryParams.append('state', params.state);
    
    // Create base64 auth string (works in both Node.js and browser)
    // For SimplyRETS demo, use simplyrets:simplyrets as username:password
    const credentials = this.config.apiKey === 'simplyrets' ? 'simplyrets:simplyrets' : this.config.apiKey + ':';
    const auth = typeof Buffer !== 'undefined' 
      ? Buffer.from(credentials).toString('base64')
      : btoa(credentials);
      
    const response = await fetch(`${this.config.baseUrl}/properties?${queryParams.toString()}`, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`SimplyRETS API error: ${response.status}`);
    }
    
    const data = await response.json();
    const listings = Array.isArray(data) ? data.map(item => this.transformSimplyRETSData(item)) : [];
    
    return {
      listings,
      total: listings.length, // SimplyRETS doesn't provide total count in basic response
      limit: params.limit || 10,
      offset: params.offset || 0,
      hasMore: listings.length === (params.limit || 10) // Assume more if we got a full page
    };
  }

  // Transform SimplyRETS data to our Listing format
  private transformSimplyRETSData(data: SimplyRETSData): Listing {
    return {
      id: data.mlsId?.toString() || data.listingId?.toString() || '',
      address: data.address?.full || `${data.address?.streetNumber || ''} ${data.address?.streetName || ''}`.trim(),
      city: data.address?.city || '',
      state: data.address?.state || '',
      zipCode: data.address?.postalCode || '',
      price: data.listPrice || 0,
      bedrooms: data.property?.bedrooms || 0,
      bathrooms: data.property?.bathrooms || 0,
      squareFeet: data.property?.area || 0,
      lotSize: data.property?.lotSize || 0,
      propertyType: data.property?.type || 'Unknown',
      status: (data.listingStatus === 'pending' || data.listingStatus === 'sold' ? data.listingStatus : 'active') as 'active' | 'pending' | 'sold',
      images: data.photos || [],
      description: data.remarks || '',
      yearBuilt: data.property?.yearBuilt || 0,
      mlsNumber: data.mlsId?.toString() || '',
      latitude: data.geo?.lat || 0,
      longitude: data.geo?.lng || 0,
      features: data.property?.features || [],
      createdAt: data.listDate || new Date().toISOString(),
      updatedAt: data.modificationTimestamp || new Date().toISOString()
    };
  }

  // Fetch listings from BuyingBuddy API
  private async fetchBuyingBuddyListings(params: {
    limit?: number;
    offset?: number;
    status?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    propertyType?: string;
    city?: string;
    state?: string;
  }): Promise<{
    listings: Listing[];
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  }> {
    const queryParams = new URLSearchParams();
    
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.offset) queryParams.append('offset', params.offset.toString());
    if (params.status) queryParams.append('status', params.status);
    if (params.minPrice) queryParams.append('min_price', params.minPrice.toString());
    if (params.maxPrice) queryParams.append('max_price', params.maxPrice.toString());
    if (params.bedrooms) queryParams.append('bedrooms', params.bedrooms.toString());
    if (params.propertyType) queryParams.append('property_type', params.propertyType);
    if (params.city) queryParams.append('city', params.city);
    if (params.state) queryParams.append('state', params.state);
      
    const response = await fetch(`${this.config.baseUrl}/listings?${queryParams.toString()}`, {
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
        'X-Account-ID': this.config.accountId || '',
      }
    });
    
    if (!response.ok) {
      throw new Error(`BuyingBuddy API error: ${response.status}`);
    }
    
    const data = await response.json();
    const listings = Array.isArray(data.listings) 
      ? data.listings.map((item: BuyingBuddyData) => this.transformBuyingBuddyData(item)) 
      : [];
    
    return {
      listings,
      total: data.total || listings.length,
      limit: params.limit || 10,
      offset: params.offset || 0,
      hasMore: data.has_more || (listings.length === (params.limit || 10))
    };
  }

  // Transform BuyingBuddy data to our Listing format
  private transformBuyingBuddyData(data: BuyingBuddyData): Listing {
    return {
      id: data.listing_id?.toString() || data.mls_number?.toString() || '',
      address: data.address || `${data.street_number || ''} ${data.street_name || ''}`.trim(),
      city: data.city || '',
      state: data.state || '',
      zipCode: data.zip_code || '',
      price: data.list_price || 0,
      bedrooms: data.bedrooms || 0,
      bathrooms: data.bathrooms || 0,
      squareFeet: data.square_feet || 0,
      lotSize: data.lot_size || 0,
      propertyType: data.property_type || 'Unknown',
      status: (data.status === 'Pending' || data.status === 'Sold' ? data.status.toLowerCase() : 'active') as 'active' | 'pending' | 'sold',
      images: data.photos || data.images || [],
      description: data.description || data.remarks || '',
      yearBuilt: data.year_built || 0,
      mlsNumber: data.mls_number?.toString() || '',
      latitude: data.latitude || 0,
      longitude: data.longitude || 0,
      features: data.features || [],
      createdAt: data.created_at || new Date().toISOString(),
      updatedAt: data.updated_at || new Date().toISOString()
    };
  }

  // Mock data for development
  private getMockListings(params: { limit?: number; offset?: number }): {
    listings: Listing[];
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  } {
    const mockListings: Listing[] = [
      {
        id: '1',
        address: '1234 Tacoma Ave',
        city: 'Tacoma',
        state: 'WA',
        zipCode: '98402',
        price: 425000,
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 1850,
        lotSize: 0.25,
        propertyType: 'Single Family',
        status: 'active',
        images: [
          'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'
        ],
        description: 'Beautiful home in the heart of Tacoma with stunning views and modern amenities.',
        yearBuilt: 1995,
        mlsNumber: 'MLS123456',
        latitude: 47.2529,
        longitude: -122.4443,
        features: ['Hardwood Floors', 'Updated Kitchen', 'Fenced Yard', 'Garage'],
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z'
      },
      {
        id: '2',
        address: '5678 Ruston Way',
        city: 'Tacoma',
        state: 'WA',
        zipCode: '98402',
        price: 550000,
        bedrooms: 4,
        bathrooms: 3,
        squareFeet: 2200,
        lotSize: 0.3,
        propertyType: 'Single Family',
        status: 'active',
        images: [
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
        ],
        description: 'Spacious family home with water views and plenty of room to grow.',
        yearBuilt: 2000,
        mlsNumber: 'MLS123457',
        latitude: 47.2530,
        longitude: -122.4444,
        features: ['Water View', 'Master Suite', 'Deck', 'Fireplace'],
        createdAt: '2024-01-14T10:00:00Z',
        updatedAt: '2024-01-14T10:00:00Z'
      },
      {
        id: '3',
        address: '9012 Proctor St',
        city: 'Tacoma',
        state: 'WA',
        zipCode: '98407',
        price: 375000,
        bedrooms: 2,
        bathrooms: 2,
        squareFeet: 1400,
        lotSize: 0.2,
        propertyType: 'Townhouse',
        status: 'active',
        images: [
          'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&h=600&fit=crop'
        ],
        description: 'Charming townhouse in a quiet neighborhood with low maintenance living.',
        yearBuilt: 2010,
        mlsNumber: 'MLS123458',
        latitude: 47.2531,
        longitude: -122.4445,
        features: ['HOA', 'Patio', 'Storage', 'Modern Appliances'],
        createdAt: '2024-01-13T10:00:00Z',
        updatedAt: '2024-01-13T10:00:00Z'
      },
      {
        id: '4',
        address: '3456 6th Ave',
        city: 'Tacoma',
        state: 'WA',
        zipCode: '98405',
        price: 650000,
        bedrooms: 5,
        bathrooms: 4,
        squareFeet: 2800,
        lotSize: 0.4,
        propertyType: 'Single Family',
        status: 'active',
        images: [
          'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop'
        ],
        description: 'Luxury home with premium finishes and stunning architecture.',
        yearBuilt: 2015,
        mlsNumber: 'MLS123459',
        latitude: 47.2532,
        longitude: -122.4446,
        features: ['Gourmet Kitchen', 'Wine Cellar', 'Home Theater', 'Pool'],
        createdAt: '2024-01-12T10:00:00Z',
        updatedAt: '2024-01-12T10:00:00Z'
      },
      {
        id: '5',
        address: '7890 Stadium Way',
        city: 'Tacoma',
        state: 'WA',
        zipCode: '98403',
        price: 295000,
        bedrooms: 2,
        bathrooms: 1,
        squareFeet: 1200,
        lotSize: 0.15,
        propertyType: 'Condo',
        status: 'active',
        images: [
          'https://placekitten.com/800/612',
          'https://placekitten.com/800/613',
          'https://placekitten.com/800/614'
        ],
        description: 'Cozy condo perfect for first-time buyers or downsizers.',
        yearBuilt: 2005,
        mlsNumber: 'MLS123460',
        latitude: 47.2533,
        longitude: -122.4447,
        features: ['Balcony', 'Storage', 'Gym Access', 'Secure Entry'],
        createdAt: '2024-01-11T10:00:00Z',
        updatedAt: '2024-01-11T10:00:00Z'
      },
      {
        id: '6',
        address: '1111 N Pearl St',
        city: 'Tacoma',
        state: 'WA',
        zipCode: '98406',
        price: 480000,
        bedrooms: 3,
        bathrooms: 2.5,
        squareFeet: 1950,
        lotSize: 0.28,
        propertyType: 'Single Family',
        status: 'active',
        images: [
          'https://placekitten.com/800/615',
          'https://placekitten.com/800/616',
          'https://placekitten.com/800/617'
        ],
        description: 'Updated home with modern amenities and great location.',
        yearBuilt: 1985,
        mlsNumber: 'MLS123461',
        latitude: 47.2534,
        longitude: -122.4448,
        features: ['Updated Kitchen', 'New Roof', 'Fresh Paint', 'Large Yard'],
        createdAt: '2024-01-10T10:00:00Z',
        updatedAt: '2024-01-10T10:00:00Z'
      }
    ];

    const limit = params.limit || 10;
    const offset = params.offset || 0;
    const filteredListings = mockListings.slice(offset, offset + limit);

    return {
      listings: filteredListings,
      total: mockListings.length,
      limit,
      offset,
      hasMore: offset + limit < mockListings.length
    };
  }
}

// Create a singleton instance - prioritize BuyingBuddy if configured
export const idxService = new IDXService(
  process.env.BUYINGBUDDY_API_KEY ? {
    apiKey: process.env.BUYINGBUDDY_API_KEY,
    baseUrl: process.env.BUYINGBUDDY_BASE_URL || 'https://api.buyingbuddy.com',
    provider: 'buyingbuddy',
    accountId: process.env.BUYINGBUDDY_ACCOUNT_ID,
    widgetId: process.env.BUYINGBUDDY_WIDGET_ID,
  } : {
    apiKey: process.env.SIMPLYRETS_API_KEY || '',
    baseUrl: process.env.SIMPLYRETS_BASE_URL || 'https://api.simplyrets.com',
    provider: 'simplyrets'
  }
); 