import React, {useState, useEffect} from 'react';
import {onSnapshot, collection, DocumentData} from 'firebase/firestore';
import {db} from '../../../Config/Firebase-config';

import TableUI from './TableUI';

const DataTable = () => {
  const [usersData, setUsersData] = useState<DocumentData[]>([]);

  useEffect(() => {
    const databaseRef = collection(db, 'techwondoe-intern-assignment-users');

    const unsubscribe = onSnapshot(databaseRef, snapshot => {
      const tempData: DocumentData[] = [];
      snapshot.forEach(doc => {
        tempData.push(doc.data());
      });
      setUsersData(tempData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="w-full p-4 bg-white my-6 rounded-lg drop-shadow-md">
        <h1 className="text-3xl flex items-center">
          Users{' '}
          <span className="text-sm px-3 py-1 ml-2 rounded-full bg-green-200 text-green-700 font-medium">
            {usersData.length} Users
          </span>
        </h1>
        <p className="text-gray-600 text-sm">
          Manage your team members and their account permissions here.
        </p>
      </div>
      <TableUI usersData={usersData} />
    </>
  );
};

export default DataTable;
