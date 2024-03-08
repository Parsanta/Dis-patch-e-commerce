// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeiygB-vK7bgTis8wjBuMXQtDTsHwXQvs",
  authDomain: "dis-patch-62b32.firebaseapp.com",
  projectId: "dis-patch-62b32",
  storageBucket: "dis-patch-62b32.appspot.com",
  messagingSenderId: "1057536158716",
  appId: "1:1057536158716:web:b2f5dc676b619964b46079"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };