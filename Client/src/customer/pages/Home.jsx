import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Background from '../components/Background';
import Product from '../components/Product';
import axios from 'axios';
import Loader from '../components/Loader';

const Home = () => {
  const [products, SetProducts] = useState([]);
  const [isLoader, setIsLoader] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/product');
        SetProducts(res.data);
        setIsLoader(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProducts();
  }, [])

  return (
    <div className='min-h-screen flex flex-col px-10'>
      <Background />
      <h1 className='text-center text-4xl my-10 font-viga text-green-500'>BEST SELLING PRODUCTS</h1>
      <section className='grid grid-cols-5 gap-y-10 px-10'>
        {!isLoader && products.map(p => {
          return <Product key={p._id} details={p} />;
        })
        }
      </section>
      {isLoader && <Loader />}
    </div>
  )
}

export default Home