import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'antd/dist/reset.css'
import{BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './context/Auth.jsx'
import { SearchProvider } from './context/Search.jsx'
import firebase from 'firebase/compat/app'
import { initializeApp } from "firebase/app";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();

const firebaseConfig = {
  apiKey: "AIzaSyBwBNRd9vW9JL6RN2duSiBldH37kyRDf-g",
  authDomain: "sri-9f5c4.firebaseapp.com",
  projectId: "sri-9f5c4",
  storageBucket: "sri-9f5c4.appspot.com",
  messagingSenderId: "883471839804",
  appId: "1:883471839804:web:722fbe1619f5180d668939"
};


firebase.initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider >
    <SearchProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SearchProvider>
    
  </AuthProvider>
  
)
