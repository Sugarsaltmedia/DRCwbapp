import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Debug Firebase configuration (without exposing sensitive values)
console.log('🔧 Firebase Config Status:', {
  projectId: firebaseConfig.projectId || 'Missing VITE_FIREBASE_PROJECT_ID',
  authDomain: firebaseConfig.authDomain || 'Missing VITE_FIREBASE_AUTH_DOMAIN',
  hasApiKey: !!firebaseConfig.apiKey,
  hasAppId: !!firebaseConfig.appId
});

// Validate required environment variables
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN', 
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
];

const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);
if (missingVars.length > 0) {
  console.error('❌ Missing required Firebase environment variables:', missingVars);
  console.error('Please add these to your .env file and Netlify environment variables');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log('✅ Firebase App initialized');

// Only initialize analytics in production and when supported
export const analytics = typeof window !== 'undefined' && 
  window.location.hostname !== 'localhost' && 
  firebaseConfig.measurementId
  ? getAnalytics(app) 
  : null;

export const firestore = getFirestore(app);
export const auth = getAuth(app);

// Test Firestore connection
console.log('🔥 Firestore instance:', firestore);
console.log('📊 Firestore app initialized');

export default app;