// firebase.js or firebaseConfig.js
import { initializeApp } from "firebase/app";
<<<<<<< HEAD
import { getAuth, GoogleAuthProvider } from "firebase/auth";
=======
import { getAuth , GoogleAuthProvider } from "firebase/auth";
>>>>>>> 44b5c809669df2c5afe4ef4724278c13d33c15b1

const firebaseConfig = {
  apiKey: "AIzaSyA9NxtSwO7mp8MaSn6RWa5akf_1HzB5Ln4",
  authDomain: "assignment-b6cc9.firebaseapp.com",
  projectId: "assignment-b6cc9",
  storageBucket: "assignment-b6cc9.firebasestorage.app",
  messagingSenderId: "412035185696",
  appId: "1:412035185696:web:9d4a32181e22d3e04dd045",
  measurementId: "G-SFZTTPTXLN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth , googleProvider };
