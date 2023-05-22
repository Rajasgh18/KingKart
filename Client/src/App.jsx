import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './customer/pages/Home';
import Admin from './admin/Admin';

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/admin/*" element={<Admin/>}/>
      </Routes>
    </>
  )
}

export default App