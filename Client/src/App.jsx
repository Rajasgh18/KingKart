import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Admin from './admin/Admin';
import NotFound from './NotFound';
import Customer from './customer/Customer';

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/*" element={<Customer/>} />
        <Route path="/admin/*" element={<Admin/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App