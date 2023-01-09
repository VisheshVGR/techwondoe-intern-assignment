import React from 'react';
import './App.css';

import Routing from './Routing';

const App = () => {
  return (
    <>
      <div className="min-h-[100vh] flex flex-col min-w-[768px]">
        <Routing />
      </div>
    </>
  );
};

export default App;
