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
import Transactions, { AvatarCell, SelectColumnFilter, StatusPill } from './components/transactions'
import * as appPath from './core/path';

import { AuthProvider } from './components/contexts/authprovider';


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
    path: appPath.TRANSACTIONS,
    element: <Transactions/>,
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
