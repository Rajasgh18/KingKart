import React, { useContext, useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Background from '../components/Background';
import Product from '../components/Product';
import axios from 'axios';
import Loader from '../components/Loader';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [products, SetProducts] = useState([]);
  const [isLoader, setIsLoader] = useState(true);
  const userId = localStorage.getItem('userId');
  const Navigate = useNavigate();

  const backgroundRef = useRef([]);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.id === "headings" ? entry.target.classList.add('rightAppear') : entry.target.classList.add('leftAppear');
      } else {
        entry.target.id === "headings" ? entry.target.classList.remove('rightAppear') : entry.target.classList.remove('leftAppear');
      }
    });
  },
    { rootMargin: '0px' }
  );

  useEffect(()=>{
    if(!userId) Navigate('/login');
  }, [])

  backgroundRef && useEffect(() => {
    backgroundRef.current.forEach((element, index) => {
      if (element) {
        observer.observe(element);
      }
    });
    return () => {
      backgroundRef.current.forEach((element) => {
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/product');
        SetProducts(res.data);
        setIsLoader(false);
        const productsEle = document.getElementsByClassName('bottomAppear');
        Array.from(productsEle).forEach((product, index) => {
          const delay = (index + 1) * 100;
          product.style.animation = `appearBottom ${delay}ms ease-in-out`;
        });
      } catch (error) {
        console.error(error);
      }
    }
    fetchProducts();
  }, [])


  return (
    <div className='flex-1 flex flex-col px-10'>
      <Background backgroundRef={backgroundRef} />
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