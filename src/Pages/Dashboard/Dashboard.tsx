import React from 'react';

import DataTable from './DataTable/DataTable';

const Dashboard = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-2 my-6 bg-gray-200 pb-4 rounded">
        <DataTable />
      </div>
    </>
  );
};

export default Dashboard;
