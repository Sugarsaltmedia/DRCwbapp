import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBnkNDo_ENanWQ6mtYsnHPvcPqbSVYUZJU",
  authDomain: "drcapp-5b647.firebaseapp.com",
  databaseURL: "https://drcapp-5b647-default-rtdb.firebaseio.com/",
  projectId: "drcapp-5b647",
  storageBucket: "drcapp-5b647.firebasestorage.app",
  messagingSenderId: "533498616572",
  appId: "1:533498616572:web:678903a6bcd5e3726ed579",
  measurementId: "G-G3KL2V7DPC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const database = getDatabase(app);
export const auth = getAuth(app);
export default app;