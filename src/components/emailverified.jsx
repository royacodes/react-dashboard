import React, { useState, useEffect } from "react";
import EmailImage from '../assets/emailverified.png'
import { useParams } from "react-router-dom";
import { CircularProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PlainNavBar from './plainnavbar'

import api from '../api/authapi';
const VERIFY_URL = '/verify-email/';




export default function EmailVerified() {



  const params = useParams();
  const [loading, setLoading] =  useState(true);
  const [success, setSuccess] = useState(false);



  useEffect(() => {
    (async () => {
      if(!success) {
        try {
          const result = await api.get(VERIFY_URL+params.verifyToken, {
            headers: { 'Content-Type': 'application/json',},
            withCredentials: false,
          })
          setSuccess(true);
          setLoading(false);
    
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
        }
      } 
    })();
  }, []);



    return (
        <div>
          <PlainNavBar/>
      {loading && <div className='grid w-full h-full place-items-center mt-36'> <CircularProgress style={{ 'color': '#5B21B6' }}></CircularProgress></div>}
      {!loading && <div className='grid w-full h-full place-items-center mt-36'></div>}
          {success && <div>
            <section className="relative block" style={{ height: "30vh" }}>
         
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style={{ height: "70px" }}
          >
      
          </div>
        </section>
        <section className="relative py-16" style={{ height: "50vh" }}>
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src={EmailImage}
                        className="shadow-xl h-auto rounded-full align-middle border-none absolute  -m-16 -ml-20 lg:-ml-16"
                        style={{ maxWidth: "150px" }}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      
                    </div>
                  </div>
                </div>
                <div className="text-center mt-16">
                  <h3 className="text-3xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                    Your email address is verified.
                  </h3>
                </div>
                <div className="mt-10 py-10 border-t border-gray-300 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <a
                        href="/login"
                        className="font-medium text-md text-indigo-600 hover:text-indigo-500"
                      >
                        Continue
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
            </div>}
            <ToastContainer style={{ width: "34vw" }} />
      </div>
    );
}