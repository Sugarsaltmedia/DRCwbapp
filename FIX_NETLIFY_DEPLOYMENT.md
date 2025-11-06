# 🔴 URGENT: Fix Netlify Deployment - Environment Variables Missing

## Your Current Problem

Your site is deployed to Netlify but showing a **black screen** with this error:
```
❌ Missing required Firebase environment variables
Firebase: Error (auth/invalid-api-key)
```

## Why This Happens

The `.env` file on your computer is **NOT** uploaded to Netlify. Environment variables must be set **manually in Netlify's dashboard**.

## 🚀 Quick Fix (3 Steps)

### Step 1: Go to Netlify Dashboard

1. Open: https://app.netlify.com
2. Click your site: **drccafe**
3. Go to: **Site settings** → **Environment variables**

### Step 2: Add Variables

Click **"Add a variable"** and add these **9 variables**:

#### Copy-paste these exactly:

```
Variable 1:
Key: VITE_FIREBASE_API_KEY
Value: AIzaSyCy9FAmlflCY2yue2ebK2H-7FsNqkgaeJA

Variable 2:
Key: VITE_FIREBASE_AUTH_DOMAIN
Value: drcmovies-1dc9c.firebaseapp.com

Variable 3:
Key: VITE_FIREBASE_PROJECT_ID
Value: drcmovies-1dc9c

Variable 4:
Key: VITE_FIREBASE_STORAGE_BUCKET
Value: drcmovies-1dc9c.firebasestorage.app

Variable 5:
Key: VITE_FIREBASE_MESSAGING_SENDER_ID
Value: 64082360151

Variable 6:
Key: VITE_FIREBASE_APP_ID
Value: 1:64082360151:web:ddf3b9107274aad5dff012

Variable 7:
Key: VITE_FIREBASE_MEASUREMENT_ID
Value: G-GV5DXMVE7L

Variable 8:
Key: VITE_RAZORPAY_KEY_ID
Value: rzp_live_RYS8jZKMNTvoe6

Variable 9:
Key: RAZORPAY_KEY_SECRET
Value: 7X1gyVYuayETVi7MBS4xO92f
```

**Important**: For each variable:
- ✅ Check **ALL scopes**: Production, Deploy previews, Branch deploys
- ✅ Copy the Key and Value exactly (no quotes, no spaces at the end)

### Step 3: Clear Cache and Redeploy

1. Go to **Deploys** tab
2. Click **Trigger deploy** dropdown
3. Select **"Clear cache and deploy site"** ← IMPORTANT!
4. Wait 2-3 minutes for build

## ✅ After Deployment

Your site should now:
- Load properly (no black screen)
- Show the food menu
- Allow orders
- Process payments

## 🐛 If Still Not Working

1. **Check browser console** (F12 → Console tab)
2. **Verify all 9 variables** are added in Netlify (count them!)
3. **Make sure you cleared cache** when deploying
4. **Try incognito/private window** to test
5. **Hard refresh** your browser (Ctrl+Shift+R or Cmd+Shift+R)

## 📱 Screenshots/Video Help

Can't find where to add variables? Here's the path:
```
Netlify Dashboard
  → Your Site (drccafe)
    → Site settings (left sidebar)
      → Environment variables (under Build & deploy)
        → Add a variable (button at top)
```

## ⚠️ Common Mistakes

❌ Adding variables to `.env` file only (doesn't work for Netlify)
❌ Forgetting to check all scopes (Production, Deploy previews, etc.)
❌ Typos in variable names (they're case-sensitive!)
❌ Not clearing cache before redeploying
❌ Adding quotes around values (just paste the value directly)

## 🎯 Quick Verification Script

Run this locally to check if your `.env` is correct:
```bash
node scripts/check-env.js
```

---

**Bottom line**: Netlify needs these 9 variables set in its dashboard. Your local `.env` file doesn't transfer automatically. Set them once in Netlify, clear cache, redeploy, and you're done! 🚀
