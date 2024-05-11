// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Attention Please add your firebase console config here
const firebaseConfig = {
  apiKey: "AIzaSyC8ZegoV7b3ijwsJ-TgQwtmikQek3VZk7w",
  authDomain: "quanta-iq.firebaseapp.com",
  projectId: "quanta-iq",
  storageBucket: "quanta-iq.appspot.com",
  messagingSenderId: "872699300736",
  appId: "1:872699300736:web:026355ec07e81b2f4c8f65",
  measurementId: "G-RBG41QBN8R"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);