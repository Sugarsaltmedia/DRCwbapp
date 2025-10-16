# DRC Cinema Hall - Food Ordering Platform

## Features
A modern, production-ready food ordering platform for cinema halls built with React, TypeScript, and Netlify Functions.

### 🍿 **Core Features**
- **Complete Menu System**: 100+ items across 11+ categories (Popcorn, Beverages, Snacks, Combos, etc.)
- **Real-time Cart Management**: Add, remove, and modify items with live total calculations
- **Seat-side Delivery**: Direct delivery to cinema seats with screen, row, and seat selection
- **Secure Payment Processing**: Integrated with Instamojo for safe online transactions
- **Order Tracking**: Real-time order status updates and preparation tracking

### 📱 **User Experience**
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Modern UI/UX**: Beautiful animations with Framer Motion and Tailwind CSS
- **Intuitive Navigation**: Easy-to-use category browsing and search functionality
- **Size Variants**: Multiple size options for applicable items (Small/Large)
- **Customer Information**: Secure collection of contact details and seat preferences

### 👨‍💼 **Admin Dashboard**
- **Real-time Order Management**: View all orders with live updates via Firebase
- **Order Status Control**: Update orders from 'ongoing' to 'completed'
- **Revenue Analytics**: Track total orders, ongoing orders, and revenue statistics
- **Customer Details**: Access to customer information and seat assignments
- **Secure Authentication**: Firebase Auth with email/password login
- **Order History**: Complete order tracking with timestamps and details

### 🔥 **Backend & Infrastructure**
- **Firebase Integration**: Real-time database with Firestore for order storage
- **Serverless Functions**: Netlify Functions for payment processing and webhooks
- **Payment Gateway**: Instamojo integration with webhook verification
- **Data Security**: Encrypted data transmission and secure API endpoints
- **Cloud Hosting**: Deployed on Netlify with automatic builds

### 📋 **Legal & Compliance**
- **Comprehensive Privacy Policy**: GDPR-compliant data protection policies
- **Terms & Conditions**: Detailed service terms with refund and cancellation policies
- **Business Information**: Complete contact details for V H ENTERPRISES
- **Delivery Policies**: Clear timelines (8-25 minutes) and service expectations
- **Pricing Transparency**: Full service pricing (₹40-₹340 range) with tax inclusion

### 🛡️ **Security Features**
- **SSL Encryption**: All data transmission secured with HTTPS
- **Payment Security**: PCI-compliant payment processing via Instamojo
- **Admin Access Control**: Restricted dashboard access with authentication
- **Data Protection**: Firebase security rules and access controls
- **Webhook Verification**: Secure payment confirmation with MAC verification

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
1. Create an Instamojo account at [instamojo.com](https://instamojo.com)
2. Get your API credentials from the developer section
3. Configure the webhook URL in Instamojo dashboard to point to: `https://your-site.netlify.app/.netlify/functions/payment-webhook`

### 4. Firebase Setup
1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Enable Firestore database with the following collections:
   - `orders`: For storing customer orders
3. Enable Authentication with Email/Password provider
4. Update the Firebase configuration in `src/firebase/config.ts`
5. Set up Firestore security rules for admin access

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Payment Flow

1. **Order Creation**: User adds items to cart and proceeds to checkout
2. **Customer Details**: User provides name, phone, and seat information
3. **Payment Request**: Frontend calls `/.netlify/functions/create-payment` with order details
4. **Instamojo Integration**: Netlify Function creates payment request with Instamojo
5. **Payment Processing**: User is redirected to Instamojo payment page
6. **Webhook Verification**: Instamojo sends webhook to `/.netlify/functions/payment-webhook`
7. **Order Confirmation**: Webhook verifies payment and updates order status
8. **Success Redirect**: User is redirected back to success page with order confirmation

## Admin Features

### Dashboard Access
- Secure login with Firebase Authentication
- Real-time order monitoring with live updates
- Revenue and performance analytics

### Order Management
- View all orders with customer and seat details
- Update order status (ongoing → completed)
- Delete orders with confirmation prompts
- Filter orders by status (all, ongoing, completed)

### Analytics & Reporting
- Total orders count and revenue tracking
- Real-time status distribution (ongoing vs completed)
- Order history with timestamps and customer information

## Menu Categories

1. **🍿 Popcorn Time** (11 varieties) - ₹130-₹340
2. **🥤 Sodas & Sips** (3 options) - ₹50-₹120
3. **🥨 Crunchy Bites** (4 items) - ₹100-₹160
4. **🍔 Combos** (2 meal deals) - ₹220-₹230
5. **🌯 Mains** (15 items) - ₹40-₹150
6. **🍿 Chaats** (10 varieties) - ₹70-₹100
7. **🌽 Sweet Corn** (4 flavors) - ₹100
8. **🍫 Candy Bars** (6 brands) - ₹40 each
9. **🥤 Milkshakes** (14 flavors) - ₹140-₹150
10. **☕ Hot Steamers** (5 beverages) - ₹20-₹70
11. **🍰 Desserts** (4 options) - ₹80-₹130

## Tech Stack

### Frontend
- **React 18** with TypeScript for type safety
- **Tailwind CSS** for responsive styling
- **Framer Motion** for smooth animations
- **Lucide React** for consistent iconography
- **Vite** for fast development and building

### Backend
- **Netlify Functions** (Node.js serverless)
- **Firebase Firestore** for real-time database
- **Firebase Auth** for admin authentication
- **Instamojo API** for payment processing

### Hosting & Deployment
- **Netlify** for frontend hosting and serverless functions
- **Firebase** for database and authentication services
- **Custom Domain** support with SSL certificates

## Business Information

**V H ENTERPRISES**
- 📞 Phone: +91 98765-43210 (India)
- 📧 Email: info@drccinema.com
- 📍 Address: DRC Cinema Hall, Main Street, India
- 🕒 Business Hours: 10:00 AM - 11:00 PM (All Days)

## Support & Documentation

- **Privacy Policy**: Comprehensive data protection and user rights
- **Terms of Service**: Detailed service terms and conditions
- **Refund Policy**: Clear refund and cancellation procedures
- **Delivery Policy**: Service timelines and expectations
- **Contact Support**: 24-48 hour response time via email

## License

© 2025 DRC Cinema Hall. All rights reserved.

---

*Built with ❤️ for the modern cinema experience*