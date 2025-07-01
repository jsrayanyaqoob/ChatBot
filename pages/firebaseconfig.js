import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js';
import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyBlHiEte7wAH2AFLN6Q3ihCF-VQu4uYFG0",
  authDomain: "chatbot-f9f02.firebaseapp.com",
  projectId: "chatbot-f9f02",
  storageBucket: "chatbot-f9f02.firebasestorage.app",
  messagingSenderId: "371050440319",
  appId: "1:371050440319:web:4a4cc6a51618ef320b014a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);