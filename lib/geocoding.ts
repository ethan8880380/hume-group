// Geocoding utility to convert addresses to accurate coordinates
export interface GeocodeResult {
  latitude: number;
  longitude: number;
  formatted_address?: string;
}

// Using Mapbox Geocoding API (since you already have Mapbox setup)
export async function geocodeAddress(address: string): Promise<GeocodeResult | null> {
  const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "pk.eyJ1IjoiZXRoYW4wMzgwIiwiYSI6ImNtZHZ5NWQwdjF5eGQya3B6NTgzeHZ0OGYifQ.n7xwqIjTcfHMZ6BcrUlKYQ";
  
  try {
    const encodedAddress = encodeURIComponent(address);
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${MAPBOX_ACCESS_TOKEN}&country=US&proximity=-122.4443,47.2529&types=address`
    );
    
    if (!response.ok) {
      throw new Error(`Geocoding failed: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.features && data.features.length > 0) {
      const [longitude, latitude] = data.features[0].center;
      return {
        latitude,
        longitude,
        formatted_address: data.features[0].place_name
      };
    }
    
    return null;
  } catch (error) {
    console.error(`Failed to geocode address: ${address}`, error);
    return null;
  }
}

// Batch geocode multiple addresses with rate limiting
export async function geocodeAddresses(addresses: string[]): Promise<(GeocodeResult | null)[]> {
  const results: (GeocodeResult | null)[] = [];
  
  for (let i = 0; i < addresses.length; i++) {
    const result = await geocodeAddress(addresses[i]);
    results.push(result);
    
    // Rate limiting: wait 100ms between requests to avoid hitting API limits
    if (i < addresses.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Log progress
    if ((i + 1) % 10 === 0) {
      console.log(`Geocoded ${i + 1}/${addresses.length} addresses`);
    }
  }
  
  return results;
}

// Alternative: Use OpenStreetMap Nominatim (free, no API key required)
export async function geocodeAddressNominatim(address: string): Promise<GeocodeResult | null> {
  try {
    const encodedAddress = encodeURIComponent(`${address}, Washington, USA`);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1&countrycodes=us`,
      {
        headers: {
          'User-Agent': 'HumeGroup-RealEstate-Website'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Nominatim geocoding failed: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data && data.length > 0) {
      return {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon),
        formatted_address: data[0].display_name
      };
    }
    
    return null;
  } catch (error) {
    console.error(`Failed to geocode address with Nominatim: ${address}`, error);
    return null;
  }
}

// Batch geocode with Nominatim (free service)
export async function geocodeAddressesNominatim(addresses: string[]): Promise<(GeocodeResult | null)[]> {
  const results: (GeocodeResult | null)[] = [];
  
  for (let i = 0; i < addresses.length; i++) {
    const result = await geocodeAddressNominatim(addresses[i]);
    results.push(result);
    
    // Rate limiting: Nominatim requires 1 second between requests
    if (i < addresses.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Log progress
    if ((i + 1) % 5 === 0) {
      console.log(`Geocoded ${i + 1}/${addresses.length} addresses with Nominatim`);
    }
  }
  
  return results;
}
