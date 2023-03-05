import React, { useState, useEffect } from "react";
import ProfileImage from '../assets/defaultimage.jpg';
import NavBar from './navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../api/authapi';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

const PROFILE_URL = '/user/getUserProfile';
const RESEND_URL = '/auth/resendEmailVerification';
const CHANGEPASS_URL = '/user/merchant/updateMerchantPassword';



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
  const [resendLoading, setResendLoading] = useState(false);
  const [changePassLoading, setChangePassLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState(false);
  const [passwordConfirm, setpasswordConfirm] = useState(false);

  const handleResend = async () => {
    setResendLoading(true);
    try {
      let userData = localStorage.getItem('loginData');
      let dt = JSON.parse(userData);
      let accessToken = dt["accessToken"];
      const result = await api.get(RESEND_URL, {
        headers: { 'Content-Type': 'application/json', 'x-access-token': accessToken },
        withCredentials: false,
      })
      setResendLoading(false);
      toast.success(result.data.message, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
    } catch (err) {
      setResendLoading(false);
      if (!err?.response) {
        toast.error('No Server Response', {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
        });
      } else if (typeof variable === "String") {
        console.log(`error: ${err.response?.data['message']}`);
        toast.error(err.response?.data['message'], {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
        });
      } else if (err.response?.status === 500) {
        toast.error('Internal Server Error', {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
        });
      } else {
        toast.error('Other errors', {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
        });
      }
    }
  }

  const handleChangePassword = async () => {
    setChangePassLoading(true);
    try {
      let userData = localStorage.getItem('loginData');
      let dt = JSON.parse(userData);
      let accessToken = dt["accessToken"];
      const result = await api.post(CHANGEPASS_URL,
        JSON.stringify({ password, passwordConfirm }),
        {
          headers: { 'Content-Type': 'application/json', 'x-access-token': accessToken },
          withCredentials: false,
        })
      setChangePassLoading(false);
      setOpen(false);
      toast.success(result.data.message, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
    } catch (err) {
      setChangePassLoading(false);
      if (!err?.response) {
        toast.error('No Server Response', {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
        });
      } else if (err.response?.status === 500) {
        toast.error('Internal Server Error', {
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


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
    })();
  }, []);
  return (
    <main className="profile-page bg-gray-100">
      <section className="relative block bg-gray-100" style={{ height: "500px" }}>
        <NavBar tab={'profile'} />
      </section>
      {loading && <div className='grid w-full h-full place-items-center mt-36'> <CircularProgress style={{ 'color': '#5B21B6' }}></CircularProgress></div>
      }
      {!loading && <section className="relative py-16 bg-gray-100">
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
                      onClick={handleClickOpen}
                      className="bg-violet-500 active:bg-violet-600 text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                    >
                      Change Password
                    </button>
                  </div>

                  <Dialog open={open} onBackdropClick="false"
                    onClose={handleClose} fullWidth={true}
                  >
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Enter your new password
                      </DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        label="password"
                        type="password"
                        fullWidth
                        variant="filled"
                        onChange={(e) => {
                          setPassword(e.target.value)
                        }}
                      />
                    </DialogContent>
                    <DialogContent>
                      <DialogContentText>
                        Enter your new password again
                      </DialogContentText>
                      <TextField

                        margin="dense"
                        id="passwordConf"
                        label="password confirmation"
                        type="password"
                        fullWidth
                        variant="filled"
                        onChange={(e) => {
                          setpasswordConfirm(e.target.value)
                        }}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      {changePassLoading && <CircularProgress style={{ 'color': '#5B21B6' }} />}
                      {!changePassLoading && <Button onClick={handleChangePassword}>Confirm</Button>}

                    </DialogActions>
                  </Dialog>

                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center items-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center text-center">
                      <span className="flex justify-center items-center">
                        {accepted && <AiFillCheckCircle color="green" size={30} />}
                        {!accepted && <AiFillCloseCircle color="red" size={30} />}
                      </span>
                      <span className="text-sm text-gray-500">Accepted</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="flex justify-center items-center">
                        {verified && <AiFillCheckCircle color="green" size={30} />}
                        {!verified && <AiFillCloseCircle color="red" size={30} />}
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
                {!verified &&

                  <div className="text-md leading-normal mt-8 mb-0">
                    {resendLoading && <CircularProgress style={{ 'color': '#5B21B6' }}></CircularProgress>}
                    {!resendLoading && <button
                      className="bg-white active:bg-white text-indigo-600 font-bold hover:text-indigo-500 text-md ml-8 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                      onClick={handleResend}
                      type="button"
                      style={{ transition: "all .15s ease" }}
                    >Resend verification email
                    </button>}


                  </div>}

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
      </section>}

      <ToastContainer style={{ width: "34vw" }} />
    </main>
  );
}