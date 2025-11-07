#!/usr/bin/env node

/**
 * Vercel Deployment Script
 * Alternative to Netlify with automatic environment variable setup
 */

const { execSync } = require('child_process');
const fs = require('fs');

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

async function deployToVercel() {
  console.log('🚀 Starting Vercel deployment...');
  
  try {
    // Check if Vercel CLI is installed
    try {
      execSync('vercel --version', { stdio: 'pipe' });
      console.log('✅ Vercel CLI found');
    } catch (error) {
      console.log('📦 Installing Vercel CLI...');
      execSync('npm install -g vercel', { stdio: 'inherit' });
    }

    // Create vercel.json configuration
    const vercelConfig = {
      "buildCommand": "npm run build",
      "outputDirectory": "dist",
      "framework": "vite",
      "rewrites": [
        {
          "source": "/(.*)",
          "destination": "/index.html"
        }
      ],
      "env": ENV_VARS
    };

    console.log('📝 Creating vercel.json...');
    fs.writeFileSync('vercel.json', JSON.stringify(vercelConfig, null, 2));

    // Login to Vercel (if not already logged in)
    try {
      execSync('vercel whoami', { stdio: 'pipe' });
      console.log('✅ Already logged in to Vercel');
    } catch (error) {
      console.log('🔐 Please login to Vercel...');
      execSync('vercel login', { stdio: 'inherit' });
    }

    // Deploy to Vercel
    console.log('🚀 Deploying to Vercel...');
    execSync('vercel --prod', { stdio: 'inherit' });
    
    console.log('🎉 Deployment complete!');
    console.log('🔗 Check your Vercel dashboard for the live URL');
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

deployToVercel();