import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWImBOfLGZ8c0epLKkuuuSMYgpW7sSfKs",
  authDomain: "shoesnarian.firebaseapp.com",
  projectId: "shoesnarian",
  storageBucket: "shoesnarian.appspot.com",
  messagingSenderId: "1071694224892",
  appId: "1:1071694224892:web:b885414efb4ec1ee01e679",
  measurementId: "G-8PXP68LZNC",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const db = getFirestore();
