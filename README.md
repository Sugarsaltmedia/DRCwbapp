# DRC Cinema Hall - Food Ordering Platform

## Features
A modern food ordering platform for cinema halls built with React, TypeScript, and Netlify Functions.
- 🍿 Complete menu with 11+ categories
- 🛒 Real-time cart management
- 💳 Secure payment processing with Instamojo
- 📱 Responsive design for all devices
- 👨‍💼 Admin dashboard for order management
- 🔥 Firebase integration for data storage
- ⚡ Serverless backend with Netlify Functions
## Setup Instructions
### 1. Environment Variables
Create a `.env` file in the root directory with the following variables:
```env
# Instamojo API Credentials (Test Environment)
INSTAMOJO_API_KEY=your_instamojo_api_key
INSTAMOJO_AUTH_TOKEN=your_instamojo_auth_token
INSTAMOJO_SALT=your_instamojo_salt
# Supabase Configuration (for webhook function)
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```
### 2. Netlify Deployment
1. Connect your repository to Netlify
2. Set the build command to `npm run build`
3. Set the publish directory to `dist`
4. Add all environment variables in Netlify's dashboard under Site settings > Environment variables
### 3. Instamojo Configuration
1. Create an Instamojo account
2. Get your API credentials from the developer section
3. Configure the webhook URL in Instamojo dashboard to point to: `https://your-site.netlify.app/.netlify/functions/payment-webhook`
### 4. Firebase Setup
1. Create a Firebase project
2. Enable Firestore database
3. Update the Firebase configuration in `src/firebase/config.ts`
4. Set up authentication for admin access
## Development
```bash
# Install dependencies
npm install
# Start development server
npm run dev
# Build for production
npm run build
```
## Payment Flow
1. User adds items to cart and proceeds to checkout
2. Frontend calls `/.netlify/functions/create-payment` with order details
3. Netlify Function creates payment request with Instamojo
4. User is redirected to Instamojo payment page
5. After payment, Instamojo sends webhook to `/.netlify/functions/payment-webhook`
6. Webhook verifies payment and updates order status
7. User is redirected back to success page
## Admin Features
- View all orders in real-time
- Update order status (ongoing/completed)
- Delete orders
- View revenue statistics
- Secure authentication with Firebase Auth
## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Netlify Functions (Node.js)
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Payment**: Instamojo
- **Hosting**: Netlify