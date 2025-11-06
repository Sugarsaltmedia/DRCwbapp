# Netlify Deployment Checklist

Follow these steps to successfully deploy your Firebase application to Netlify.

## ✅ Pre-Deployment Checklist

### 1. Verify Package Installation
```bash
# Make sure Supabase is NOT in dependencies
npm list @supabase/supabase-js
# Should show: (empty)

# Make sure Firebase IS installed
npm list firebase
# Should show: firebase@12.0.0
```

### 2. Verify Build Works Locally
```bash
npm run build
# Should complete without errors
```

### 3. Check Environment Variables Locally
```bash
cat .env
# Should contain only Firebase and Razorpay variables
# Should NOT contain any VITE_SUPABASE_* variables
```

## 🚀 Deployment Steps

### Step 1: Clear Netlify Cache (Important!)

Before deploying, you need to clear Netlify's build cache to remove any old Supabase dependencies:

1. Go to your Netlify dashboard
2. Navigate to **Site settings** → **Build & deploy** → **Build settings**
3. Click **Clear cache and retry deploy**

OR use Netlify CLI:
```bash
netlify build --clear-cache
```

### Step 2: Set Environment Variables in Netlify

Go to **Site settings** → **Environment variables** and add:

#### Firebase Configuration
```
VITE_FIREBASE_API_KEY=AIzaSyCy9FAmlflCY2yue2ebK2H-7FsNqkgaeJA
VITE_FIREBASE_AUTH_DOMAIN=drcmovies-1dc9c.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=drcmovies-1dc9c
VITE_FIREBASE_STORAGE_BUCKET=drcmovies-1dc9c.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=64082360151
VITE_FIREBASE_APP_ID=1:64082360151:web:ddf3b9107274aad5dff012
VITE_FIREBASE_MEASUREMENT_ID=G-GV5DXMVE7L
```

#### Razorpay Configuration
```
VITE_RAZORPAY_KEY_ID=rzp_live_RYS8jZKMNTvoe6
RAZORPAY_KEY_SECRET=7X1gyVYuayETVi7MBS4xO92f
```

### Step 3: Remove Old Supabase Variables (If Any)

In Netlify dashboard → **Site settings** → **Environment variables**:
- Delete `VITE_SUPABASE_URL` if it exists
- Delete `VITE_SUPABASE_ANON_KEY` if it exists
- Delete any other Supabase-related variables

### Step 4: Deploy

Trigger a new deploy:
1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Clear cache and deploy site**

OR push to your GitHub repository:
```bash
git add .
git commit -m "Remove Supabase, use Firebase only"
git push origin main
```

## 🔍 Verification

After deployment completes:

1. Check build logs for any Supabase-related errors (there should be none)
2. Visit your deployed site
3. Open browser console - you should see:
   - ✅ Firebase App initialized
   - ✅ Firestore instance
   - ❌ NO Supabase errors

## 🐛 Troubleshooting

### Error: "Cannot find module '@supabase/supabase-js'"

**Solution:**
1. Clear Netlify build cache (Step 1 above)
2. Make sure `package.json` doesn't list `@supabase/supabase-js`
3. Redeploy

### Error: "Missing required Firebase environment variables"

**Solution:**
1. Add all Firebase environment variables in Netlify dashboard (Step 2 above)
2. Make sure variable names are EXACTLY as shown (including `VITE_` prefix)
3. Trigger a new deploy

### Error: "Firebase: Error (auth/invalid-api-key)"

**Solution:**
1. Verify Firebase environment variables are set in Netlify
2. Clear cache and redeploy
3. Check that you've set variables for **all build contexts** (production, deploy previews, branch deploys)

### Build succeeds but app shows black screen

**Solution:**
1. Open browser console to see errors
2. Usually means environment variables aren't set correctly
3. Verify all `VITE_FIREBASE_*` variables are set in Netlify
4. Clear browser cache and hard reload (Ctrl+Shift+R or Cmd+Shift+R)

## 📝 Quick Reference

### What's in the project now:
- ✅ Firebase (database + auth)
- ✅ Razorpay (payments)
- ✅ Vite + React
- ❌ NO Supabase
- ❌ NO serverless functions

### Required environment variables:
- 7 Firebase variables (all starting with `VITE_FIREBASE_`)
- 2 Razorpay variables (`VITE_RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`)

### Build command:
```
npm run build
```

### Publish directory:
```
dist
```

## 🎉 Success Indicators

Your deployment is successful when:
- ✅ Build completes without errors
- ✅ No Supabase-related errors in build logs
- ✅ Site loads without black screen
- ✅ Can place orders (they save to Firebase)
- ✅ Admin login works (Firebase Auth)
- ✅ Admin dashboard shows orders (from Firebase)
