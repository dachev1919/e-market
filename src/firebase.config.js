import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDFxNtefTjIl5Q77nU6EA6xGJtxMstGIHg",
  authDomain: "e-commerce-326d6.firebaseapp.com",
  projectId: "e-commerce-326d6",
  storageBucket: "e-commerce-326d6.appspot.com",
  messagingSenderId: "327460947061",
  appId: "1:327460947061:web:4a104fbab8d131fa50a43c",
  measurementId: "G-Z1CE4DHVLN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;