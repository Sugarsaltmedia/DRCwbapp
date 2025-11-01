#!/usr/bin/env node

/**
 * Quick Netlify Environment Variables Setup
 * Uses your provided credentials to bulk set environment variables
 */

const https = require('https');

// Your Netlify credentials
const NETLIFY_SITE_ID = 'ea013371-ebc1-4c66-9716-7222dfe73dde';
const NETLIFY_ACCESS_TOKEN = 'nfp_xqusq43tDiaSpWo285EugWPfabUo9Gdie8af';

// Environment variables to set
const ENV_VARS = {
  VITE_FIREBASE_API_KEY: "AIzaSyCy9FAmlflCY2yue2ebK2H-7FsNqkgaeJA",
  VITE_FIREBASE_AUTH_DOMAIN: "drcmovies-1dc9c.firebaseapp.com",
  VITE_FIREBASE_PROJECT_ID: "drcmovies-1dc9c",
  VITE_FIREBASE_STORAGE_BUCKET: "drcmovies-1dc9c.firebasestorage.app",
  VITE_FIREBASE_MESSAGING_SENDER_ID: "64082360151",
  VITE_FIREBASE_APP_ID: "1:64082360151:web:ddf3b9107274aad5dff012",
  VITE_FIREBASE_MEASUREMENT_ID: "G-GV5DXMVE7L",
  VITE_RAZORPAY_KEY_ID: "rzp_live_RYS8jZKMNTvoe6",
  VITE_RAZORPAY_KEY_SECRET: "7X1gyVYuayETVi7MBS4xO92f"
};

function makeNetlifyAPICall(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.netlify.com',
      port: 443,
      path: `/api/v1${path}`,
      method: method,
      headers: {
        'Authorization': `Bearer ${NETLIFY_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(responseData || '{}'));
          } catch (e) {
            resolve(responseData);
          }
        } else {
          reject(new Error(`API call failed: ${res.statusCode} ${responseData}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

async function setEnvironmentVariables() {
  console.log('🚀 Setting up environment variables via Netlify API...');
  console.log(`📍 Site ID: ${NETLIFY_SITE_ID}`);
  console.log(`🔑 Using provided access token`);
  
  try {
    // Prepare bulk update payload
    const envVarUpdates = Object.entries(ENV_VARS).map(([key, value]) => ({
      key,
      values: [{ value, context: 'all' }]
    }));

    console.log(`⚙️ Setting ${envVarUpdates.length} environment variables...`);
    
    // Bulk update environment variables
    await makeNetlifyAPICall('PATCH', `/sites/${NETLIFY_SITE_ID}/env`, envVarUpdates);
    
    console.log('✅ Environment variables updated successfully!');
    
    // Trigger new build
    console.log('🚀 Triggering new build...');
    const buildResponse = await makeNetlifyAPICall('POST', `/sites/${NETLIFY_SITE_ID}/builds`);
    
    console.log('🎉 Setup complete! New build triggered.');
    console.log(`🔗 Check your site: https://app.netlify.com/sites/${NETLIFY_SITE_ID}/deploys`);
    
    // List the variables that were set
    console.log('\n📋 Environment variables set:');
    Object.keys(ENV_VARS).forEach(key => {
      console.log(`   ✓ ${key}`);
    });
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    
    if (error.message.includes('401')) {
      console.error('🔑 Authentication failed. Please check your access token.');
    } else if (error.message.includes('404')) {
      console.error('🔍 Site not found. Please check your site ID.');
    }
    
    process.exit(1);
  }
}

setEnvironmentVariables();