import './App.css';
import Login from './components/login';
import Dashboard from './components/dashboard';
import React, {useEffect} from 'react';

import { BrowserRouter, Routes, Route, Router, Navigate, useNavigate } from 'react-router-dom';

function App() {
  let userData;
  let navigate = useNavigate();

  useEffect(() => {
     userData = JSON.parse(localStorage.getItem('loginData'));
     console.log(`accessToken: ${userData}`);

     if(userData) {
      navigate('/dashboard');
      // return (  
      //   <div>
      //         <Routes>
      //         <Route exact path="/dashboard" element={(<Dashboard />)} />
      //         </Routes>
      //       </div>
            
      //     );
    } else {
      navigate('/login');
      // return (  
      //   <div>
      //         <Routes>
      //         <Route exact path="/login" element={(<Login />)} />
      //         </Routes>
      //       </div>
            
      //     );
    }
  }, []);

  



}

export default App;
