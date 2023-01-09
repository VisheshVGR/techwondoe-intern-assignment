import React from 'react';
import {DocumentData} from 'firebase/firestore';
import {DownloadIcon} from '../../../Components/Icons';

const DownloadDataButton = ({usersData}: {usersData: DocumentData[]}) => {
  const download = () => {
    const items = usersData;

    const replacer = (_key: unknown, value: null) =>
      value === null ? '' : value; // specify how you want to handle null values here
    // const header = Object.keys(items[0])
    const header = [
      'id',
      'name',
      'email',
      'role',
      'status',
      'lastOnlineDate',
      'lastOnlineTime',
    ];
    const csv = [
      header.join(','), // header row first
      ...items.map(row =>
        header
          .map(fieldName => JSON.stringify(row[fieldName], replacer))
          .join(',')
      ),
    ].join('\r\n');

    // Create link and download
    const link = document.createElement('a');
    // link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(csv));
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURI(csv));

    link.setAttribute('download', 'User Data');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <>
      <button
        onClick={download}
        className="rounded-md py-2 px-4 text-gray-700 hover:bg-gray-200 border border-gray-400 cursor-pointer flex itemsblue-center "
      >
        <DownloadIcon /> Download CSV
      </button>
    </>
  );
};

export default DownloadDataButton;
