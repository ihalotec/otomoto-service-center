
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCy4A41NlMfiqsmqvwoyLIxeNzGwuc-Xbo",
  authDomain: "bengkelmobilmotor.firebaseapp.com",
  projectId: "bengkelmobilmotor",
  storageBucket: "bengkelmobilmotor.firebasestorage.app",
  messagingSenderId: "1098695118266",
  appId: "1:1098695118266:web:a9b7d38379cfea65682183"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
