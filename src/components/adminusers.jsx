import React, { useEffect, useState, useMemo } from 'react'
import { useTable, useFilters } from 'react-table';
import AdminNavBar from './adminnavbar';
import api from '../api/authapi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress } from '@mui/material';
import Toggle from './toggle';

const GET_Users = '/user/admin/getallusers';


export default function AdminUsers() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [filterInput, setFilterInput] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleSearchBtn = () => {
    setFilter("firstName", searchValue); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value

    setFilterInput(searchValue);
  }

  const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setSearchValue(value);
    // setFilter("email", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
    setFilter("firstName", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value

    setFilterInput(value);
  };

  useEffect(() => {
    (async () => {
      try {
        let userData = localStorage.getItem('loginData');
        let dt = JSON.parse(userData);
        let accessToken = dt["accessToken"];
        const result = await api.get(GET_Users, {
          headers: { 'Content-Type': 'application/json', 'x-access-token': accessToken },
          withCredentials: false,
        })
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
        Header: "Name",
        accessor: "firstName",
        Cell: (props) => {
          return (
            <>
              <div className='flex items-center justify-center text-sm text-gray-500'>
                {props.row.original.firstName} {props.row.original.lastName}
              </div>
            </>
          );
        }
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
      // {
      //   Header: "Last Name",
      //   accessor: "lastName"
      // },
      {
        Header: "Username",
        accessor: "username"
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Store",
        accessor: "storeName",
        // Cell method will provide the cell value; we pass it to render a custom component
        // Cell: ({ cell: { value } }) => <Genres values={value} />
      },

      {
        Header: "Phone",
        accessor: "phoneNumber"
      },
      {
        Header: "Balance",
        Cell: (props) => {
          return (
            <>
              <div className='flex items-center justify-center text-sm text-gray-500'>
                {props.row.original.orderPriceSum} USDT
              </div>
            </>
          );
        }
      },
      {
        Header: "Activation",
        accessor: "acceptedByAdmin",
        Cell: (props) => {
          return (
            <>
              <div >
                <Toggle value={props.row.original.acceptedByAdmin} email={props.row.original.email} />
              </div>
              {/* {value ? "true" : "false"} */}
            </>
          );
        }
      },
    ],
    []
  );


  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow,// Prepare the row (this function needs to be called for each row before getting the row props)
    setFilter,
  } = useTable({
    columns,
    data
  },
    useFilters
  );

  return (
    <div>
      <AdminNavBar />
      {loading && <div className='grid w-full h-full place-items-center mt-36'> <CircularProgress style={{ 'color': '#5B21B6' }}></CircularProgress></div>
      }
      {!loading &&
       <div className="mt-16 mx-48 flex flex-col">
                {/* SEARCH */}
                <form className='mb-4'>
    <div class="flex">
        {/* <button id="dropdown-button" data-dropdown-toggle="dropdown" class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">All <svg aria-hidden="true" class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button> */}
        {/* <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
            <li>
                <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Name</button>
            </li>
            <li>
                <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Username</button>
            </li>
            <li>
                <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Email</button>
            </li>
            <li>
                <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Store name</button>
            </li>
            </ul>
        </div> */}
        <div class="relative w-full">
            <input type="search" id="search-dropdown" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Names" onChange={handleFilterChange}/>
            <button type="button" onClick={handleSearchBtn} class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg aria-hidden="true" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <span class="sr-only">Search</span>
            </button>
        </div>
    </div>
</form>
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
                          className="group px-0 py-3 text-left text-sm font-medium text-gray-500 tracking-wider"
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
                              className="px-0 py-4 whitespace-nowrap"
                              role="cell"
                            >
                              {cell.column.Cell.name === "defaultRenderer"
                                ? <div className="flex items-center justify-center text-sm text-gray-500 ">{cell.render('Cell')}</div>
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

