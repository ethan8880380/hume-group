#!/usr/bin/env node

/**
 * Comprehensive SimplyRETS authentication test
 * Tests different authentication methods
 */

const https = require('https');

const apiKey = process.env.SIMPLYRETS_API_KEY;

if (!apiKey) {
  console.log('❌ SIMPLYRETS_API_KEY not found');
  process.exit(1);
}

console.log('🔍 Testing SimplyRETS authentication methods...\n');

// Test different authentication methods
const authMethods = [
  {
    name: 'Bearer Token',
    header: `Bearer ${apiKey}`
  },
  {
    name: 'Basic Auth (API Key only)',
    header: `Basic ${Buffer.from(apiKey + ':').toString('base64')}`
  },
  {
    name: 'Basic Auth (API Key:API Secret)',
    header: `Basic ${Buffer.from(apiKey + ':' + apiKey).toString('base64')}`
  },
  {
    name: 'API Key Header',
    header: `X-API-Key: ${apiKey}`
  },
  {
    name: 'Simple API Key',
    header: apiKey
  }
];

function testAuthMethod(method) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.simplyrets.com',
      port: 443,
      path: '/properties?limit=1',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };

    // Add the authentication header
    if (method.name === 'API Key Header') {
      options.headers['X-API-Key'] = apiKey;
    } else if (method.name === 'Simple API Key') {
      options.headers['Authorization'] = apiKey;
    } else {
      options.headers['Authorization'] = method.header;
    }

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const properties = JSON.parse(data);
            resolve({
              success: true,
              method: method.name,
              count: properties.length,
              sample: properties[0]
            });
          } catch (error) {
            reject({
              method: method.name,
              error: 'Parse error',
              status: res.statusCode,
              data: data
            });
          }
        } else {
          reject({
            method: method.name,
            error: `HTTP ${res.statusCode}`,
            status: res.statusCode,
            data: data
          });
        }
      });
    });

    req.on('error', (error) => {
      reject({
        method: method.name,
        error: error.message
      });
    });

    req.end();
  });
}

// Test all authentication methods
async function testAllMethods() {
  for (const method of authMethods) {
    try {
      console.log(`Testing ${method.name}...`);
      const result = await testAuthMethod(method);
      console.log(`✅ ${method.name} - SUCCESS!`);
      console.log(`   Found ${result.count} properties`);
      if (result.sample) {
        console.log(`   Sample: ${result.sample.address?.full || 'N/A'}`);
      }
      console.log('');
      return result; // Stop on first success
    } catch (error) {
      console.log(`❌ ${method.name} - FAILED (${error.error})`);
      if (error.data) {
        console.log(`   Response: ${error.data.substring(0, 100)}...`);
      }
      console.log('');
    }
  }
  
  console.log('💥 All authentication methods failed');
  console.log('\n🔧 Next steps:');
  console.log('1. Check your SimplyRETS dashboard for correct API credentials');
  console.log('2. Verify your account is active');
  console.log('3. Contact SimplyRETS support');
  return null;
}

// Run the tests
testAllMethods()
  .then((result) => {
    if (result) {
      console.log('🎉 Authentication successful!');
      console.log(`Working method: ${result.method}`);
    }
    process.exit(result ? 0 : 1);
  })
  .catch((error) => {
    console.log('💥 Test failed:', error);
    process.exit(1);
  }); 