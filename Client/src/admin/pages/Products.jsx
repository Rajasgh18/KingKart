import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { BsPlus } from "react-icons/bs";
import { IoFilter, IoSettings, IoCaretDown } from "react-icons/io5";
import Loader from '../components/Loader';
import CreateContext from '../context/createContext';
import axios from 'axios';
import ItemTable from '../components/ItemTable';

const Products = () => {
  const { mode } = useContext(CreateContext);

  const [isLoader, setIsLoader] = useState(true);
  const url = 'http://localhost:5000/api';
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await axios.get(`${url}/product/`);
        setProductList(products.data);
        setIsLoader(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProducts();
  }, [productList])

  return (
    <section className={`flex flex-col p-12 flex-grow gap-12 ${mode === "dark" ? "bg-slate-700 text-slate-200" : "bg-white text-gray-600"}`}>
      <header className='flex items-center justify-between'>
        <div className='gap-2'>
          <h1 className={`text-4xl ${mode === "light" ? "text-slate-700" : "text-white"}`}>Product</h1>
          <h3 className={`text-lg ${mode === "light" ? "text-slate-500" : "text-white"}`}>{productList.length} entries found</h3>
        </div>
        <Link to="/admin/products/add" className='btnPrimary p-3  text-md font-bold '>
          <BsPlus className='w-8 h-8' />
          Add New Product
        </Link>
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
      <ItemTable productList={productList} isLoader={isLoader} />
      {isLoader && <Loader />}
    </section>
  )
}

export default Products