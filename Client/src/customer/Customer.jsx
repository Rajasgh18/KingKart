import React, { useContext, useEffect } from 'react'
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Categories from './pages/Categories';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import { UserContext } from './context/UserContext';


const Customer = () => {
  const { getUser, changes, setChanges, userId } = useContext(UserContext);
  useEffect(() => {
    setChanges(1)
    getUser();
  }, [userId, changes]);

  return (
    <div className='flex flex-col min-h-screen flex-grow bg-slate-100'>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/:id' element={<ProductPage />} />
        <Route exact path='/categories' element={<Categories />} />
        <Route exact path='/cart' element={<Cart />} />
      </Routes>
    </div>
  );
};

export default Customer