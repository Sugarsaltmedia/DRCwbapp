#!/usr/bin/env node

/**
 * Automated Netlify Environment Variables Setup Script
 * This script uses Netlify CLI to bulk set environment variables
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Environment variables to set
const ENV_VARS = {
  // Firebase Configuration
  VITE_FIREBASE_API_KEY: "AIzaSyCy9FAmlflCY2yue2ebK2H-7FsNqkgaeJA",
  VITE_FIREBASE_AUTH_DOMAIN: "drcmovies-1dc9c.firebaseapp.com",
  VITE_FIREBASE_PROJECT_ID: "drcmovies-1dc9c",
  VITE_FIREBASE_STORAGE_BUCKET: "drcmovies-1dc9c.firebasestorage.app",
  VITE_FIREBASE_MESSAGING_SENDER_ID: "64082360151",
  VITE_FIREBASE_APP_ID: "1:64082360151:web:ddf3b9107274aad5dff012",
  VITE_FIREBASE_MEASUREMENT_ID: "G-GV5DXMVE7L",
  
  // Payment Configuration
  VITE_RAZORPAY_KEY_ID: "rzp_live_RYS8jZKMNTvoe6",
  VITE_RAZORPAY_KEY_SECRET: "7X1gyVYuayETVi7MBS4xO92f"
};

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