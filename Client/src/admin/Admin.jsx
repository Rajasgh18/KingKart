import React from 'react'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom';
import AdminHome from './pages/AdminHome';
import Product from './pages/Product';
import ModeContext from './context/ModeContext';

const Admin = () => {
  return (
    <ModeContext>
      <div className='flex'>
        <Sidebar />
        <div className='w-4/5'>
          <Navbar />
          <Routes>
            <Route path="/" element={<AdminHome />} />
            <Route path="/item" element={<Product />} />
          </Routes>
        </div>
      </div>
    </ModeContext>
  )
}

export default Admin