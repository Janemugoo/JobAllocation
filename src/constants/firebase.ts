// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOyHMzb-OMXS2DzbXZFlJUy3orMpaj6n4",
  authDomain: "joballo-5f1c0.firebaseapp.com",
  projectId: "joballo-5f1c0",
  storageBucket: "joballo-5f1c0.appspot.com",
  messagingSenderId: "334538025717",
  appId: "1:334538025717:web:4916fce6891e979340b3bc",
  measurementId: "G-PWBC4PV36J"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const initFirestore = ()=> {
  return getFirestore(app) 
}
