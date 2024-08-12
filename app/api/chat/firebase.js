// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut as firebaseSignOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBo8FUaQNL3b_qp-t9Qc6wT4xvWjqRuFas",
  authDomain: "customer-chat-support-19334.firebaseapp.com",
  projectId: "customer-chat-support-19334",
  storageBucket: "customer-chat-support-19334.appspot.com",
  messagingSenderId: "575203041639",
  appId: "1:575203041639:web:1c3ff088cb2e1ec4104fc2",
  measurementId: "G-FWVJQJXXGY"
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { app, firestore ,auth}


// firebase.js or firebase.ts



const auth = getAuth(app);

export const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
};

export const signOut = () => {
    return firebaseSignOut(auth);
};