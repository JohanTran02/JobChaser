// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

    apiKey: "AIzaSyC2z_56SLi4ldXykDBmbv1v0P2JVf6V7tY",

    authDomain: "jobchaser-6a2ff.firebaseapp.com",

    projectId: "jobchaser-6a2ff",

    storageBucket: "jobchaser-6a2ff.appspot.com",

    messagingSenderId: "560039105729",

    appId: "1:560039105729:web:8e66f1355e7b0567b2f040",

    measurementId: "G-042H4H0RRD"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };