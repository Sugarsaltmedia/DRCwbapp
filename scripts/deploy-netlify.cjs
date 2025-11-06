#!/usr/bin/env node

/**
 * Automated Netlify Environment Variables Setup Script
 * This script uses Netlify CLI to bulk set environment variables
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

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

async function setNetlifyEnvVars() {
  console.log('🚀 Starting automated Netlify environment variables setup...');
  
  try {
    // Check if Netlify CLI is installed
    try {
      execSync('netlify --version', { stdio: 'pipe' });
      console.log('✅ Netlify CLI found');
    } catch (error) {
      console.log('📦 Installing Netlify CLI...');
      execSync('npm install -g netlify-cli', { stdio: 'inherit' });
    }

    // Login check
    try {
      execSync('netlify status', { stdio: 'pipe' });
      console.log('✅ Already logged in to Netlify');
    } catch (error) {
      console.log('🔐 Please login to Netlify...');
      execSync('netlify login', { stdio: 'inherit' });
    }

    // Set environment variables
    console.log('⚙️ Setting environment variables...');
    
    for (const [key, value] of Object.entries(ENV_VARS)) {
      try {
        console.log(`Setting ${key}...`);
        execSync(`netlify env:set ${key} "${value}"`, { stdio: 'pipe' });
        console.log(`✅ ${key} set successfully`);
      } catch (error) {
        console.error(`❌ Failed to set ${key}:`, error.message);
      }
    }

    // Trigger deployment
    console.log('🚀 Triggering new deployment...');
    execSync('netlify deploy --prod', { stdio: 'inherit' });
    
    console.log('🎉 Environment variables setup complete!');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

// Run the setup
setNetlifyEnvVars();