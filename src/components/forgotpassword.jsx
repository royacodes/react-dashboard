
import { MdEmail } from 'react-icons/md';
import Wizard from './wizard';
import Lottie from 'react-lottie';
import { CircularProgress } from '@mui/material';

import animationData from '../assets/coin.json'
import { useNavigate } from "react-router-dom";

import React, { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from './contexts/authprovider';
import * as appPath from '../core/path';
import appLogo from '../assets/applogo.png';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '../api/authapi';
const LOGIN_URL = '/auth/signin';


export default function ForgotPassword() {

    let navigate = useNavigate();

    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);




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
    }, [username, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

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
                toast.error(err.response?.data['message'], {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: "colored",
                });
            }
            errRef.current.focus();
        }
    };

    if (success) {
        navigate(appPath.LOGIN);
    }

    return (
        <>
            <div className='bg-white grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
                <div className='hidden sm:block flex md:inline-flex'>
                    <div className='bg-red-300 hidden sm:block'>
                        <Lottie className='object-none object-center'
                            options={defaultOptions} />
                    </div>
                </div>
                <div className="bg-white flex flex-col justify-center">
                    <div>
                        <h1
                            className="mt-6 text-center text-5xl font-bold tracking-tight text-violet-700 font-skranji">Payment Island</h1>

                        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
                            Forgot your password?
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6 mx-8 lg:mx-36" action='#' method='POST' onSubmit={handleSubmit}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label for="email" className="block text-gray-700 text-sm font-bold mb-2">
                                    Enter your email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="you@example.com"
                                />
                            </div>

                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Remember your password?
                                </a>
                            </div>
                        </div>

                        <div className='grid w-full place-items-center'>
                            {loading && <CircularProgress style={{ 'color': '#5B21B6' }}></CircularProgress>}
                            {!loading &&
                                <button
                                    type='submit'
                                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-violet-700 py-2 px-4 text-sm font-medium text-white hover:bg-violet-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <MdEmail className="h-5 w-5 text-violet-300 group-hover:text-violet-500" aria-hidden="true" />
                                    </span>
                                    Send
                                </button>
                            }

                        </div>
                    </form>
                </div>

                <ToastContainer />

            </div>
        </>
    )
}