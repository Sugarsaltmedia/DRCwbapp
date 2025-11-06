#!/bin/bash

# Script to set Netlify environment variables for Firebase
# Run this script with your Netlify site ID: ./set-netlify-env.sh YOUR_SITE_ID

SITE_ID=$1

if [ -z "$SITE_ID" ]; then
  echo "❌ Error: Please provide your Netlify site ID"
  echo "Usage: ./set-netlify-env.sh YOUR_SITE_ID"
  echo ""
  echo "You can find your site ID in Netlify dashboard under Site settings > General > Site details"
  exit 1
fi

echo "🚀 Setting up Netlify environment variables for Firebase..."
echo "📍 Site ID: $SITE_ID"
echo ""

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
  echo "❌ Netlify CLI is not installed"
  echo "Install it with: npm install -g netlify-cli"
  exit 1
fi

# Firebase Configuration
echo "📝 Setting Firebase environment variables..."

netlify env:set VITE_FIREBASE_API_KEY "AIzaSyCy9FAmlflCY2yue2ebK2H-7FsNqkgaeJA" --site $SITE_ID
netlify env:set VITE_FIREBASE_AUTH_DOMAIN "drcmovies-1dc9c.firebaseapp.com" --site $SITE_ID
netlify env:set VITE_FIREBASE_PROJECT_ID "drcmovies-1dc9c" --site $SITE_ID
netlify env:set VITE_FIREBASE_STORAGE_BUCKET "drcmovies-1dc9c.firebasestorage.app" --site $SITE_ID
netlify env:set VITE_FIREBASE_MESSAGING_SENDER_ID "64082360151" --site $SITE_ID
netlify env:set VITE_FIREBASE_APP_ID "1:64082360151:web:ddf3b9107274aad5dff012" --site $SITE_ID
netlify env:set VITE_FIREBASE_MEASUREMENT_ID "G-GV5DXMVE7L" --site $SITE_ID

# Razorpay Configuration
echo "💳 Setting Razorpay environment variables..."

netlify env:set VITE_RAZORPAY_KEY_ID "rzp_live_RYS8jZKMNTvoe6" --site $SITE_ID
netlify env:set RAZORPAY_KEY_SECRET "7X1gyVYuayETVi7MBS4xO92f" --site $SITE_ID

echo ""
echo "✅ All environment variables have been set successfully!"
echo ""
echo "🔄 Next steps:"
echo "1. Redeploy your site in Netlify"
echo "2. The new environment variables will be available in the next build"
echo ""
echo "📝 Note: You can verify the variables are set by running:"
echo "   netlify env:list --site $SITE_ID"
