// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjuW5Gbgrw1vj8QZjwtLEcpxEEnuJI9JU",
  authDomain: "eume-5b8c7.firebaseapp.com",
  databaseURL: "https://eume-5b8c7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "eume-5b8c7",
  storageBucket: "eume-5b8c7.appspot.com",
  messagingSenderId: "336259856368",
  appId: "1:336259856368:web:f560aa24acd945ef68cf35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);

export { app };