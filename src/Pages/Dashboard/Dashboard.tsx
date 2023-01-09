import React from 'react';

import DataTable from './DataTable/DataTable';

const Dashboard = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-2 my-4 bg-sky-100 rounded">
        <DataTable />
      </div>
    </>
  );
};

export default Dashboard;
