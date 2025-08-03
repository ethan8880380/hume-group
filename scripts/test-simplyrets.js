#!/usr/bin/env node

/**
 * Test script for SimplyRETS API integration
 * Run this script to verify your SimplyRETS setup
 */

const https = require('https');

// Get API key from environment or prompt user
const apiKey = process.env.SIMPLYRETS_API_KEY;

if (!apiKey) {
  console.log('❌ SIMPLYRETS_API_KEY not found in environment variables');
  console.log('Please add your SimplyRETS API key to .env.local file');
  console.log('Example: SIMPLYRETS_API_KEY=your_api_key_here');
  process.exit(1);
}

console.log('🔍 Testing SimplyRETS API integration...\n');

// Test the SimplyRETS API
function testSimplyRETS() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.simplyrets.com',
      port: 443,
      path: '/properties?limit=5',
      method: 'GET',
      headers: {
        'Authorization': `Basic ${Buffer.from('simplyrets:simplyrets').toString('base64')}`,
        'Content-Type': 'application/json',
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const properties = JSON.parse(data);
            console.log('✅ SimplyRETS API connection successful!');
            console.log(`📊 Found ${properties.length} properties`);
            
            if (properties.length > 0) {
              const sample = properties[0];
              console.log('\n📋 Sample property data:');
              console.log(`   Address: ${sample.address?.full || 'N/A'}`);
              console.log(`   Price: $${sample.listPrice?.toLocaleString() || 'N/A'}`);
              console.log(`   Beds: ${sample.property?.bedrooms || 'N/A'}`);
              console.log(`   Baths: ${sample.property?.bathsFull || 'N/A'}`);
              console.log(`   Sq Ft: ${sample.property?.area?.toLocaleString() || 'N/A'}`);
            }
            
            console.log('\n🎉 Your SimplyRETS integration is working correctly!');
            console.log('You can now run your Next.js app and see real property data.');
            resolve(properties);
          } catch (error) {
            console.log('❌ Error parsing API response:', error.message);
            reject(error);
          }
        } else {
          console.log(`❌ API request failed with status: ${res.statusCode}`);
          console.log('Response:', data);
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      console.log('❌ Network error:', error.message);
      reject(error);
    });

    req.end();
  });
}

// Run the test
testSimplyRETS()
  .then(() => {
    console.log('\n✨ Test completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.log('\n💥 Test failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Verify your API key is correct');
    console.log('2. Check if your SimplyRETS account is active');
    console.log('3. Ensure your MLS credentials are configured');
    console.log('4. Contact SimplyRETS support if issues persist');
    process.exit(1);
  }); 