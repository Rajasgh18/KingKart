import React, { useContext, useEffect, useState } from 'react'
import { BsPlus } from "react-icons/bs";
import { IoFilter, IoSettings, IoCaretDown } from "react-icons/io5";
import Loader from '../components/Loader';
import Item from '../components/Item';
import CreateContext from '../context/createContext';
import axios from 'axios';

const Products = () => {
  const { mode } = useContext(CreateContext);
  const boxItemBorder = `w-[1px] h-full ${mode === "dark" ? "bg-slate-400" : "bg-slate-300"}`;

  const [isLoader, setIsLoader] = useState(true);
  const url = 'http://localhost:5000/api';
  const [productList, setProductList] = useState([]);

  useEffect(()=>{
    const fetchProducts = async()=>{
      try {
        const products = await axios.get(`${url}/admin/product/`);
        setProductList(products.data);
        setIsLoader(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProducts();
  }, [])

  return (
    <div className={`flex flex-col p-12 flex-grow gap-12 ${mode === "dark" ? "bg-slate-700 text-slate-200" : "bg-white text-gray-600"}`}>
      <header className='flex items-center justify-between'>
        <div className='gap-2'>
          <h1 className={`text-4xl ${mode === "light" ? "text-slate-700" : "text-white"}`}>Product</h1>
          <h3 className={`text-lg ${mode === "light" ? "text-slate-500" : "text-white"}`}>3 entries found</h3>
        </div>
        <button className='btnPrimary p-3  text-md font-bold '>
          <BsPlus className='w-8 h-8' />
          Add New Product
        </button>
      </header>
      <div className='flex w-full justify-between'>
        <button className='flex p-2 px-3 items-center gap-2 text-xl rounded-md justify-center border border-gray-300'>
          <IoFilter className='w-7 h-7' />
          Filters
        </button>
        <button className='flex p-3 px-3 items-center gap-2 text-xl rounded-md text-inherit justify-center border border-gray-300'>
          <IoSettings className='w-7 h-7' />
          <IoCaretDown className='w-4 h-4' />
        </button>
      </div>
      <section className={`w-full border border-b-0 shadow-md ${mode === "dark" ? "shadow-slate-800 border-slate-400" : "shadow-slate-200 border-slate-300"} rounded`}>
        <div className={`flex w-full h-12 text-lg items-center ${mode === "dark" ? "bg-slate-800 border-slate-400" : "bg-slate-100 border-gray-300"} border-b`}>
          <span className='w-1/3 px-4'>Id</span>
          <hr className={boxItemBorder}></hr>
          <span className='itemBoxPrimary'>Name</span>
          <hr className={boxItemBorder}></hr>
          <span className='itemBoxPrimary'>Type</span>
          <hr className={boxItemBorder}></hr>
          <span className='itemBoxPrimary'>Category</span>
          <hr className={boxItemBorder}></hr>
          <span className='itemBoxPrimary'>More Details</span>
          <hr className={boxItemBorder}></hr>
          <span className='w-1/12 px-4'>Edit</span>
        </div>
        {productList.map(product => {
          return <Item key={product._id} details={product} />
        })}
      </section>
      {isLoader && <Loader />}
    </div>
  )
}

export default Products