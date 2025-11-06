#!/usr/bin/env node

/**
 * Vercel Deployment Script
 * Alternative to Netlify with automatic environment variable setup
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

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