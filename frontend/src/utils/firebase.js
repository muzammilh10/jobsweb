// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD01o2wmcezHzKYgu3ku7tg9Ubxw3blc9s",
  authDomain: "finaldemo-75ede.firebaseapp.com",
  projectId: "finaldemo-75ede",
  storageBucket: "finaldemo-75ede.appspot.com",
  messagingSenderId: "940518589804",
  appId: "1:940518589804:web:66910b0a888f4620b39f49",
  measurementId: "G-TJTH16VGVC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
