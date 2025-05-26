// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgPmeXUxDag0KyJNWibsJ49gM8WqpZg10",
  authDomain: "imbueapp-9ad07.firebaseapp.com",
  projectId: "imbueapp-9ad07",
  storageBucket: "imbueapp-9ad07.firebasestorage.app",
  messagingSenderId: "699411947241",
  appId: "1:699411947241:web:8ce60c6593e3b81fb45a78",
  measurementId: "G-D3TJVFS1QF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);