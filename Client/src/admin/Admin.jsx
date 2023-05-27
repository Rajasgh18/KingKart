import React from 'react'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ModeContext from './context/ModeContext';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Settings from './pages/Settings';
import EditProduct from './pages/EditProduct';
import AddProduct from './pages/AddProduct';
import ProductDetails from './pages/ProductDetails';

const Admin = () => {
  return (
    <ModeContext>
      <div className='flex min-w-screen min-h-screen'>
        <Sidebar />
        <div className='w-4/5'>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route exact path="/products" element={<Products />} />
            <Route path='/products/:id' element={<EditProduct />} />
            <Route path='/products/details' element={<ProductDetails />} />
            <Route path='/products/add' element={<AddProduct />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </ModeContext>
  )
}

export default Admin