import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { BiCoinStack } from 'react-icons/bi';
import { FaWallet } from 'react-icons/fa';
import TextField from '@mui/material/TextField';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const formatter = (number) => (number > 999999 ? (number / 1000000).toFixed(1) + 'M' : number);


const buildData = ({ chartData }) => ({
  labels: chartData.labels,
  datasets: [
    {
      label: '',
      data: chartData.data,
      backgroundColor: "blue",
      borderColor: 'rgb(75, 192, 192)',
      fill: false,
      tension: 0.4,
    },
  ],
});

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Your monthly withdraw"
    },
    legend: {
      display: false
    }
  },
};

const numberToFix = (number, fix) => (number || 0).toFixed(fix);

const UserLineChart = ({ info, balance, walletAddress }) => {
  const data = buildData(info);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [walletOpen, setWalletOpen] = React.useState(false);

  const handleWalletClickOpen = () => {
    setWalletOpen(true);
  };

  const handleWalletClose = () => {
    setWalletOpen(false);
  };
  return (
    <>
      <div className="rounded shadow-xl overflow-hidden w-full md:flex mx-8" >

        <div className="flex w-full md:w-1/2 p-10 bg-gray-100 text-gray-600 items-center">
          <div className="w-full">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Balance </h5>
            <p className="mb-3 text-md font-normal text-gray-700 dark:text-gray-400">{balance}   USDT</p>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Wallet Address </h5>
            <p className="mb-3 text-md font-normal text-gray-700 dark:text-gray-400">{walletAddress}</p>
            <div className='grid grid-cols-2'>
            <button
              onClick={handleClickOpen}
              className="group relative flex w-40 justify-center rounded-md border border-transparent bg-violet-700 py-2 px-4 text-sm font-medium text-white hover:bg-violet-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <BiCoinStack className="h-5 w-5 text-violet-300 group-hover:text-violet-500" aria-hidden="true" />
              </span>
              Withdraw
            </button>
            {/* DIALOG */}
            <Dialog
              open={open}
              onClose={handleClose}
              fullWidth={true}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Withdraw"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to withdraw all USDT?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={handleClose} autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>

            <button
              onClick={handleWalletClickOpen}
              className="group relative flex w-40 justify-center rounded-md border border-transparent bg-violet-700 py-2 px-4 text-sm font-medium text-white hover:bg-violet-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className=" absolute inset-y-0 left-0 flex items-center pl-3">
                <FaWallet className=" h-4 w-4 text-violet-300 group-hover:text-violet-500" aria-hidden="true" />
              </span>
              Edit Address
            </button>

            {/* WALLET DIALOG */}
            <Dialog open={walletOpen} onClose={handleWalletClose} fullWidth={true}
            >
              <DialogTitle>Wallet Address</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Enter your wallet address
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="wallet_address"
                  label="Wallet Address"
                  type="text"
                  fullWidth
                  variant="filled"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleWalletClose}>Cancel</Button>
                <Button onClick={handleWalletClose}>Confirm</Button>
              </DialogActions>
            </Dialog>
            </div>
           

          </div>
        </div>
        <div className="flex w-full md:w-1/2 px-4 pb-2 pt-2 bg-white text-white items-center justify-center">
          <Line type="line" data={data} options={options} />
        </div>
      </div>
    </>
  );
};

export default UserLineChart;