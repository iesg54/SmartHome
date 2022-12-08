// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBi67S9L1PCJf85mzpaIwyWIsiC8X0pKW8",
    authDomain: "smarthome-f065a.firebaseapp.com",
    projectId: "smarthome-f065a",
    storageBucket: "smarthome-f065a.appspot.com",
    messagingSenderId: "156963436496",
    appId: "1:156963436496:web:6ab3bb27d8954fcacb2bd5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
