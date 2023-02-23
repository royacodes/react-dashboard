import React, {useEffect, useState, useMemo} from "react";
import { BsCurrencyDollar } from 'react-icons/bs';
import Button from "./Button";
import { useStateContext } from './contexts/contextprovider';
import {useTable} from 'react-table';
import NavBar from "./navbar";
import api from '../api/authapi';

const GET_WITHDRAWS = '/user/merchant/getAllWithdrawTransactionsHistoryForThisUser';

export default function Wallet() {

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
let userData = await localStorage.getItem('loginData');
let dt = JSON.parse(userData);
let accessToken = dt["accessToken"];
console.log(`accessToken: ${accessToken}` )

      const result = await api.get(GET_WITHDRAWS, {
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
    return(
      <div>
<NavBar tab={'wallet'} />
        <div className="mt-24">
            <div className="flex flex-wrap lg:flex-nowrap justify-center lg:space-x-16">

                {/* BALANCE */}
                <div class="max-w-sm w-50 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Balance </h5>
    </a>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">124,000   USDT</p>
    <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Withdraw
    </a>
</div>

        {/* WALLET */}
        <div class="max-w-sm w-50 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Wallet Address</h5>
    </a>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">ksldkaNfalnflkanfncsnfcsjlNkcsdknknacd</p>
    <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Edit
        <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </a>
</div>


            </div>

            {/* TABLE */}

            <div className="mt-8 mx-8 flex flex-col">
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
      </div>
        </div>
        </div>

    );
}