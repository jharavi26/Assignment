import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import {BrowserRouter as Router , Routes , Route, Navigate} from "react-router-dom";
import {initializeApp} from "firebase/app";
import Login from './component/Authentication/Login.jsx';
import Signup from './component/Authentication/SignUp.jsx';
import AuthRoute from './component/Authentication/AuthRoute.jsx';
import Main from './component/product/Main.jsx';

const firebaseConfig = {
  apiKey: "AIzaSyA9NxtSwO7mp8MaSn6RWa5akf_1HzB5Ln4",
  authDomain: "assignment-b6cc9.firebaseapp.com",
  projectId: "assignment-b6cc9",
  storageBucket: "assignment-b6cc9.firebasestorage.app",
  messagingSenderId: "412035185696",
  appId: "1:412035185696:web:9d4a32181e22d3e04dd045",
  measurementId: "G-SFZTTPTXLN"
};

initializeApp(firebaseConfig);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path = "/" element={<AuthRoute><App/></AuthRoute>} />
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/signup" element = {<Signup/>}/>
        <Route path = "/main" element = {<Main/>}/>
        <Route path = "*" element = {<Navigate to ="/"/>} />
      </Routes>

    </Router>
   
  </StrictMode>,
)
