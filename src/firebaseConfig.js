import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCXOPew9No4TrOhRzXQGj1eQvq2jfLIUdU",
    authDomain: "moneytracker-60bdf.firebaseapp.com",
    projectId: "moneytracker-60bdf",
    storageBucket: "moneytracker-60bdf.appspot.com",
    messagingSenderId: "224930779978",
    appId: "1:224930779978:web:e0cf300643f67391e267b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);