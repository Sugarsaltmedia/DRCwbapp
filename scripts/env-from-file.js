#!/usr/bin/env node

/**
 * Load environment variables from .env file and set them in Netlify
 * This script reads your local .env file and bulk uploads to Netlify
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Environment file not found: ${filePath}`);
  }

  const envContent = fs.readFileSync(filePath, 'utf8');
  const envVars = {};

  envContent.split('\n').forEach(line => {
    line = line.trim();
    if (line && !line.startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').replace(/^["']|["']$/g, '');
        envVars[key.trim()] = value;
      }
    }
  });

  return envVars;
}

async function deployWithEnvVars() {
  console.log('🚀 Loading environment variables from .env file...');
  
  try {
    // Parse .env file
    const envVars = parseEnvFile('.env');
    console.log(`📋 Found ${Object.keys(envVars).length} environment variables`);

    // Filter only VITE_ prefixed variables for security
    const publicEnvVars = Object.entries(envVars)
      .filter(([key]) => key.startsWith('VITE_'))
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});

    console.log(`🔒 Filtered to ${Object.keys(publicEnvVars).length} public variables`);

    // Check Netlify CLI
    try {
      execSync('netlify --version', { stdio: 'pipe' });
    } catch (error) {
      console.log('📦 Installing Netlify CLI...');
      execSync('npm install -g netlify-cli', { stdio: 'inherit' });
    }

    // Set each environment variable
    console.log('⚙️ Setting environment variables in Netlify...');
    
    for (const [key, value] of Object.entries(publicEnvVars)) {
      try {
        console.log(`Setting ${key}...`);
        execSync(`netlify env:set "${key}" "${value}"`, { stdio: 'pipe' });
        console.log(`✅ ${key} set successfully`);
      } catch (error) {
        console.error(`❌ Failed to set ${key}:`, error.message);
      }
    }

    // Deploy
    console.log('🚀 Deploying to Netlify...');
    execSync('netlify deploy --prod', { stdio: 'inherit' });
    
    console.log('🎉 Deployment complete with environment variables!');
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

deployWithEnvVars();