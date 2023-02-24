import React, {useEffect, useState, useMemo} from 'react'
import {useTable} from 'react-table';
import AdminNavBar from './adminnavbar';
import api from '../api/authapi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress } from '@mui/material';

const GET_Users = '/user/admin/getallusers';


export default function AdminUsers() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    (async () => {
      try {
        let userData = localStorage.getItem('loginData');
        let dt = JSON.parse(userData);
        let accessToken = dt["accessToken"];
        console.log(`accessToken: ${accessToken}`)
              const result = await api.get(GET_Users, {
                headers: { 'Content-Type': 'application/json', 'x-access-token' : accessToken },
                withCredentials: false,
                })
                console.log(`result : ${result.data}`);
             setData(result.data);
             setLoading(false);

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
<AdminNavBar/>
{loading && <div className='grid w-full h-full place-items-center mt-36'> <CircularProgress style={{'color': '#5B21B6'}}></CircularProgress></div>
        }
      {!loading &&     <div className="mt-8 mx-8 flex flex-col">
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

  );
}

