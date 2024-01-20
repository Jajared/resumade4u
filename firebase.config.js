// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWpyJhvz8eINBtuMfoQ92lGU05TGqMmsc",
  authDomain: "resumade4u-2ea0a.firebaseapp.com",
  projectId: "resumade4u-2ea0a",
  storageBucket: "resumade4u-2ea0a.appspot.com",
  messagingSenderId: "299280828548",
  appId: "1:299280828548:web:78b26d325f48fb645f5ad1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
