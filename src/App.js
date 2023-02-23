import './App.css';
import Wizard from './components/wizard';
import Login from './components/login';
import Dashboard from './components/dashboard';
import React, {useEffect, useState} from 'react';
import * as appPath from './core/path';

import { BrowserRouter, Routes, Route, Router, Navigate, useNavigate } from 'react-router-dom';

function App() {
  const [userData, setUserData] = useState();
  let navigate = useNavigate();
  useEffect(() => {
    let data = localStorage.getItem('loginData');
      // let dt = JSON.parse(data);
      // let accessToken = dt["accessToken"];
          //  setUserData(accessToken)
          if(data) {
            console.log(`accessToken: ${data}`);
            navigate('/dashboard');
            // return <Navigate replace to="/dashboard" />;
        
            // return (  
            //   <div>
            //         <Routes>
            //         <Route exact path="/dashboard" element={(<Dashboard />)} />
            //         </Routes>
            //       </div>
                  
            //     );
          } else {
            // return <Navigate replace to="/login" />;
            console.log(`accessToken null`);
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
