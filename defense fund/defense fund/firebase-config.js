// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCRX9Na3ApjoGfJrZ93WET8ZeUTvjwRX6M",
  authDomain: "defence-fund-blockchain.firebaseapp.com",
  projectId: "defence-fund-blockchain",
  storageBucket: "defence-fund-blockchain.appspot.com",
  messagingSenderId: "558788281694",
  appId: "1:558788281694:web:b92925895dd69f3299bbcf",
  measurementId: "G-HDYQYXPV2D"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// Example: Adding a donation with test mode flag
const authInstance = getAuth();
const currentUser = authInstance.currentUser;

if (currentUser) {
  const donationRef = collection(db, "donations");
  await addDoc(donationRef, {
    uid: currentUser.uid,
    email: currentUser.email,
    name: currentUser.displayName || "Anonymous",
    amount: donationAmount, // replace with real donation amount
    transactionId: "TXN_" + Math.random().toString(36).substring(2, 10),
    message: "Proud to support our defense 💪",
    mode: "test", // 👈 this flags it as test data
    date: serverTimestamp()
  });
}