// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwzHdFv504RawZFBsLbVfNx553EOR-5So",
  authDomain: "twitter-6a7d6.firebaseapp.com",
  projectId: "twitter-6a7d6",
  storageBucket: "twitter-6a7d6.appspot.com",
  messagingSenderId: "483095547346",
  appId: "1:483095547346:web:bdcd45498b48fe228fcc0b",
  measurementId: "G-26BDSNZ75V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
