// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";

import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyDVmAiKoIyh3GqGeSpCtwvb46Cl6m-SN64",
    authDomain: "rajvifirebase.firebaseapp.com",
    databaseURL: "https://rajvifirebase-default-rtdb.firebaseio.com",
    projectId: "rajvifirebase",
    storageBucket: "rajvifirebase.appspot.com",
    messagingSenderId: "860133515497",
    appId: "1:860133515497:web:2c37bd2328046a32501078",
    measurementId: "G-ZLG46RJ1E3"
};

firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export { database, app };

export const auth = firebase.auth();