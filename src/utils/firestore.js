import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc, updateDoc, getDoc } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBsfaYgSFUWRJhgr3CYZknX3p99vrKrbHw",
    authDomain: "fakestoreusers.firebaseapp.com",
    projectId: "fakestoreusers",
    storageBucket: "fakestoreusers.firebasestorage.app",
    messagingSenderId: "695980271971",
    appId: "1:695980271971:web:9b0272185610f51d734b56"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

