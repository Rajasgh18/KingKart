import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import Category from '../components/Category';

const Categories = () => {

  const {url} = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  const Navigate = useNavigate();
  const [isLoader, setIsLoader] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${url}/category/`);
        setCategories(res.data);
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
    fetchCategories();
  }, [])

  return (
    <>
      {!isLoader ? <div className='flex flex-grow flex-col w-full p-10'>
        <h1 className='text-4xl text-blue-500 font-viga'>CATEGORIES</h1>
        <div className='grid grid-cols-5 gap-8 p-10'>
          {categories.length !== 0 && categories.map(category => {
            return <Category key={category._id} details={category}/>
          })}
        </div>
      </div> : <div className='flex flex-grow items-center justify-center'><TailSpin width={60} height={60} color="blue" /></div>}
    </>
  )
}

export default Categories