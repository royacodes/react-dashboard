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
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UserLineChart from './userlinechart';

const GET_WITHDRAWS = '/user/merchant/getAllWithdrawTransactionsHistoryForThisUser';


export default function Wallet() {

  const [data, setData] = useState([]);
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
        console.log(`result : ${result.data}`);
        setData(result.data);
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


  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "updatedAt"
      },
      {
        Header: "Amount",
        accessor: "amount"
      },
      {
        Header: "Transaction Hash",
        accessor: "transactionHash",
      },
      {
        Header: "Payment Status",
        accessor: "isPaid"
      },
      {
        Header: "Confirmation Status",
        accessor: "isConfirmed"
      },
    ],
    []
  );
  const labels = ["January", "February", "March", "April", "May", "June"];

  const info = {
    chartData: {
      labels: labels,
      data:
        [0, 10, 5, 2, 20, 30, 45]
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
          <UserLineChart info={info} />
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

          {/* WALLET */}
          <div className="max-w-sm w-50 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Wallet Address</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">ksldkaNfalnflkanfncsnfcsjlNkcsdknknacd</p>
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

        {/* TABLE */}

        {loading && <div className='grid w-full h-full place-items-center mt-16'> <CircularProgress style={{ 'color': '#5B21B6' }}></CircularProgress></div>
        }
        {!loading && <div className="mt-8 lg:mx-56 mx-8 flex flex-col">
          <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
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
                            <div className="flex items-center justify-between">
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
                                  ? <div className="text-sm text-gray-500">{cell.render('Cell')}</div>
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