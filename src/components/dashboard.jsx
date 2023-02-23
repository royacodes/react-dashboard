import { Fragment, useEffect, useState, useMemo } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Transactions from '../components/transactions.jsx'
import avatar from '../data/avatar2.jpg'
import { useNavigate } from 'react-router-dom'
import * as appPath from '../core/path';
import Wallet from '../components/wallet';
import api from '../api/authapi';
import { Link, NavLink } from 'react-router-dom';
import NavBar from './navbar.jsx'
import APIKey from './apikey.jsx'
const GET_ORDERS = '/user/merchant/getAllOrdersForThisUser';

export const links = [
  {
    title: 'Orders',
    links: [
      {
        name: 'orders',
      },
    ],
  },

  {
    title: 'Wallet',
    links: [
      {
        name: 'wallet',
      },
    ],
  },
  {
    title: 'API Key',
    links: [
      {
        name: 'apikey',
      },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
let userData = await localStorage.getItem('loginData');
let dt = JSON.parse(userData);
let accessToken = dt["accessToken"];
console.log(`accessToken: ${accessToken}` )

      const result = await api.get(GET_ORDERS, {
        headers: { 'Content-Type': 'application/json', 'x-access-token' : accessToken },
        withCredentials: false,
        })
        console.log(`result : ${result.data}`);
     setData(result.data);
    })();
  }, []);


  const columns = useMemo(
    () => [
          {
            Header: "Order ID",
            accessor: "orderId"
          },
          {
            Header: "Store",
            accessor: "storeName"
          },
          {
            Header: "Price",
            accessor: "price",
            // Cell method will provide the cell value; we pass it to render a custom component
            // Cell: ({ cell: { value } }) => <Genres values={value} />
          },
          {
            Header: "Transaction Hash",
            accessor: "transactionHash",
            // Cell method will provide the value of the cell; we can create a custom element for the Cell        
            // Cell: ({ cell: { value } }) => {
            //   const hour = Math.floor(value / 60);
            //   const min = Math.floor(value % 60);
            //   return (
            //     <>
            //       {hour > 0 ? `${hour} hr${hour > 1 ? "s" : ""} ` : ""}
            //       {min > 0 ? `${min} min${min > 1 ? "s" : ""}` : ""}
            //     </>
            //   );
            // }
          },
          {
            Header: "Date",
            accessor: "updatedAt"
          },
          {
            Header: "Confirmation Status",
            accessor: "isTransferedToMain"
          },
          {
            Header: "Withdrawal Status",
            accessor: "isTransferedToMerchant"
          },
        ],
    []
  );

  let navigate = useNavigate();


  
  return (
    <div>
      <NavBar />   
    {/* <Wallet  columns={columns} data={data}/> */}
    {/* <Transactions columns={columns} data={data} /> */}
    {/* <APIKey/> */}
    </div>
    
  )
}