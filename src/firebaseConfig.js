// src/firebaseConfig.js

import { initializeApp } from 'firebase/app'; // Import initializeApp from Firebase
import { getAuth, GoogleAuthProvider } from 'firebase/auth'; // Import Firebase Authentication services
import { getDatabase } from 'firebase/database'; // Import Realtime Database services

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyAA678PqzJPsGiv6hzTUtYhZm5nZVNAQUE",
    authDomain: "placement-portal-2ac8d.firebaseapp.com",
    databaseURL: "https://placement-portal-2ac8d-default-rtdb.firebaseio.com",
    projectId: "placement-portal-2ac8d",
    storageBucket: "placement-portal-2ac8d.appspot.com",
    messagingSenderId: "311213933725",
    appId: "1:311213933725:web:74689005554058414f8074",
    measurementId: "G-VEGZE804JB"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get Firebase Authentication and Database instances
const auth = getAuth(app);
const database = getDatabase(app);

// Set up Google Auth Provider for authentication
const provider = new GoogleAuthProvider();

// Export Firebase services for use in other parts of your application
export { auth, database, app, provider };
