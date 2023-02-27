import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import React, {useState} from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { BiCoinStack } from 'react-icons/bi';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);
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
      legend: {
        position: 'top',
        display: false,
      },
      title: {
        display: false,
        text: 'Chart.js Line Chart',
      },
    },
  };

const numberToFix = (number, fix) => (number || 0).toFixed(fix);

const UserLineChart = ({ info }) => {
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
            <div className="rounded shadow-xl overflow-hidden w-full md:flex" style={{ maxWidth: '900px' }}>
               
                <div className="flex w-full md:w-1/2 p-10 bg-gray-100 text-gray-600 items-center">
                    <div className="w-full">
                          {/* BALANCE */}
          <div className="max-w-sm w-50 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Balance </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">124,000   USDT</p>
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
          </div>
                    </div>
                </div>
                <div className="flex w-full md:w-1/2 px-5 pb-4 pt-8 bg-white text-white items-center">
                    <Line type="line" data={data} options={options}/>
                </div>
            </div>
        </>
    );
};

export default UserLineChart;