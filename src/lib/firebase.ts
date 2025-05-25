
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// Replace with your own Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDEMOKEYHERE",
  authDomain: "finance-dashboard-demo.firebaseapp.com",
  projectId: "finance-dashboard-demo",
  storageBucket: "finance-dashboard-demo.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnopqrstuv"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Helper to get current user ID
export const getCurrentUserId = () => {
  return auth.currentUser?.uid || 'demo-user';
};
