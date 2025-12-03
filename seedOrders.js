// seedOrders.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";

// 1️⃣ Initialize Firebase
const firebaseConfig = {
  apiKey:  "AIzaSyCy9FAmlflCY2yue2ebK2H-7FsNqkgaeJA",
  authDomain: "drcmovies-1dc9c.firebaseapp.com",
  projectId: "drcmovies-1dc9c",
  storageBucket: "drcmovies-1dc9c.firebasestorage.app",
  messagingSenderId: "64082360151",
  appId: "1:64082360151:web:ddf3b9107274aad5dff012",
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID


};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 2️⃣ Mock orders
const orders = [
  {
    customerName: "John Doe",
    customerPhone: "+91 9876543210",
    screenNumber: 2,
    rowSelection: "C",
    seatNumber: 15,
    items: [
      { id: "popcorn-butter", name: "Butter Popcorn", category: "POPCORN TIME", price: 150, quantity: 2, selectedSize: "Large" },
      { id: "coke", name: "Coke", category: "SODAS & SIPS", price: 120, quantity: 1, selectedSize: null }
    ],
    status: "ongoing",
    total: 420,
    timestamp: Timestamp.fromDate(new Date())
  },
  {
    customerName: "Sarah Smith",
    customerPhone: "+91 8765432109",
    screenNumber: 1,
    rowSelection: "A",
    seatNumber: 8,
    items: [
      { id: "veg-burger", name: "Veg Burger", category: "ROLLS / SANDWICHES / BURGERS / PIZZA", price: 130, quantity: 1, selectedSize: null },
      { id: "cold-coffee", name: "Cold Coffee", category: "MILKSHAKES", price: 140, quantity: 1, selectedSize: null }
    ],
    status: "completed",
    total: 270,
    timestamp: Timestamp.fromDate(new Date())
  },
  {
    customerName: "Mike Johnson",
    customerPhone: "+91 7654321098",
    screenNumber: 3,
    rowSelection: "D",
    seatNumber: 22,
    items: [
      { id: "nachos", name: "Nachos W/Dip", category: "CRUNCHY BITES", price: 150, quantity: 1, selectedSize: null },
      { id: "vanilla-shake", name: "Vanilla Shake", category: "MILKSHAKES", price: 140, quantity: 2, selectedSize: null }
    ],
    status: "ongoing",
    total: 430,
    timestamp: Timestamp.fromDate(new Date())
  }
];

// 3️⃣ Seed function
async function seedOrders() {
  const ordersRef = collection(db, "orders");
  for (const order of orders) {
    await addDoc(ordersRef, order);
    console.log(`✅ Order for ${order.customerName} added`);
  }
  console.log("🎉 All orders seeded!");
}

// 4️⃣ Run
seedOrders().catch(console.error);

