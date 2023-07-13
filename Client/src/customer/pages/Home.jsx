import React, { useContext, useEffect, useRef, useState } from 'react';
import Background from '../components/Background';
import Product from '../components/Product';
import Category from '../components/Category';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import { UserContext } from '../context/UserContext';

const Home = () => {
  const { url } = useContext(UserContext);
  const [products, SetProducts] = useState([]);
  const [categories, SetCategories] = useState([]);
  const [isLoader, setIsLoader] = useState(true);
  const Navigate = useNavigate();

  const backgroundRef = useRef([]);

  // const observer = new IntersectionObserver((entries) => {
  //   entries.forEach((entry) => {
  //     if (entry.isIntersecting) {
  //       entry.target.id === "headings" ? entry.target.classList.add('rightAppear') : entry.target.classList.add('leftAppear');
  //     } else {
  //       entry.target.id === "headings" ? entry.target.classList.remove('rightAppear') : entry.target.classList.remove('leftAppear');
  //     }
  //   });
  // },
  //   { rootMargin: '0px' }
  // );

  // backgroundRef && useEffect(() => {
  //   backgroundRef.current.forEach((element, index) => {
  //     if (element) {
  //       observer.observe(element);
  //     }
  //   });
  //   return () => {
  //     backgroundRef.current.forEach((element) => {
  //       if (element) {
  //         observer.unobserve(element);
  //       }
  //     });
  //   };
  // }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res1 = await axios.get(`${url}/product`);
        const res2 = await axios.get(`${url}/category`);
        SetProducts(res1.data);
        SetCategories(res2.data);
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
  }, []);


  return (
    <>
      {!isLoader ? <div className='flex-1 flex flex-col gap-12'>
        <Background backgroundRef={backgroundRef} />
        <div className='w-full flex justify-center'>
          <div className='w-fit flex justify-center flex-col gap-1'>
            <h1 className='text-center lg:text-4xl md:text-3xl sm:text-2xl text-xl font-viga text-slate-800'>BEST SELLERS</h1>
            <hr className='border-b-2 mx-[10%] border-red-500' />
          </div>
        </div>
        <section className='grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 lg:gap-10 gap-5 lg:px-36 md:px-8 sm:px-6 px-4'>
          {!isLoader && products.map((p, index) => {
            return index < 8 && <Product key={p._id} details={p} />;
          })
          }
        </section>
        <div className='w-full flex justify-center lg:my-10 md:my-8 sm:my-4 my-4'>
          <div className='w-fit flex justify-center flex-col gap-1'>
            <h1 className='text-center lg:text-4xl md:text-3xl sm:text-2xl text-xl font-viga text-slate-800'>BROWSE TOP CATEGORIES</h1>
            <hr className='border-b-2 mx-[10%] border-red-500' />
          </div>
        </div>
        <section className='grid lg:px-36 md:px-8 sm:px-6 px-4 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 lg:gap-10 gap-5'>
          {!isLoader && categories.map((p, index) => {
            return index < 10 && <Category key={p._id} details={p} />;
          })
          }
        </section>
      </div>
        : <div className='flex flex-grow items-center justify-center'><TailSpin height={50} width={50} color='blue' /></div>}
    </>
  )
}

export default Home