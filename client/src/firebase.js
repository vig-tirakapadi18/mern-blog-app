import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-blog-acbdd.firebaseapp.com",
    projectId: "mern-blog-acbdd",
    storageBucket: "mern-blog-acbdd.appspot.com",
    messagingSenderId: "730044224532",
    appId: "1:730044224532:web:22051a777821d3f3e4c301"
};

const app = initializeApp(firebaseConfig);

export default app;