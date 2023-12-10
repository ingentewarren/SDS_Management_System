import React, { useContext } from 'react';
import UserContextProvider from '../../../context/userContextProvider';
import { UserContext } from '../../../context/userContextProvider';

const Navbar = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="w-screen flex flex-row items-center p-1 justify-between bg-slate-100 shadow-xs">
      <div className="ml-8 text-lg text-gray-700 hidden md:flex">My Website</div>
      <span className="w-screen md:w-1/3 h-10 bg-gray-200 cursor-pointer border border-gray-300 text-sm rounded-full flex">
        <input type="search" name="search" placeholder="Search" className="flex-grow px-4 rounded-l-full rounded-r-full text-sm focus:outline-none" />
      </span>
      <div className="flex flex-row-reverse mr-4 ml-4 md:hidden">
        <i className="fas fa-bars"></i>
      </div>
      <div className="flex flex-row-reverse mr-8 md:flex">
        {user ? (
          <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">{user.firstname}</div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
