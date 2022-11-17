// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUzIpldcHz3JqggrCG9fz2nOdVRRD-neY",
  authDomain: "assigment-help-ke.firebaseapp.com",
  projectId: "assigment-help-ke",
  storageBucket: "assigment-help-ke.appspot.com",
  messagingSenderId: "455280361141",
  appId: "1:455280361141:web:93ed3f032c0542769848fc",
  measurementId: "G-L20EF43SSH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);



export {
    app,
    db,
    // analytics,
    auth
}