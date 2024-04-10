import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

import { Toaster } from 'react-hot-toast'
import RegisterModal from './components/modals/RegisterModal.tsx'
import LoginModal from './components/modals/LoginModal.tsx'
import EditModal from './components/modals/EditModal.tsx'

import { AuthContextProvider } from "./context/authContext";

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Toaster />
      
      <EditModal />
      <RegisterModal />
      <LoginModal />

      <App />
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
