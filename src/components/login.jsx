
import { LockClosedIcon } from '@heroicons/react/20/solid';
import Wizard from './wizard';
import { Link, Route, Routes } from 'react-router-dom'
import Lottie from 'react-lottie';

import animationData from '../assets/coin.json'


export default function Login() {


  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };


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
          <div >
            <h1
              className="mt-6 text-center text-8xl font-bold tracking-tight text-violet-700 font-passion">PaymentIsland</h1>
            <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <a href={"/steps"} className="font-medium text-indigo-600 hover:text-indigo-500">
                Create an Account
              </a>
            </p>
          </div>
          <form className="mt-8 space-y-6 mx-8 lg:mx-36" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
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
                type="submit"
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
