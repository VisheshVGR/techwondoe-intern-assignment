import React from 'react';
import {Route, Routes} from 'react-router-dom';

import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Dashboard from './Pages/Dashboard/Dashboard';

const Routing = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Routing;
