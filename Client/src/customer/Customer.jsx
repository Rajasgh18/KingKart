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
import Footer from './components/Footer';
import About from './pages/About';
import Address from './pages/Address';


const Customer = () => {
  const { getUser, changes, setChanges, userId } = useContext(UserContext);
  useEffect(() => {
    setChanges(1)
    getUser();
  }, [userId, changes]);

  return (
    <div className='flex flex-col min-h-screen flex-grow bg-white'>
      <Navbar />
      <div className='w-full min-h-[calc(100vh-3.5rem)]'>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/:id' element={<ProductPage />} />
          <Route exact path='/categories' element={<Categories />} />
          <Route exact path='/about-us' element={<About />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/products' element={<QueryProducts />} />
          <Route exact path='/address' element={<Address />} />
        </Routes>
        {userId === '64958bb127e9d080f9ead0e2' && <Link to='/admin' className='fixed md:bottom-16 md:left-16 bottom-10 left-10 bg-green-400 text-white font-viga md:p-3 md:px-4 p-2 px-2 rounded-md md:text-lg text-base border-green-500 border-2'>Admin</Link>}
        <ChatBot />
      </div>
      <Footer />
    </div>
  );
};

export default Customer