import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './Components/Auth/SignIn';
import SignUp from './Components/Auth/SignUp';
import Dashboard from './Components/Dashboard/Dashboard';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import UserContextProvider from '../context/userContextProvider';

 axios.defaults.baseURL = 'http://localhost:8000';
 axios.defaults.withCredentials = true;

const App = () => {
  return (
    <UserContextProvider>
      <Toaster position='bottom' toastOptions={{ duration: 2000 }} />
      <Router>
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/dashboard/*' element={<Dashboard />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
};

export default App;
