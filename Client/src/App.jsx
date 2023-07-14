import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Admin from './admin/Admin';
import NotFound from './NotFound';
import Customer from './customer/Customer';
import LoginSignup from './customer/pages/LoginSignup';

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/*" element={<Customer/>} />
        <Route path='/login' element={<LoginSignup />} />
        <Route path='/signup' element={<LoginSignup />} />
        <Route path="/admin/*" element={<Admin/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App