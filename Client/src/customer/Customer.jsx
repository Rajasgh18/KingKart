import React, { useContext, useEffect } from 'react'
import Navbar from './components/Navbar';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Categories from './pages/Categories';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import { UserContext } from './context/UserContext';
import QueryProducts from './pages/QueryProducts';
import ChatBot from './components/ChatBot';


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
        <Route exact path='/products' element={<QueryProducts />} />
      </Routes>
      {userId === '64958bb127e9d080f9ead0e2' && <Link to='/admin' className='fixed bottom-16 left-16 bg-green-400 text-white font-viga p-3 px-4 rounded-md text-lg border-green-500 border-2'>Admin</Link>}
      <ChatBot />
    </div>
  );
};

export default Customer