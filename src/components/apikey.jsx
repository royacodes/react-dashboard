import React, { useState, useEffect } from "react";
import { AiOutlineCopy } from "react-icons/ai";
import api from '../api/authapi';
import NavBar from "./navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress } from '@mui/material';

const GET_APIKEY = '/user/merchant/getApiKey';
const PROFILE_URL = '/user/getUserProfile';



export default function APIKey() {

    const [apiKey, setApiKey] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [loading, setLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);


    const handleGetApiKey = async () => {
        setBtnLoading(true);
        try {

            const result = await api.get(GET_APIKEY, {
                headers: { 'Content-Type': 'application/json', 'x-access-token': accessToken },
                withCredentials: false,
            })
            setApiKey(result.data["apiKey"]);
            setBtnLoading(false);
        } catch (err) {
            setBtnLoading(false);
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

    useEffect(() => {
        (async () => {
            let userData = localStorage.getItem('loginData');
            let dt = JSON.parse(userData);
            setAccessToken(dt["accessToken"]);
            try {
                const result = await api.get(PROFILE_URL, {
                    headers: { 'Content-Type': 'application/json', 'x-access-token': dt["accessToken"] },
                    withCredentials: false,
                });
                console.log(`api key: ${JSON.stringify(result.data)}`);
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
    async function copyTextToClipboard(text) {
        if ("clipboard" in navigator) {
          return await navigator.clipboard.writeText(text);
        } else {
          return document.execCommand("copy", true, text);
        }
      }

      const handleCopyClick = () => {
        copyTextToClipboard(apiKey)
          .then(() => {
            // setIsCopied(true);
              toast("Copied!");
            setTimeout(() => {
            //   setIsCopied(false);
            }, 1500);
          })
          .catch((err) => {
            console.log(err);
          });
      };


    return (
        <div>
            <NavBar tab={'apikey'} />
            {loading && <div className='grid w-full h-full place-items-center mt-36'> <CircularProgress style={{ 'color': '#5B21B6' }}></CircularProgress></div>
            }
            {!loading && <div className="flex items-center justify-center w-full mt-16">
                <form>
                    <div class="lg:w-800 w-full mt-4 mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                        <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                            <div className="flex items-center justify-between px-2 py-2 border-t dark:border-gray-600">
                                <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your API Key</label>
                                <div class="flex pl-0 space-x-1 sm:pl-2">
                                    <button
                                    onClick={handleCopyClick}
                                     data-tooltip-target="tooltip-default" type="button" class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                        <AiOutlineCopy color="gray" />
                                        <span class="sr-only">Copy</span>
                                    </button>
                                    <div id="tooltip-default" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                        Tooltip content
                                        <div class="tooltip-arrow" data-popper-arrow></div>
                                    </div>
                                </div>
                            </div>
                            <textarea id="message" rows="1" value={apiKey} spellCheck="false"
                                class="block p-2.5 w-full text-sm text-gray-900 bg-amber-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none">
                            </textarea>
                        </div>
                        <div class="flex items-center justify-between px-4 py-2 border-t dark:border-gray-600">
                            {btnLoading && <div className='grid w-full h-full place-items-center mt-36'> <CircularProgress style={{ 'color': '#5B21B6' }}></CircularProgress></div>}
                            {!btnLoading && <button type="button" onClick={handleGetApiKey} class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                Get API Key
                            </button>}

                        </div>
                    </div>
                </form>
            </div>}

            <ToastContainer style={{ width: "34vw" }} />
        </div>

    );
}