import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBL3KPno0s4TUxLTLnrcC62LIxZfETbOfE",
  authDomain: "drcmovies-ab48d.firebaseapp.com",
  projectId: "drcmovies-ab48d",
  storageBucket: "drcmovies-ab48d.firebasestorage.app",
  messagingSenderId: "236169619256",
  appId: "1:236169619256:web:2558c4bc6ce9e05e5dc3cd",
  measurementId: "G-ME1YWPKQ64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const database = getDatabase(app);
export default app;