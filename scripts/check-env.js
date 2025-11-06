#!/usr/bin/env node

/**
 * Environment Variables Checker
 * Verifies that all required Firebase and Razorpay variables are set
 */

const requiredVars = {
  firebase: [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID',
    'VITE_FIREBASE_MEASUREMENT_ID'
  ],
  razorpay: [
    'VITE_RAZORPAY_KEY_ID',
    'RAZORPAY_KEY_SECRET'
  ]
};

console.log('🔍 Checking Environment Variables...\n');

let allPresent = true;
let firebaseCount = 0;
let razorpayCount = 0;

// Check Firebase variables
console.log('📱 Firebase Configuration:');
requiredVars.firebase.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`   ✅ ${varName}: ${value.substring(0, 20)}...`);
    firebaseCount++;
  } else {
    console.log(`   ❌ ${varName}: MISSING`);
    allPresent = false;
  }
});

console.log(`\n   Total: ${firebaseCount}/${requiredVars.firebase.length} Firebase variables\n`);

// Check Razorpay variables
console.log('💳 Razorpay Configuration:');
requiredVars.razorpay.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`   ✅ ${varName}: ${value.substring(0, 15)}...`);
    razorpayCount++;
  } else {
    console.log(`   ❌ ${varName}: MISSING`);
    allPresent = false;
  }
});

console.log(`\n   Total: ${razorpayCount}/${requiredVars.razorpay.length} Razorpay variables\n`);

// Check for old Supabase variables
console.log('🔍 Checking for old Supabase variables:');
const supabaseVars = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY'
];

let hasSupabase = false;
supabaseVars.forEach(varName => {
  if (process.env[varName]) {
    console.log(`   ⚠️  ${varName}: FOUND (should be removed!)`);
    hasSupabase = true;
  }
});

if (!hasSupabase) {
  console.log('   ✅ No Supabase variables found\n');
} else {
  console.log('\n   ❌ Remove Supabase variables!\n');
}

// Summary
console.log('=' .repeat(50));
console.log('\n📊 SUMMARY:\n');

if (allPresent && !hasSupabase) {
  console.log('✅ All required variables are set correctly!');
  console.log('✅ No old Supabase variables found');
  console.log('\n🚀 You can deploy to Netlify now!\n');
  console.log('Make sure these same variables are set in:');
  console.log('   Netlify Dashboard → Site Settings → Environment Variables\n');
  process.exit(0);
} else {
  console.log('❌ Environment setup issues found:\n');

  if (!allPresent) {
    console.log(`   • Missing ${requiredVars.firebase.length + requiredVars.razorpay.length - firebaseCount - razorpayCount} required variable(s)`);
  }

  if (hasSupabase) {
    console.log('   • Old Supabase variables need to be removed');
  }

  console.log('\n📝 Action items:');
  console.log('   1. Check your .env file');
  console.log('   2. Add missing variables');
  console.log('   3. Remove Supabase variables');
  console.log('   4. Set same variables in Netlify dashboard\n');

  process.exit(1);
}
