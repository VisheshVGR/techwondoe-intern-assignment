import React from 'react';
import logo from '../Assets/logo.svg';
const Navbar = () => {
  return (
    <>
      <div className="p-6 bg-black ">
        <h1 className="text-3xl flex justify-center text-gray-400">
          <img src={logo} className="h-[30px] inline-block mr-2" />| Intern
          Assignment
        </h1>
      </div>
    </>
  );
};

export default Navbar;
