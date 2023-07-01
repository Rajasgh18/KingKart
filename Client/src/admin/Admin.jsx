import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Settings from './pages/Settings';
import Category from './pages/Category';
import EditProduct from './pages/EditProduct';
import AddProduct from './pages/AddProduct';
import ProductDetails from './pages/ProductDetails';
import NotFound from '../NotFound';

const Admin = () => {

  const Navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem('userId') !== '64958bb127e9d080f9ead0e2'){
      Navigate('/');
    }
  }, []);

  return (
    <div className='flex min-w-screen min-h-screen'>
      <Sidebar />
      <div className='flex-grow'>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products name="Product" />} />
          <Route path='/products/:id' element={<EditProduct />} />
          <Route path='/products/details' element={<ProductDetails />} />
          <Route path='/products/add' element={<AddProduct />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/category" element={<Category />} />
          <Route path="/settings" element={<Settings />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      <Link to='/' className='fixed bottom-16 right-16 bg-green-400 text-white font-viga p-3 px-4 rounded-md text-lg border-green-500 border-2'>Customer</Link>
    </div>
  )
}

export default Admin