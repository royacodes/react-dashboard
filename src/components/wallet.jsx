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
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import UserLineChart from './userlinechart';

const GET_WITHDRAWS = '/user/merchant/getAllWithdrawTransactionsHistoryForThisUser';
const PROFILE_URL = '/user/getUserProfile';


export default function Wallet() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = React.useState(false);

  const [chartData, setChartData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [balance, setBalance] = useState(0);
  const [walletAddress, setWalletAddress] = useState('');
  let newArray = [];

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

  useEffect(() => {
    (async () => {

      try {
        let userData = localStorage.getItem('loginData');
        let dt = JSON.parse(userData);
        let accessToken = dt["accessToken"];
        console.log(`accessToken: ${accessToken}`)
        const result = await api.get(GET_WITHDRAWS, {
          headers: { 'Content-Type': 'application/json', 'x-access-token': accessToken },
          withCredentials: false,
        })
        console.log(`result : ${result.data[0].updatedAt}`);
        setData(result.data);
        
       newArray = [...chartData];
        result.data.map((item) => {
          
          const d = new Date(item.updatedAt);
          console.log(`date m: ${d}`);
          const month = d.getMonth();
          newArray[month] = newArray[month] + item.amount;
          console.log(`month m: ${month}`);

        });
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
        try{
            const result = await api.get(PROFILE_URL, {
              headers: { 'Content-Type': 'application/json', 'x-access-token': dt["accessToken"] },
              withCredentials: false,
            });
            setWalletAddress(result.data.user.walletAddress);
            setBalance(result.data.user.orderPriceSum)

          } catch(err) {
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
  const labels = ["January", "February", "March", "April", "May", "June", "July", 'August', "September", "October", "November", "December" ];

  const info = {
    chartData: {
      labels: labels,
      data:
        chartData
      ,
    },
  };

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
      <div className="mt-24">
        <div className="flex flex-wrap lg:flex-nowrap justify-center lg:space-x-16">
          {/* CHART */}
          <UserLineChart info={info} balance={balance} walletAddress={walletAddress} />
     



        </div>

        {/* TABLE */}

        {loading && <div className='grid w-full h-full place-items-center mt-16'> <CircularProgress style={{ 'color': '#5B21B6' }}></CircularProgress></div>
        }
        {!loading && <div className="mt-8 mx-8 lg:mx-8 flex flex-col">
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