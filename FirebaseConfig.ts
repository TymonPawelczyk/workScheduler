// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPw_fdRWRGU-KB0wTKwvv1n-hayuU0aQA",
  authDomain: "workschedulerapp-e951e.firebaseapp.com",
  projectId: "workschedulerapp-e951e",
  storageBucket: "workschedulerapp-e951e.appspot.com",
  messagingSenderId: "219017719968",
  appId: "1:219017719968:web:ebd892e211cf58ffa3d9c5"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);