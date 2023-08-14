// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAebIHsdhXZHfgDVEiMf7h_mReYUavUmg",
  authDomain: "recipe-app-449d4.firebaseapp.com",
  databaseURL: "https://recipe-app-449d4-default-rtdb.firebaseio.com",
  projectId: "recipe-app-449d4",
  storageBucket: "recipe-app-449d4.appspot.com",
  messagingSenderId: "755530267248",
  appId: "1:755530267248:web:f86411bfc81273e550d2b5",
  measurementId: "G-41122D2CH3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
