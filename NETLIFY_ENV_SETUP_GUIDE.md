# 🚨 FIX: Netlify Environment Variables Not Set

## The Problem

Your site is deployed but showing Firebase errors because **Netlify doesn't have the environment variables**. The `.env` file only works locally - Netlify needs them set separately.

## The Solution: Set Variables in Netlify Dashboard

### Step 1: Access Environment Variables

1. Go to: https://app.netlify.com
2. Click on your site: **drccafe** (or your site name)
3. Click **Site settings** (left sidebar)
4. Click **Environment variables** (under "Build & deploy")
5. You'll see a page with "Add a variable" or "Edit variables"

### Step 2: Add Each Variable

Click **"Add a variable"** or **"Add a single variable"** and add these ONE BY ONE:

#### Firebase Variables (7 total)

| Key (Variable Name) | Value | Scopes |
|---------------------|-------|--------|
| `VITE_FIREBASE_API_KEY` | `AIzaSyCy9FAmlflCY2yue2ebK2H-7FsNqkgaeJA` | ☑️ Production ☑️ Deploy previews ☑️ Branch deploys |
| `VITE_FIREBASE_AUTH_DOMAIN` | `drcmovies-1dc9c.firebaseapp.com` | ☑️ Production ☑️ Deploy previews ☑️ Branch deploys |
| `VITE_FIREBASE_PROJECT_ID` | `drcmovies-1dc9c` | ☑️ Production ☑️ Deploy previews ☑️ Branch deploys |
| `VITE_FIREBASE_STORAGE_BUCKET` | `drcmovies-1dc9c.firebasestorage.app` | ☑️ Production ☑️ Deploy previews ☑️ Branch deploys |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `64082360151` | ☑️ Production ☑️ Deploy previews ☑️ Branch deploys |
| `VITE_FIREBASE_APP_ID` | `1:64082360151:web:ddf3b9107274aad5dff012` | ☑️ Production ☑️ Deploy previews ☑️ Branch deploys |
| `VITE_FIREBASE_MEASUREMENT_ID` | `G-GV5DXMVE7L` | ☑️ Production ☑️ Deploy previews ☑️ Branch deploys |

#### Razorpay Variables (2 total)

| Key (Variable Name) | Value | Scopes |
|---------------------|-------|--------|
| `VITE_RAZORPAY_KEY_ID` | `rzp_live_RYS8jZKMNTvoe6` | ☑️ Production ☑️ Deploy previews ☑️ Branch deploys |
| `RAZORPAY_KEY_SECRET` | `7X1gyVYuayETVi7MBS4xO92f` | ☑️ Production ☑️ Deploy previews ☑️ Branch deploys |

### Step 3: Important Details

✅ **Check ALL scopes** for each variable:
   - Production
   - Deploy previews
   - Branch deploys

✅ **Copy-paste exactly** - no extra spaces or quotes

✅ **Variable names MUST start with `VITE_`** (except RAZORPAY_KEY_SECRET)

### Step 4: Delete Old Supabase Variables (If Present)

If you see these variables, **DELETE THEM**:
- ❌ `VITE_SUPABASE_URL`
- ❌ `VITE_SUPABASE_ANON_KEY`
- ❌ `SUPABASE_SERVICE_ROLE_KEY`

### Step 5: Clear Cache and Deploy

After adding all variables:

1. Go to **Deploys** tab
2. Click **Trigger deploy** dropdown
3. Select **"Clear cache and deploy site"**
4. Wait for the build to complete (2-3 minutes)

## Visual Guide

### How to Add a Variable:

```
1. Click "Add a variable" button
2. Fill in:
   Key: VITE_FIREBASE_API_KEY
   Value: AIzaSyCy9FAmlflCY2yue2ebK2H-7FsNqkgaeJA
   Scopes: ☑️ All (Production, Deploy previews, Branch deploys)
3. Click "Create variable"
4. Repeat for all 9 variables
```

## Verification

After deploying, your site should:
- ✅ Load without black screen
- ✅ Show menu items
- ✅ Allow adding items to cart
- ✅ Process payments
- ✅ Admin login works

If still showing errors:
1. Check browser console for specific error
2. Verify ALL 9 variables are set (not 8, not 7 - exactly 9!)
3. Make sure variable names match EXACTLY (case-sensitive!)
4. Try clearing browser cache (Ctrl+Shift+R or Cmd+Shift+R)

## Quick Checklist

Before redeploying, verify:
- [ ] All 7 Firebase variables added
- [ ] All 2 Razorpay variables added
- [ ] Total of 9 variables
- [ ] All variables have "Production" scope checked
- [ ] Cleared Netlify build cache
- [ ] Deleted any old Supabase variables

---

**Note**: Environment variables in Netlify are NOT the same as your local `.env` file. You must set them in the Netlify dashboard for them to work in production.
