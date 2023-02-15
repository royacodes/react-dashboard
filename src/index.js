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




const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },

  {
    path: "/login",
    element: <Login/>,
  },

  {
    path: "/steps",
    element: <Wizard/>,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
  },

  {
    path: "/transactions",
    element: <Transactions/>,
  },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
