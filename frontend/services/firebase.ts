// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Attention Please add your firebase console config here
const firebaseConfig = {
  apiKey: "AIzaSyD1CsmvZaiipwOY_xVh1uY-6QMs-DSyxFE",
  authDomain: "fintac-boilerplate.firebaseapp.com",
  projectId: "fintac-boilerplate",
  storageBucket: "fintac-boilerplate.appspot.com",
  messagingSenderId: "733486162666",
  appId: "1:733486162666:web:a389df4dd48fea8fed2d93",
  measurementId: "G-DN43WMTPW3"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);