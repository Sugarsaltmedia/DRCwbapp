import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBnkNDo_ENanWQ6mtYsnHPvcPqbSVYUZJU",
  authDomain: "drcapp-5b647.firebaseapp.com",
  projectId: "drcapp-5b647",
  storageBucket: "drcapp-5b647.firebasestorage.app",
  messagingSenderId: "533498616572",
  appId: "1:533498616572:web:678903a6bcd5e3726ed579",
  measurementId: "G-G3KL2V7DPC"
};

// Debug Firebase configuration
console.log('🔧 Firebase Config:', {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain,
  storageBucket: firebaseConfig.storageBucket
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log('✅ Firebase App initialized:', app.name);

export const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);

// Test Firestore connection
console.log('🔥 Firestore instance:', firestore);
console.log('📊 Firestore app:', firestore.app.name);

export default app;