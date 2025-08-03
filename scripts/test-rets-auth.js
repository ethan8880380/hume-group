#!/usr/bin/env node

/**
 * RETS authentication test for SimplyRETS
 */

const https = require('https');

const apiKey = process.env.SIMPLYRETS_API_KEY;

if (!apiKey) {
  console.log('❌ SIMPLYRETS_API_KEY not found');
  process.exit(1);
}

console.log('🔍 Testing RETS authentication with SimplyRETS...\n');

// RETS-specific authentication methods
const retsAuthMethods = [
  {
    name: 'RETS Basic Auth (username:password)',
    header: `Basic ${Buffer.from('simplyrets:simplyrets').toString('base64')}`
  },
  {
    name: 'RETS Basic Auth (apiKey:apiKey)',
    header: `Basic ${Buffer.from(apiKey + ':' + apiKey).toString('base64')}`
  },
  {
    name: 'RETS Bearer Token',
    header: `Bearer ${apiKey}`
  },
  {
    name: 'RETS API Key Header',
    header: `X-API-Key: ${apiKey}`
  },
  {
    name: 'RETS User-Agent + Basic Auth',
    header: `Basic ${Buffer.from('simplyrets:simplyrets').toString('base64')}`,
    userAgent: 'SimplyRETS/1.0'
  }
];

function testRETSAuth(method) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.simplyrets.com',
      port: 443,
      path: '/properties?limit=1',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': method.header
      }
    };

    // Add User-Agent if specified
    if (method.userAgent) {
      options.headers['User-Agent'] = method.userAgent;
    }

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log(`Status: ${res.statusCode}`);
        console.log(`Headers:`, res.headers);
        
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
              data: data.substring(0, 200)
            });
          }
        } else {
          reject({
            method: method.name,
            error: `HTTP ${res.statusCode}`,
            status: res.statusCode,
            data: data.substring(0, 200)
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

// Test all RETS authentication methods
async function testAllRETSMethods() {
  for (const method of retsAuthMethods) {
    try {
      console.log(`Testing ${method.name}...`);
      const result = await testRETSAuth(method);
      console.log(`✅ ${method.name} - SUCCESS!`);
      console.log(`   Found ${result.count} properties`);
      if (result.sample) {
        console.log(`   Sample: ${result.sample.address?.full || 'N/A'}`);
      }
      console.log('');
      return result;
    } catch (error) {
      console.log(`❌ ${method.name} - FAILED (${error.error})`);
      if (error.data) {
        console.log(`   Response: ${error.data}`);
      }
      console.log('');
    }
  }
  
  console.log('💥 All RETS authentication methods failed');
  console.log('\n🔧 Next steps:');
  console.log('1. Check SimplyRETS documentation for RETS authentication');
  console.log('2. Verify your RETS credentials are correct');
  console.log('3. Contact SimplyRETS support for RETS API access');
  return null;
}

// Run the tests
testAllRETSMethods()
  .then((result) => {
    if (result) {
      console.log('🎉 RETS authentication successful!');
      console.log(`Working method: ${result.method}`);
    }
    process.exit(result ? 0 : 1);
  })
  .catch((error) => {
    console.log('💥 Test failed:', error);
    process.exit(1);
  }); 