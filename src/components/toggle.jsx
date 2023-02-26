import React, { useState } from "react";
import api from '../api/authapi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress } from '@mui/material';

const ACTIVATE_USER = '/user/admin/acceptmerchant';

export default function Toggle({ value, email }) {
    const [enabled, setEnabled] = useState(value);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const handleSwitch = async () => {
        try {
            let userData = localStorage.getItem('loginData');
            let dt = JSON.parse(userData);
            let accessToken = dt["accessToken"];
            const result = await api.post(ACTIVATE_USER,
                JSON.stringify({ email }),
                {
                    headers: { 'Content-Type': 'application/json', 'x-access-token': accessToken },
                    withCredentials: false,
                })
            setData(result.data);
            setEnabled(!enabled);
            toast.success('User has been activated successfully.', {
                position: toast.POSITION.TOP_RIGHT,
                theme: "colored",
            });
            setLoading(false);

        } catch (err) {
            setLoading(false);
            if (!err?.response) {
                toast.error('No Server Response', {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: "colored",
                    className: 'Toastify__toast--error'
                });
            } else {
                console.log(`error: ${err.response?.data['message']}`);
                toast.error(err.response?.data['message'], {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: "colored",
                    className: 'Toastify__toast--error'
                });
            }
        }
    }
    return (
        <div className="relative flex flex-col items-center justify-center overflow-hidden">
            <div className="flex">
            {loading && <CircularProgress style={{'color': '#5B21B6'}}></CircularProgress>}
            {!loading && <label class="inline-flex relative items-center mr-5 cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={enabled}
                        readOnly
                    />
                    <div
                        onClick={() => {
                            console.log(`onSwitch ${enabled}`)
                            console.log(`user email toggle: ${email}`);

                            setLoading(true);
                            handleSwitch();
                        }}
                        className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                    ></div>
                    <span className="ml-2 text-sm font-medium text-gray-900">
                        Active
                    </span>
                </label>}
                
            </div>
            <ToastContainer style={{ width: "34vw" }} />

        </div>
    );
}