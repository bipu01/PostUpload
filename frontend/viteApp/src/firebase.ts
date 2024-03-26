// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoZzXDAgsQMDURZYcVt5OLjvWykBIXHQU",
  authDomain: "school-30c47.firebaseapp.com",
  projectId: "school-30c47",
  storageBucket: "school-30c47.appspot.com",
  messagingSenderId: "784931010927",
  appId: "1:784931010927:web:a64cb463791babb56a509a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)