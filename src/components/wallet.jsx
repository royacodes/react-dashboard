import React, { useEffect, useState, useMemo, Fragment } from "react";
import { BiCoinStack } from 'react-icons/bi';
import { FaWallet } from 'react-icons/fa';
import { useStateContext } from './contexts/contextprovider';
import { useTable } from 'react-table';
import NavBar from "./navbar";
import api from '../api/authapi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress } from '@mui/material';
import { BsCalendar2DateFill } from 'react-icons/bs'
import { BiTimeFive } from 'react-icons/bi'
import { GiTwoCoins } from 'react-icons/gi'
import { MdAccountBalanceWallet } from 'react-icons/md'
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import UserLineChart from './userlinechart';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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
const GET_WITHDRAWS = '/user/merchant/getAllWithdrawTransactionsHistoryForThisUser';
const PROFILE_URL = '/user/getUserProfile';
const WITHDRAW_URL = '/user/merchant/withdraw';
const WALLET_URL = '/user/merchant/updateMerchantWalletAddress';


const buildData = ({ chartData }) => ({
  labels: chartData.labels,
  datasets: [
    {
      label: '',
      data: chartData.data,
      backgroundColor: "#3182ce",
      borderColor: "#3182ce",
      fill: false,
      tension: 0.4,
    },
  ],
});

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Your monthly withdraw'
    }
  },

  // Modify the axis by adding scales
  scales: {
    // to remove the labels
    x: {
      ticks: {
        display: true,
      },

      // to remove the x-axis grid
      grid: {
        drawBorder: false,
        display: false,
      },
    },
    // to remove the y-axis labels
    y: {
      ticks: {
        display: true,
        beginAtZero: true,
      },
      // to remove the y-axis grid
      grid: {
        drawBorder: true,
        display: true,
      },
    },
  },
};


export default function Wallet() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [withdrawLoading, setwithdrawLoading] = useState(false);
  const [walletLoading, setwalletLoading] = useState(false);



  const [open, setOpen] = React.useState(false);

  const [chartData, setChartData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [balance, setBalance] = useState(0);
  const [walletAddress, setWalletAddress] = useState('');
  const [userWalletAddress, setuserWalletAddress] = useState('');
  const [accessToken, setAccessToken] = useState('');

  let newArray = [0,0,0,0,0,0,0,0,0,0,0,0];

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

  const handleWithdraw = async () => {
    setwithdrawLoading(true);
    try {
      const result = await api.get(WITHDRAW_URL, {
        headers: { 'Content-Type': 'application/json', 'x-access-token': accessToken },
        withCredentials: false,
      })
      setOpen(false)
      toast.success(result.data.message, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
      setwithdrawLoading(false);
    } catch (err) {
      setwithdrawLoading(false);
      console.log(err);
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

  const handleWalletAddress = async () => {
    setwalletLoading(true);
    try {
      const result = await api.post(WALLET_URL,
        JSON.stringify({ walletAddress }),
         {
        headers: { 'Content-Type': 'application/json', 'x-access-token': accessToken },
        withCredentials: false,
      })
      setuserWalletAddress(result.data.walletAddress);
      setWalletOpen(false);
      toast.success(result.data.message, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
      setwalletLoading(false);
    } catch (err) {
      setwalletLoading(false);
      console.log(err);
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
    console.log(`i fire once`); 
    (async () => {
      try {
        let userData = localStorage.getItem('loginData');
        let dt = JSON.parse(userData);
        setAccessToken(dt["accessToken"])
        const result = await api.get(GET_WITHDRAWS, {
          headers: { 'Content-Type': 'application/json', 'x-access-token': dt["accessToken"] },
          withCredentials: false,
        })
        newArray = [0,0,0,0,0,0,0,0,0,0,0,0];
         result.data.map((item) => {

          const d = new Date(item.updatedAt);
          console.log(`date m: ${d}`);
          const month = d.getMonth();
          newArray[month] = newArray[month] + item.amount;
          console.log(`month m: ${month}`);

        });
        setData(result.data);
        setChartData(newArray);
        
        console.log(`new array ${chartData}   ${newArray}`);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
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

  useEffect(() => {
    (async () => {
      let userData = localStorage.getItem('loginData');
      let dt = JSON.parse(userData);
      try {
        const result = await api.get(PROFILE_URL, {
          headers: { 'Content-Type': 'application/json', 'x-access-token': dt["accessToken"] },
          withCredentials: false,
        });
        setuserWalletAddress(result.data.user.walletAddress);
        setBalance(result.data.user.orderPriceSum)

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


  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "updatedAt",
        Cell: (props) => {
          const date = new Date(props.row.original.updatedAt);
          return (
            <>
              <div className='flex items-center justify-center text-sm text-gray-500'>
                <BsCalendar2DateFill color='#0F766E' className='mr-1' />
                {date.getFullYear()}-{date.getMonth() + 1}-{date.getDate()}
                <BiTimeFive color='#0F766E' className='mx-1' />
                {date.getHours()}:{date.getMinutes()}

              </div>
            </>
          );
        }
      },
      {
        Header: "Amount",
        accessor: "amount"
      },
      {
        Header: "Transaction Hash",
        accessor: "transactionHash",
        Cell: (props) => {
          return (
            <>
              <div className='flex items-center justify-center text-sm text-gray-500'>
                <a href={`https://tronscan.org/#/transaction/${props.row.original.transactionHash}`} target="_blank" className="font-medium text-indigo-600 hover:text-indigo-500">
                  {props.row.original.transactionHash}
                </a>
              </div>
            </>
          );
        }
      },
      {
        Header: "Payment Status",
        accessor: "isPaid",
        Cell: (props) => {
          return (
            <>
              {props.row.original.isPaid &&
                <div className='flex rounded-full bg-indigo-100 text-indigo-700 py-2 px-2 items-center justify-center text-sm text-gray-500'>
                  Paid
                </div>
              }

              {!(props.row.original.isPaid) &&
                <div className='flex rounded-full bg-purple-100 text-purple-700 py-2 px-2 items-center justify-center text-sm text-gray-500'>
                  Not paid
                </div>
              }
            </>
          );
        }
      },
      {
        Header: "Confirmation Status",
        accessor: "isConfirmed",
        Cell: (props) => {
          return (
            <>
              {props.row.original.isConfirmed &&
                <div className='flex rounded-full bg-green-100 py-2 px-2 items-center justify-center text-sm text-gray-500'>
                  Confirmed
                </div>
              }

              {!(props.row.original.isConfirmed) &&
                <div className='flex rounded-full bg-red-100 py-2 px-2 items-center justify-center text-sm text-gray-500'>
                  Not confirmed
                </div>
              }
            </>
          );
        }
      },
    ],
    []
  );
  const labels = ["January", "February", "March", "April", "May", "June", "July", 'August', "September", "October", "November", "December"];

  const info = {
    chartData: {
      labels: labels,
      data:
        chartData
      ,
    },
  };

  const lineData = buildData(info);


  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable({
    columns,
    data
  });
  return (
    <div>
      <NavBar tab={'wallet'} />
      <div className="mt-16">
        <div className="px-8">

          <div className="bg-white">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 pt-8 pb-8 lg:pt-8 lg:pb-8">

              <div className="relative bg-gray-100 rounded-lg">

                <div className="mb-5 px-6 pt-6">
                  <GiTwoCoins className="hi-outline hi-template inline-block w-12 h-12 text-indigo-500" />
                </div>

                <h3 className="text-lg font-bold mb-2 px-6">
                  Balance
                </h3>

                <p className="text-sm leading-6 text-gray-600 px-6">
                  You have {balance} USDT in your wallet.
                  Please notice that the minimum withdrawal amount is 100 USDT.
                  You easily can send your balance to the wallet address identified by you.
                </p>
                <div class="flex w-full items-center justify-between p-6">
                  <p class="text-md text-gray-600 pr-4 hover:text-gray-900">{balance} USDT</p>
                  <div class="w-1/2">
                    <button
                      onClick={handleClickOpen}
                      type="button" class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">Withdraw</button>
                    {/* DIALOG */}
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      onBackdropClick="false"
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
                        {withdrawLoading && <CircularProgress style={{ 'color': '#5B21B6' }} />}
                        {!withdrawLoading && <Button onClick={handleWithdraw} autoFocus>
                          Yes
                        </Button>}

                      </DialogActions>
                    </Dialog>
                  </div>
                </div>
              </div>

              <div className="relative bg-gray-100 rounded-lg">

                <div className="mb-5 px-6 pt-6">
                  <MdAccountBalanceWallet className="hi-outline hi-template inline-block w-12 h-12 text-indigo-500" />
                </div>

                <h3 className="text-lg font-bold mb-2 px-6">
                  Wallet Address
                </h3>
                <p className="text-sm leading-6 text-gray-600 px-6">
                  {userWalletAddress} is a wallet address identified by you. You can change your wallet address whenever you want. Be careful to enter a correct wallet address.
                </p>
                <div class="flex w-full items-center justify-between p-6">
                  <p class="text-xs text-gray-600 pr-4 hover:text-gray-900"></p>
                  <div class="w-1/2">
                    <button
                      onClick={handleWalletClickOpen}
                      type="button" class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">Edit</button>
                    <Dialog open={walletOpen} onBackdropClick="false"
                      onClose={handleWalletClose} fullWidth={true}
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
                          onChange={(e) => {
                            setWalletAddress(e.target.value)
                          }}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleWalletClose}>Cancel</Button>
                        {walletLoading && <CircularProgress style={{ 'color': '#5B21B6' }} />}
                        {!walletLoading &&  <Button onClick={handleWalletAddress}>Confirm</Button>}
                       
                      </DialogActions>
                    </Dialog>
                  </div>
                </div>
              </div>


              <div className="flex items-center justify-center p-6 bg-gray-100 rounded-lg">

                <Line type="line" data={lineData} options={options} />

              </div>

            </div>
          </div>
        </div>

        {/* TABLE */}

        {loading && <div className='grid w-full h-full place-items-center mt-0'> <CircularProgress style={{ 'color': '#5B21B6' }}></CircularProgress></div>
        }
        {!loading && <div className="mt-0 mx-8 lg:mx-8 flex flex-col">
          <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-violet-50">
                    {headerGroups.map(headerGroup => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                          // Add the sorting props to control sorting. For this example
                          // we can add them into the header props
                          <th
                            scope="col"
                            className="group px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider"
                            {...column.getHeaderProps()}
                          >
                            <div className="flex items-center justify-center">
                              {column.render('Header')}
                              {/* Add a sort direction indicator */}
                            </div>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody
                    {...getTableBodyProps()}
                    className="bg-white divide-y divide-gray-200"
                  >
                    {rows.map((row, i) => {  // new
                      prepareRow(row)
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map(cell => {
                            return (
                              <td
                                {...cell.getCellProps()}
                                className="px-6 py-4 whitespace-nowrap"
                                role="cell"
                              >
                                {cell.column.Cell.name === "defaultRenderer"
                                  ? <div className="flex items-center justify-center text-sm text-gray-500">{cell.render('Cell')}</div>
                                  : cell.render('Cell')
                                }
                              </td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>}


      </div>
      <ToastContainer />
    </div>

  );
}