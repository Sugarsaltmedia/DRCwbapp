# Netlify Environment Variables Setup for Firebase

This guide explains how to set up environment variables in Netlify for your Firebase application.

## Option 1: Using the Netlify Dashboard (Recommended)

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add the following variables:

### Firebase Configuration

| Variable Name | Value |
|--------------|-------|
| `VITE_FIREBASE_API_KEY` | `AIzaSyCy9FAmlflCY2yue2ebK2H-7FsNqkgaeJA` |
| `VITE_FIREBASE_AUTH_DOMAIN` | `drcmovies-1dc9c.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | `drcmovies-1dc9c` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `drcmovies-1dc9c.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `64082360151` |
| `VITE_FIREBASE_APP_ID` | `1:64082360151:web:ddf3b9107274aad5dff012` |
| `VITE_FIREBASE_MEASUREMENT_ID` | `G-GV5DXMVE7L` |

### Razorpay Configuration

| Variable Name | Value |
|--------------|-------|
| `VITE_RAZORPAY_KEY_ID` | `rzp_live_RYS8jZKMNTvoe6` |
| `RAZORPAY_KEY_SECRET` | `7X1gyVYuayETVi7MBS4xO92f` |

4. Click **Save** after adding all variables
5. **Trigger a new deploy** for the changes to take effect

## Option 2: Using the Netlify CLI

If you have Netlify CLI installed, you can use the provided script:

```bash
# First, find your site ID
netlify sites:list

# Run the setup script with your site ID
./scripts/set-netlify-env.sh YOUR_SITE_ID
```

If you don't have Netlify CLI installed:

```bash
npm install -g netlify-cli
netlify login
```

## Verifying the Setup

After setting the environment variables:

1. Go to your Netlify dashboard
2. Navigate to **Deploys** → **Trigger deploy** → **Deploy site**
3. Wait for the build to complete
4. Check your deployed site - the Firebase errors should be resolved

## Troubleshooting

### "Missing required Firebase environment variables" error

This means the environment variables are not set in Netlify. Follow Option 1 or Option 2 above.

### "Firebase: Error (auth/invalid-api-key)" error

This can happen if:
- Environment variables are not set in Netlify
- You need to trigger a new deploy after setting the variables
- There's a typo in one of the variable names or values

### Variables are set but still getting errors

1. Make sure you've triggered a **new deploy** after setting the variables
2. Check that all variable names start with `VITE_` (except `RAZORPAY_KEY_SECRET`)
3. Verify there are no extra spaces in the variable values
4. Clear your browser cache and hard reload the page

## Security Note

⚠️ **Important**: The Firebase API key shown here is safe to expose in client-side code. Firebase uses security rules to protect your data, not the API key itself. However, make sure your Firebase security rules are properly configured!

The `RAZORPAY_KEY_SECRET` should be kept secret and only used in server-side functions.
