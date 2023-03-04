
import { BiReset } from 'react-icons/bi';
import Wizard from './wizard';
import Lottie from 'react-lottie';
import { CircularProgress } from '@mui/material';

import animationData from '../assets/coin.json'
import { useNavigate } from "react-router-dom";

import React, { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from './contexts/authprovider';
import * as appPath from '../core/path';
import appLogo from '../assets/applogo.png';
import { useParams } from "react-router-dom";




import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '../api/authapi';
const RESET_URL = '/auth/resetPassword/';


 export default function ResetPassword() {

  let navigate = useNavigate();

  const { setAuth } = useContext(AuthContext);
	

	const [password, setPassword] = useState('');
	const [confPass, setConfPass] = useState('');
	const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const params = useParams();



  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const handleSubmit = async (e) => {
		e.preventDefault();
    if(password === confPass) {
      setLoading(true);

      try {
        const response = await api.post(
          RESET_URL+params.passToken,
          JSON.stringify({ password }),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: false,
          }
        );
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
      });
        setPassword('');
        setLoading(false);
        setSuccess(true);
      } catch (err) {
        setLoading(false);
        if (!err?.response) {
          toast.error('No Server Response', {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored",
        });
        } else {
          console.log(`error: ${err.response?.data['message']}`);
          toast.error(err.response?.data['error'], {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored",
        });
        }
      }
    } else {
      toast.error('Password do not match!', {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
    });
    }
   
	};

  // if(success) {
  //   navigate(appPath.LOGIN);
  // }

  return (
    <>
       <div className='bg-white grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
       <div className='hidden sm:block flex md:inline-flex'>
        <div className='bg-white hidden sm:block'>
        <Lottie className='object-none object-center'
          options={defaultOptions}/>
        </div>
        </div>
       <div className="bg-white flex flex-col justify-center">
          <div>
            <h1
              className="mt-6 text-center text-5xl font-bold tracking-tight text-violet-700 font-skranji">Payment Island</h1>
            
            <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
              Reset your password
            </h2>
          </div>
          <form className="mt-8 space-y-6 mx-8 lg:mx-36"  action='#' method='POST' onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div >
              <div>
              <label for="password" className="block text-gray-700 text-sm font-bold mb-2">
                  New Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter your new password"
                />
              </div>
              <div>
              <label for="confPass" className="block text-gray-700 text-sm font-bold mt-8 mb-2">
                  Password Confirmation
                </label>
                <input
                  id="confPass"
                  name="confPass"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={(e) => setConfPass(e.target.value)}
                  value={confPass}
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter your new password again"
                />
              </div>
            </div>
            
            <div className='grid w-full place-items-center'>
              {loading && <CircularProgress style={{'color': '#5B21B6'}}></CircularProgress>}
              {!loading &&
              <button
              disabled={success}
              type='submit'
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-violet-700 py-2 px-4 text-sm font-medium text-white hover:bg-violet-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <BiReset className="h-5 w-5 text-violet-300 group-hover:text-violet-500" aria-hidden="true" />
                </span>
                Reset
              </button>
              }
              
            </div>
            <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    login
                                </a>
                            </div>
                        </div>
          </form>
        </div>

        <ToastContainer />
       
    </div>
    </>
  )


}