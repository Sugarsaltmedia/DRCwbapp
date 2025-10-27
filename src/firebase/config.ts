import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCy9FAmlflCY2yue2ebK2H-7FsNqkgaeJA",
  authDomain: "drcmovies-1dc9c.firebaseapp.com",
  projectId: "drcmovies-1dc9c",
  storageBucket: "drcmovies-1dc9c.firebasestorage.app",
  messagingSenderId: "64082360151",
  appId: "1:64082360151:web:ddf3b9107274aad5dff012",
  measurementId: "G-GV5DXMVE7L"
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