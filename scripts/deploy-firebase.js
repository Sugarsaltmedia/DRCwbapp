#!/usr/bin/env node

/**
 * Firebase Hosting Deployment Script
 * Alternative to Netlify with automatic environment variable setup
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Firebase configuration
const FIREBASE_CONFIG = {
  projectId: "drcmovies-1dc9c",
  hosting: {
    public: "dist",
    ignore: ["firebase.json", "**/.*", "**/node_modules/**"],
    rewrites: [
      {
        source: "**",
        destination: "/index.html"
      }
    ]
  }
};

async function deployToFirebase() {
  console.log('🚀 Starting Firebase Hosting deployment...');
  
  try {
    // Check if Firebase CLI is installed
    try {
      execSync('firebase --version', { stdio: 'pipe' });
      console.log('✅ Firebase CLI found');
    } catch (error) {
      console.log('📦 Installing Firebase CLI...');
      execSync('npm install -g firebase-tools', { stdio: 'inherit' });
    }

    // Create firebase.json if it doesn't exist
    if (!fs.existsSync('firebase.json')) {
      console.log('📝 Creating firebase.json...');
      fs.writeFileSync('firebase.json', JSON.stringify(FIREBASE_CONFIG, null, 2));
    }

    // Build the project
    console.log('🔨 Building project...');
    execSync('npm run build', { stdio: 'inherit' });

    // Login to Firebase (if not already logged in)
    try {
      execSync('firebase projects:list', { stdio: 'pipe' });
      console.log('✅ Already logged in to Firebase');
    } catch (error) {
      console.log('🔐 Please login to Firebase...');
      execSync('firebase login', { stdio: 'inherit' });
    }

    // Deploy to Firebase Hosting
    console.log('🚀 Deploying to Firebase Hosting...');
    execSync(`firebase deploy --project ${FIREBASE_CONFIG.projectId}`, { stdio: 'inherit' });
    
    console.log('🎉 Deployment complete!');
    console.log(`🔗 Your site is live at: https://${FIREBASE_CONFIG.projectId}.web.app`);
    console.log(`🔗 Custom domain: https://${FIREBASE_CONFIG.projectId}.firebaseapp.com`);
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

deployToFirebase();