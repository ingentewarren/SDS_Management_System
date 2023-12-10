// Dashboard.jsx

import React, { Fragment, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Trash from '../Sidebar/Part/Trash';
import { Storage } from '../Sidebar/Part/Storage';

const Dashboard = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const handleSidebarItemClick = (item) => {
    setSelectedItem(item);
    navigate(`/dashboard/${item}`);
  };

  return (
      <div className='h-screen overflow-hidden flex flex-col'>
        <Navbar />
        <div className='flex w-full'>
          <div className='w-[280px]'>
            {/* Pass both functions to Sidebar */}
            <Sidebar onSidebarItemClick={handleSidebarItemClick}/>
          </div>
          <div>
              <Routes>
                <Route path='/trash' element={<Trash />} />
                <Route path='/storage' element={<Storage />} />
              </Routes>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;
