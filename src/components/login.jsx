
import { LockClosedIcon } from '@heroicons/react/20/solid';
import Wizard from './wizard';
import Lottie from 'react-lottie';

import animationData from '../assets/coin.json'
import { useNavigate } from "react-router-dom";

import React, { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from './contexts/authprovider';
import * as appPath from '../core/path';

import api from '../api/authapi';
const LOGIN_URL = '/auth/signin';


 export default function Login() {

  let navigate = useNavigate();

  const { setAuth } = useContext(AuthContext);
	const userRef = useRef();
	const errRef = useRef();

	const [username, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);


  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  useEffect(() => {
		userRef.current.focus();
	}, []);

  useEffect(() => {
		setErrMsg('');
	}, [username, password]);

  const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await api.post(
				LOGIN_URL,
				JSON.stringify({ username, password }),
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: false,
				}
			);

			const accessToken = response?.data?.accessToken;
			const roles = response?.data?.roles;
      localStorage.setItem('loginData', JSON.stringify(response.data));
			setAuth({ username, password, roles, accessToken });
			setUserName('');
			setPassword('');
			setSuccess(true);
		} catch (err) {
			if (!err?.response) {
				setErrMsg('No Server Response');
			} else if (err.response?.status === 400) {
				setErrMsg('Missing Username or Password');
			} else if (err.response?.status === 401) {
				setErrMsg('Unauthorized');
			} else {
				setErrMsg('Login Failed');
			}
			errRef.current.focus();
		}
	};

  if(success) {
    navigate(appPath.DASHBOARD);
  }

  return (
    <>
       <div className='bg-white grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
       <div className='hidden sm:block flex md:inline-flex'>
        <div className='bg-red-300 hidden sm:block'>
        <Lottie className='object-none object-center'
          options={defaultOptions}/>
        </div>
        </div>
       <div className="bg-white flex flex-col justify-center">
          <div>
          <p
						ref={errRef}
						className={errMsg ? 'errmsg' : 'offscreen'}
						aria-live="assertive"
					>
						{errMsg}
					</p>
            <h1
              className="mt-6 text-center text-8xl font-bold tracking-tight text-violet-700 font-passion">PaymentIsland</h1>
            <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <a href={appPath.REGISTER} className="font-medium text-indigo-600 hover:text-indigo-500">
                Create an Account
              </a>
            </p>
          </div>
          <form className="mt-8 space-y-6 mx-8 lg:mx-36"  action='#' method='POST' onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  ref={userRef} 
                  autoComplete="off"
                  onChange={(e) => setUserName(e.target.value)}
                  value={username}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Username"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
              type='submit'
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-violet-700 py-2 px-4 text-sm font-medium text-white hover:bg-violet-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-violet-300 group-hover:text-violet-500" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
       
    </div>
    </>
  )


}