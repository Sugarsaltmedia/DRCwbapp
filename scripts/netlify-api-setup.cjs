#!/usr/bin/env node

/**
 * Netlify API Environment Variables Setup
 * Uses Netlify's REST API to bulk set environment variables
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
          resolve(JSON.parse(responseData || '{}'));
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
  
  if (!NETLIFY_SITE_ID || NETLIFY_SITE_ID === 'YOUR_SITE_ID') {
    console.error('❌ Please set NETLIFY_SITE_ID environment variable');
    process.exit(1);
  }
  
  if (!NETLIFY_ACCESS_TOKEN || NETLIFY_ACCESS_TOKEN === 'YOUR_ACCESS_TOKEN') {
    console.error('❌ Please set NETLIFY_ACCESS_TOKEN environment variable');
    console.log('Get your token from: https://app.netlify.com/user/applications#personal-access-tokens');
    process.exit(1);
  }

  try {
    // Get current environment variables
    console.log('📋 Fetching current environment variables...');
    const currentEnvVars = await makeNetlifyAPICall('GET', `/sites/${NETLIFY_SITE_ID}/env`);
    
    // Prepare bulk update payload
    const envVarUpdates = Object.entries(ENV_VARS).map(([key, value]) => ({
      key,
      values: [{ value, context: 'all' }]
    }));

    // Bulk update environment variables
    console.log('⚙️ Updating environment variables...');
    await makeNetlifyAPICall('PATCH', `/sites/${NETLIFY_SITE_ID}/env`, envVarUpdates);
    
    console.log('✅ Environment variables updated successfully!');
    
    // Trigger new build
    console.log('🚀 Triggering new build...');
    await makeNetlifyAPICall('POST', `/sites/${NETLIFY_SITE_ID}/builds`);
    
    console.log('🎉 Setup complete! New build triggered.');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

setEnvironmentVariables();