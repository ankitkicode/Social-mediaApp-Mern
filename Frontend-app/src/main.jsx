import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './globel.css';
import { BrowserRouter } from 'react-router-dom';
import {NextUIProvider} from '@nextui-org/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    <ToastContainer/>
    </BrowserRouter>
  </React.StrictMode>,
)
