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
        <div className="flex w-full md:w-1/2 px-4 pb-2 pt-2 bg-white text-white items-center justify-center">
          <Line type="line" data={data} options={options} />
        </div>
      </div>
    </>
  );
};

export default UserLineChart;