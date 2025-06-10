import { initializeApp } from "firebase/app";
// import { getAuth } from 'firebase/auth';
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";

import {
  serverTimestamp
} from "firebase/firestore";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyB4lJJ5_XDja-x5GK-Kg4_VLHXRFTCOl_M",
  authDomain: "education-app-511b6.firebaseapp.com",
  projectId: "education-app-511b6",
  storageBucket: "education-app-511b6.firebasestorage.app",
  messagingSenderId: "888024261863",
  appId: "1:888024261863:web:49148daa748ddcc4fc2e42"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
const messagesRef = collection(db, "messages");

export { db, messagesRef };

export const signIn = () => signInAnonymously(auth);
export const onAuth = (cb) => onAuthStateChanged(auth, cb);

// Firestore helpers
export const userMessagesRef = (uid) => collection(db, "users", uid, "messages");
export { addDoc, query, orderBy, onSnapshot, serverTimestamp };
// ----------------------------

