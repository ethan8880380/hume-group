// Simple script to get accurate coordinates for your addresses
// Run this with: node scripts/update-coordinates.js

const addresses = [
  "3611 Butler Dr, Gig Harbor, WA 98335",
  "9116 Goodman Ave, Gig Harbor, WA 98332",
  "3702 Hunt St #19, Gig Harbor, WA 98335",
  "112 Aqua Vista Dr NW, Gig Harbor, WA 98335",
  "4302 Berg Dr NW, Gig Harbor, WA 98335",
  "2301 Point View Place NW, Gig Harbor, WA 98335",
  "10311 106th Av Ct, Anderson Island, WA 98303",
  "5125 N Defiance St, Tacoma, WA 98407",
  "4642 N Defiance St, Tacoma, WA 98407",
  "5718 N 48th St, Tacoma, WA 98407"
  // Add more addresses as needed
];

async function getCoordinates(address) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1&countrycodes=us`,
      {
        headers: {
          'User-Agent': 'HumeGroup-Website'
        }
      }
    );
    
    const data = await response.json();
    
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon)
      };
    }
    return null;
  } catch (error) {
    console.error(`Error geocoding ${address}:`, error);
    return null;
  }
}

async function processAddresses() {
  console.log('Getting accurate coordinates for addresses...\n');
  
  for (let i = 0; i < Math.min(addresses.length, 10); i++) { // Process first 10 as example
    const address = addresses[i];
    console.log(`Processing: ${address}`);
    
    const coords = await getCoordinates(address);
    
    if (coords) {
      console.log(`✓ Coordinates: ${coords.lat}, ${coords.lon}`);
      console.log(`  { id: ${i + 1}, address: "${address.split(',')[0]}", latitude: ${coords.lat}, longitude: ${coords.lon}, city: "${address.split(',')[1]?.trim()}", state: "WA", zipCode: "${address.match(/\d{5}/)?.[0]}" },`);
    } else {
      console.log(`✗ Failed to get coordinates`);
    }
    
    console.log('');
    
    // Wait 1 second between requests to be respectful to the free service
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

processAddresses();
