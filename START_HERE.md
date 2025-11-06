# 🚀 START HERE - Fix Your Netlify Deployment

## The Problem You're Seeing

Your Netlify site shows a **black screen** with Firebase errors because environment variables aren't set in Netlify.

## The Solution (Simple 3-Step Process)

### 📍 Step 1: Open Netlify Settings

1. Go to: **https://app.netlify.com**
2. Find and click your site: **drccafe**
3. Click **"Site settings"** in the left sidebar
4. Click **"Environment variables"** (under "Build & deploy" section)

### 📝 Step 2: Add 9 Environment Variables

Click the **"Add a variable"** button and add each of these:

**Tip**: Open this file side-by-side with Netlify so you can copy-paste easily!

#### Firebase Variables (7 total):

| # | Variable Name | Value to Copy |
|---|---------------|---------------|
| 1 | `VITE_FIREBASE_API_KEY` | `AIzaSyCy9FAmlflCY2yue2ebK2H-7FsNqkgaeJA` |
| 2 | `VITE_FIREBASE_AUTH_DOMAIN` | `drcmovies-1dc9c.firebaseapp.com` |
| 3 | `VITE_FIREBASE_PROJECT_ID` | `drcmovies-1dc9c` |
| 4 | `VITE_FIREBASE_STORAGE_BUCKET` | `drcmovies-1dc9c.firebasestorage.app` |
| 5 | `VITE_FIREBASE_MESSAGING_SENDER_ID` | `64082360151` |
| 6 | `VITE_FIREBASE_APP_ID` | `1:64082360151:web:ddf3b9107274aad5dff012` |
| 7 | `VITE_FIREBASE_MEASUREMENT_ID` | `G-GV5DXMVE7L` |

#### Razorpay Variables (2 total):

| # | Variable Name | Value to Copy |
|---|---------------|---------------|
| 8 | `VITE_RAZORPAY_KEY_ID` | `rzp_live_RYS8jZKMNTvoe6` |
| 9 | `RAZORPAY_KEY_SECRET` | `7X1gyVYuayETVi7MBS4xO92f` |

**Important**: For EACH variable, make sure to:
- ✅ Select ALL scopes (check all 3 boxes):
  - ☑️ Production
  - ☑️ Deploy previews
  - ☑️ Branch deploys

### 🔄 Step 3: Clear Cache & Redeploy

1. Go to the **"Deploys"** tab (top of page)
2. Click the **"Trigger deploy"** dropdown button
3. Select **"Clear cache and deploy site"**
4. Wait 2-3 minutes for the build to complete

## ✅ How to Know It Worked

After the deploy finishes:
1. Visit your site URL
2. You should see your food menu (not a black screen!)
3. You can browse items, add to cart, and checkout

## 🆘 Still Having Issues?

### Check These:

1. **Count your variables**: Did you add all 9? (Not 8, not 7 - exactly 9!)
2. **Check spelling**: Variable names must match EXACTLY (case-sensitive!)
3. **No quotes**: When pasting values, don't add quotes around them
4. **All scopes checked**: Each variable should have all 3 scopes selected
5. **Cache cleared**: Make sure you selected "Clear cache and deploy site" (not just "Deploy site")

### Quick Debug:

Open your deployed site, press **F12** to open console:
- ❌ If you see "Missing required Firebase environment variables" → Variables not set correctly
- ✅ If you see "Firebase App initialized" → It's working!

## 📚 Additional Resources

- **FIX_NETLIFY_DEPLOYMENT.md** - Detailed troubleshooting guide
- **NETLIFY_ENV_SETUP_GUIDE.md** - Step-by-step with more details
- **DEPLOYMENT_CHECKLIST.md** - Complete deployment checklist

## 🎯 Quick Summary

**What you're doing**: Adding 9 environment variables to Netlify dashboard
**Why**: Your local `.env` file doesn't upload to Netlify automatically
**How long**: 5-10 minutes to add variables + 2-3 minutes for deploy
**Result**: Working food ordering site with Firebase database

---

**That's it!** Follow these 3 steps and your site will work. The key is adding those 9 variables in the Netlify dashboard. 🎉
