#!/usr/bin/env node

/**
 * Test script to check if environment variables are loading
 */

// Load environment variables
require('dotenv').config({ path: '.env.local' });

console.log('🔍 Testing environment variables...\n');

console.log('Environment variables found:');
console.log('SIMPLYRETS_API_KEY:', process.env.SIMPLYRETS_API_KEY || 'NOT FOUND');
console.log('SIMPLYRETS_BASE_URL:', process.env.SIMPLYRETS_BASE_URL || 'NOT FOUND');

if (process.env.SIMPLYRETS_API_KEY) {
  console.log('\n✅ SIMPLYRETS_API_KEY found!');
} else {
  console.log('\n❌ SIMPLYRETS_API_KEY not found!');
  console.log('Please check your .env.local file');
}

console.log('\nCurrent working directory:', process.cwd());
console.log('Files in current directory:');
const fs = require('fs');
const files = fs.readdirSync('.');
files.forEach(file => {
  if (file.startsWith('.env')) {
    console.log('  ��', file);
  }
}); 