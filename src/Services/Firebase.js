import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyCZ6Wqm5rrDpCLMdPGyQ6mZ6BjrRabOJto",
  authDomain: "ecommerce-be241.firebaseapp.com",
  projectId: "ecommerce-be241",
  storageBucket: "ecommerce-be241.appspot.com",
  messagingSenderId: "136225244732",
  appId: "1:136225244732:web:3d105993aa77e4c643e539",
  measurementId: "G-01Q3SKTWGS"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const fs = getFirestore(app);