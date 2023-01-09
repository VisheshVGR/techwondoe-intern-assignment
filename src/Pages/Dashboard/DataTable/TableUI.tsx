import React, {useMemo} from 'react';
import {
  useTable,
  useSortBy,
  Column,
  useGlobalFilter,
  usePagination,
} from 'react-table';
import {DocumentData} from 'firebase/firestore';
import {UpArrowIcon, DownArrowIcon} from '../../../Components/Icons';

import EditUserModal from './EditUserModal';
import DeleteUserModal from './DeleteUserModal';
import AddUserModal from './AddUserModal';
import DownloadDataButton from './DownloadDataButton';

const TableUI = ({usersData}: {usersData: DocumentData[]}) => {
  const columns = useMemo(() => COLUMNS, [COLUMNS]);
  const data = useMemo(() => usersData, [usersData]);
  console.log(usersData);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {globalFilter, pageIndex, pageSize} = state;

  return (
    <>
      <div className="rounded-tl-lg border-b-2 border-gray-100 rounded-tr-lg w-full bg-white px-4 py-6 flex gap-4 items-center justify-center">
        <input
          value={globalFilter || ''}
          onChange={e => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="grow border border-blue-100 focus-visible:border-blue-800 focus-visible:bg-gray-100 outline-none rounded-md p-2 shadow-sm focus:shadow-lg"
        />
        <DownloadDataButton usersData={usersData} />
        <AddUserModal />
      </div>

      <table {...getTableProps()} className="w-full bg-white">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="pl-4 pr-2 py-4 text-start text-gray-600 "
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <DownArrowIcon />
                      ) : (
                        <UpArrowIcon />
                      )
                    ) : (
                      ''
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="odd:bg-gray-100">
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()} className="pl-4 pr-2 py-4">
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="rounded-bl-lg border-t-2 border-gray-100 rounded-br-lg w-full bg-white px-4 py-6 flex gap-4 items-center justify-between">
        <div>
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="rounded-md p-2  border border-gray-300 hover:bg-gray-200 active:bg-gray-400 disabled:bg-gray-300 mr-2"
          >
            {'<<'}
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="rounded-md p-2  border border-gray-300 hover:bg-gray-200 active:bg-gray-400 disabled:bg-gray-300"
          >
            Previous
          </button>
        </div>

        <div>
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
          <input
            type="number"
            defaultValue={pageIndex + 1}
            placeholder="Go To"
            onChange={e => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            className="w-[75px] mx-3 border-1 border-blue-100 focus-visible:border-blue-800 focus-visible:bg-gray-100 outline-none rounded-md p-2 shadow-sm focus:shadow-lg"
          />
          <select
            value={pageSize}
            onChange={e => setPageSize(Number(e.target.value))}
            className="w-[100px] border border-blue-100 focus-visible:border-blue-800 focus-visible:bg-gray-100 outline-none rounded-md p-2 shadow-sm focus:shadow-lg"
          >
            {[5, 10, 20, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="rounded-md p-2  border border-gray-300 hover:bg-gray-200 active:bg-gray-400 disabled:bg-gray-300"
          >
            Next
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className="rounded-md p-2  border border-gray-300 hover:bg-gray-200 active:bg-gray-400 disabled:bg-gray-300 ml-2"
          >
            {'>>'}
          </button>
        </div>
      </div>

      <div></div>
    </>
  );
};

export default TableUI;

const COLUMNS: Column<DocumentData>[] = [
  {
    Header: 'Name',
    accessor: 'name',
    Cell: allData => {
      const currCellData = allData.row.original;
      return (
        <>
          <div className="flex flex-row">
            <img
              src={currCellData.photoUrl || ''}
              alt="Profile Photo"
              className="rounded-full drop-shadow-lg w-[50px] h-[50px] mr-3"
            />
            <div className="flex justify-center flex-col">
              <div className="font-medium">{currCellData.name}</div>
              <div className="text-gray-600 text-sm">{currCellData.email}</div>
            </div>
          </div>
        </>
      );
    },
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: allData => {
      const currCellData = allData.row.original;
      if (currCellData.status === 'Invited') {
        return (
          <>
            <span className="w-[90px] rounded-full bg-gray-300 py-1 px-3 flex items-center">
              <div className="inline-block w-[7px] h-[7px]  mr-2 rounded-full bg-gray-700" />
              {currCellData.status}
            </span>
          </>
        );
      }

      return (
        <>
          <span className="w-[90px]  rounded-full bg-green-200 py-1 px-2 flex items-center">
            <div className="inline-block w-[7px] h-[7px]  mr-2 rounded-full bg-green-700" />
            {currCellData.status}
          </span>
        </>
      );
    },
  },
  {
    Header: 'Role',
    accessor: 'role',
    Cell: allData => {
      const currCellData = allData.row.original;
      return (
        <>
          <div className="text-gray-600">{currCellData.role}</div>
        </>
      );
    },
  },
  {
    Header: 'Last Login',
    accessor: 'lastOnlineTime',
    Cell: allData => {
      const currCellData = allData.row.original;
      return (
        <>
          <div>{currCellData.lastOnlineDate}</div>
          <div className="text-gray-600 text-sm">
            {currCellData.lastOnlineTime}
          </div>
        </>
      );
    },
  },
  {
    Header: '',
    accessor: 'lastOnlineDate',
    Cell: allData => {
      return (
        <>
          <div className="flex justify-between">
            <DeleteUserModal data={allData.row.original} />
            <EditUserModal data={allData.row.original} />
          </div>
        </>
      );
    },
  },
];
