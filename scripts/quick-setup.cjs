#!/usr/bin/env node

/**
 * Quick Netlify Environment Variables Setup
 * Uses your provided credentials to bulk set environment variables
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const NETLIFY_SITE_ID = process.env.NETLIFY_SITE_ID;
const NETLIFY_ACCESS_TOKEN = process.env.NETLIFY_ACCESS_TOKEN;

function getEnvVarsFromFile() {
  const envPath = path.join(__dirname, '..', '.env');
  const envVars = {};

  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const lines = envContent.split('\n');

    lines.forEach(line => {
      const match = line.match(/^([A-Z_]+)=(.*)$/);
      if (match && match[1].startsWith('VITE_')) {
        envVars[match[1]] = match[2];
      }
    });
  }

  return envVars;
}

const ENV_VARS = getEnvVarsFromFile();

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

  if (!NETLIFY_SITE_ID) {
    console.error('❌ NETLIFY_SITE_ID environment variable is not set');
    process.exit(1);
  }

  if (!NETLIFY_ACCESS_TOKEN) {
    console.error('❌ NETLIFY_ACCESS_TOKEN environment variable is not set');
    process.exit(1);
  }

  console.log(`📍 Site ID: ${NETLIFY_SITE_ID}`);
  console.log(`🔑 Using access token from environment`);
  
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