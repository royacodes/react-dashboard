import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Wizard from './components/wizard';
import Login from './components/login';
import Dashboard from './components/dashboard';
import APIKey from './components/apikey';
import Profile from './components/profile';
import EmailVerification from './components/emailverification';
import * as appPath from './core/path';
import { BrowserRouter, Routes, Route, Router, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider } from './components/contexts/authprovider';
import Transactions from './components/transactions';
import Wallet from './components/wallet';
import AdminPanel from './components/adminusers'
import EmailVerified from './components/emailverified'
import ForgotPassword from './components/forgotpassword';
import ResetPassword from './components/resetpassword';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },

  {
    path: appPath.LOGIN,
    element: <Login/>,
  },

  {
    path: appPath.REGISTER,
    element: <Wizard/>,
  },
  {
    path: appPath.DASHBOARD,
    element: <Dashboard/>,
  },

  {
    path: '/orders',
    element: <Transactions/>,
  },
  {
    path: '/wallet',
    element: <Wallet/>,
  },
  {
    path: '/apikey',
    element: <APIKey/>,
  },
  {
    path: '/profile',
    element: <Profile/>,
  },
  {
    path: '/admin',
    element: <AdminPanel/>,
  },
  {
    path: '/verification',
    element: <EmailVerification/>,
  },
  {
    path: '/verified',
    element: <EmailVerified/>,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword/>,
  },
  {
    path: '/reset-password',
    element: <ResetPassword/>,
  },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <AuthProvider>
      <RouterProvider router={router} />
        </AuthProvider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
