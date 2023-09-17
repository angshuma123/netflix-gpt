// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkqpt4iAi52JY1gIEqbRKPpgsvU2MoPF8",
  authDomain: "netflixgpt-6788e.firebaseapp.com",
  projectId: "netflixgpt-6788e",
  storageBucket: "netflixgpt-6788e.appspot.com",
  messagingSenderId: "834414467140",
  appId: "1:834414467140:web:5a0394827a1775bd8f0411",
  measurementId: "G-T610QGVHZD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);