import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMPPuc8DLr1LNq4PpkTL2ztUmvbm2kufE",
  authDomain: "datumprikker-ceccd.firebaseapp.com",
  projectId: "datumprikker-ceccd",
  storageBucket: "datumprikker-ceccd.appspot.com",
  messagingSenderId: "162944613143",
  appId: "1:162944613143:web:409f47d96ac087821b5552",
  measurementId: "G-R0BZ6PX4X7",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
