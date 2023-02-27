import React, { useState, useEffect } from "react";
import ProfileImage from '../assets/defaultimage.jpg';
import NavBar from './navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../api/authapi';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';

const PROFILE_URL = '/user/getUserProfile';

export default function Profile() {
  const [accepted, setAccepted] = useState(false);
  const [verified, setVerified] = useState(false);
  const [balance, setBalance] = useState(0);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [store, setStore] = useState('');
  const [phone, setPhone] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let userData = localStorage.getItem('loginData');
      let dt = JSON.parse(userData);
      try {
        const result = await api.get(PROFILE_URL, {
          headers: { 'Content-Type': 'application/json', 'x-access-token': dt["accessToken"] },
          withCredentials: false,
        });
        setAccepted(result.data.user.acceptedByAdmin);
        setVerified(result.data.user.emailVerified);
        setBalance(result.data.user.orderPriceSum);
        setName(`${result.data.user.firstName} ${result.data.user.lastName}`);
        setUsername(result.data.user.username);
        setEmail(result.data.user.email);
        setStore(result.data.user.storeName);
        setPhone(result.data.user.phoneNumber);
        setWalletAddress(result.data.user.walletAddress);
        setApiKey(result.data.user.apiKey);

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
    })();
  }, []);
  return (
    <main className="profile-page bg-gray-100">
      <section className="relative block bg-gray-100" style={{ height: "500px" }}>
        <NavBar tab={'profile'} />
      </section>
      <section className="relative py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <img
                      alt="..."
                      src={ProfileImage}
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                      style={{ maxWidth: "150px" }}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <button
                      className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                    >
                      Change Password
                    </button>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center items-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center text-center">
                      <span className="flex justify-center items-center">
                      {accepted && <AiFillCheckCircle color="green" size={30}/>}
                      {!accepted && <AiFillCloseCircle color="red" size={30}/>}
                      </span>
                      <span className="text-sm text-gray-500">Accepted</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                    <span className="flex justify-center items-center">
                      {verified && <AiFillCheckCircle color="green" size={30}/>}
                      {!verified && <AiFillCloseCircle color="red" size={30}/>}
                      </span>
                      <span className="text-sm text-gray-500">Verified</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-sm font-medium flex justify-center items-center mb-2">
                        {balance} USDT
                      </span>
                      <span className="text-sm text-gray-500">Balance</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                  {name}
                </h3>
                <div className="text-md leading-normal mt-0 mb-2 text-gray-500 font-bold">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                  {email}
                </div>
                <div className="mb-2 text-gray-700 mt-10">
                  <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
                  {username}
                </div>
                <div className="mb-2 text-gray-700">
                  <i className="fas fa-university mr-2 text-lg text-gray-500"></i>
                  {store}
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-gray-300 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <div className="grid grid-cols-2">
                      <div className="text-md font-bold text-gray-800 mb-4">Phone Number</div>
                      <div className="text-sm font-medium text-gray-500 mb-4">{phone}</div>
                      
                      <div className="text-md font-bold text-gray-800 mb-4">Wallet Address</div>
                      <div className="text-sm font-medium text-gray-500 mb-4 text-ellipsis overflow-hidden line-clamp-2">{walletAddress}</div>

                      <div className="text-md font-bold text-gray-800 mb-4">API Key</div>
                      <p className="text-sm font-medium text-gray-500 mb-4 text-ellipsis overflow-hidden line-clamp-2">{apiKey}</p>
                    </div>
                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer style={{ width: "34vw" }} />
    </main>
  );
}