import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './customer/pages/Home';
import Admin from './admin/Admin';
import NotFound from './NotFound';

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/admin/*" element={<Admin/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App