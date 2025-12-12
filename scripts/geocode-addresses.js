// Script to geocode all addresses and update sold-listings.ts with accurate coordinates
const fs = require('fs');
const path = require('path');

// Read the original addresses from your file
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
  "5718 N 48th St, Tacoma, WA 98407",
  "5117 N Bristol St, Tacoma, WA 98407",
  "3302 N Whitman St, Tacoma, WA 98407",
  "4936 N Lexington St, Tacoma, WA 98407",
  "5115 N Ruby St, Tacoma, WA 98407",
  "4808 N Lexington St, Tacoma, WA 98407",
  "4632 N Lexington St, Tacoma, WA 98407",
  "6701 N 49th St, Tacoma, WA 98407",
  "4705 N Ferdinand St, Tacoma, WA 98407",
  "5013 N 47th St, Tacoma, WA 98407",
  "5019 N 47th St, Tacoma, WA 98407",
  "3142 N Cheyenne St, Tacoma, WA 98407",
  "4121 N Huson St, Tacoma, WA 98407",
  "3117 N Mullen St, Tacoma, WA 98407",
  "3709 N Cheyenne St, Tacoma, WA 98407",
  "4615 N Huson St, Tacoma, WA 98407",
  "4401 N 32nd St, Tacoma, WA 98407",
  "3917 N Mullen St, Tacoma, WA 98407",
  "3509 N Verde St, Tacoma, WA 98407",
  "3402 N Madison St, Tacoma, WA 98407",
  "3924 N Cheyenne St, Tacoma, WA 98407",
  "3912 N Stevens St, Tacoma, WA 98407",
  "4102 N 27th St, Tacoma, WA 98407",
  "4101 N 27th St, Tacoma, WA 98407",
  "352 N Mason Ave, Tacoma, WA 98407",
  "392 N Mullen St, Tacoma, WA 98407",
  "4107 N 36th St, Tacoma, WA 98407",
  "4617 N Huson St, Tacoma, WA 98407",
  "4404 N Stevens St, Tacoma, WA 98407",
  "3516 N Huson St, Tacoma, WA 98407",
  "431 N 36th St, Tacoma, WA 98407",
  "4102 N 36th St, Tacoma, WA 98407",
  "352 N Ferdinand St, Tacoma, WA 98407",
  "4314 N Huson St, Tacoma, WA 98407",
  "2402 N Madison St, Tacoma, WA 98406",
  "3928 N 30th St, Tacoma, WA 98407",
  "3519 N Union Ave #2, Tacoma, WA 98407",
  "3516 N Proctor St, Tacoma, WA 98407",
  "2712 N Puget Sound Ave, Tacoma, WA 98407",
  "4106 N 36th St, Tacoma, WA 98407",
  "4211 N 26th St, Tacoma, WA 98407"
  // ... I'll add more in batches to avoid overwhelming the API
];

// Geocode using OpenStreetMap Nominatim (free service)
async function geocodeAddress(address) {
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
      throw new Error(`Geocoding failed: ${response.statusText}`);
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
    console.error(`Failed to geocode: ${address}`, error);
    return null;
  }
}

async function geocodeAllAddresses() {
  console.log(`Starting to geocode ${addresses.length} addresses...`);
  const results = [];
  
  for (let i = 0; i < addresses.length; i++) {
    console.log(`Geocoding ${i + 1}/${addresses.length}: ${addresses[i]}`);
    
    const result = await geocodeAddress(addresses[i]);
    
    if (result) {
      results.push({
        id: i + 1,
        address: addresses[i].split(',')[0], // Just the street address
        fullAddress: addresses[i],
        latitude: result.latitude,
        longitude: result.longitude,
        city: addresses[i].split(',')[1]?.trim() || 'Tacoma',
        state: 'WA',
        zipCode: addresses[i].match(/\d{5}/)?.[0] || '98407'
      });
      console.log(`✓ Success: ${result.latitude}, ${result.longitude}`);
    } else {
      console.log(`✗ Failed to geocode: ${addresses[i]}`);
    }
    
    // Rate limiting: wait 1 second between requests for Nominatim
    if (i < addresses.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  // Save results to a JSON file
  const outputPath = path.join(__dirname, '..', 'lib', 'geocoded-addresses.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  
  console.log(`\nGeocoding complete! Results saved to: ${outputPath}`);
  console.log(`Successfully geocoded: ${results.length}/${addresses.length} addresses`);
  
  return results;
}

// Run the geocoding
geocodeAllAddresses().catch(console.error);
