import React, { useContext } from 'react'
import { BsPlus } from "react-icons/bs";
import { IoFilter, IoSettings, IoCaretDown } from "react-icons/io5";
import Item from '../components/Item';
import CreateContext from '../context/createContext';
const Product = () => {
  const {mode} = useContext(CreateContext);
  return (
    <div className={`p-12 h-screen ${mode === "dark" ? "bg-slate-700 text-slate-200" : "bg-white text-gray-600"}`}>
      <header className='flex items-center justify-between'>
        <div>
          <h1 className={`text-5xl ${mode === "light" ? "text-slate-700" : "text-white"} mb-2`}>Product</h1>
          <h3 className={`text-xl ${mode === "light" ? "text-slate-500" : "text-white"}`}>3 entries found</h3>
        </div>
        <button className='bg-blue-500 flex p-4 text-xl font-bold items-center justify-center rounded-2xl text-white'>
          <BsPlus className='mr-2 w-10 h-10' />
          <span className='pointer-events-none'>Add New Product</span>
        </button>
      </header>
      <div className='my-14 flex w-full justify-between'>
        <button className='flex p-3 items-center text-2xl rounded-md justify-center border border-gray-300'>
          <IoFilter className='w-7 h-7 mr-3' />
          <span>Filters</span>
        </button>
        <button className='flex p-3 items-center text-2xl rounded-md text-inherit justify-center border border-gray-300'>
          <IoSettings className='w-7 h-7 mr-2' />
          <IoCaretDown className='w-5 h-5' />
        </button>
      </div>
      <section className={`w-full border border-b-0 shadow-md ${mode === "dark" ? "shadow-slate-800 border-slate-400" : "shadow-slate-200 border-slate-300"} rounded`}>
        <div className={`flex w-full h-16 text-xl items-center ${mode === "dark" ? "bg-slate-800 border-slate-400" : "bg-slate-100 border-gray-300"} border-b`}>
          <span className='w-1/12 px-4'>Image</span>
          <hr className={`w-[1px] h-full ${mode === "dark" ? "bg-slate-400" : "bg-slate-300"}`}></hr>
          <span className='w-1/6 px-4'>Id</span>
          <hr className={`w-[1px] h-full ${mode === "dark" ? "bg-slate-400" : "bg-slate-300"}`}></hr>
          <span className='w-1/6 px-4'>Name</span>
          <hr className={`w-[1px] h-full ${mode === "dark" ? "bg-slate-400" : "bg-slate-300"}`}></hr>
          <span className='w-1/6 px-4'>Type</span>
          <hr className={`w-[1px] h-full ${mode === "dark" ? "bg-slate-400" : "bg-slate-300"}`}></hr>
          <span className='w-1/6 px-4'>Description</span>
          <hr className={`w-[1px] h-full ${mode === "dark" ? "bg-slate-400" : "bg-slate-300"}`}></hr>
          <span className='w-1/6 px-4'>State</span>
          <hr className={`w-[1px] h-full ${mode === "dark" ? "bg-slate-400" : "bg-slate-300"}`}></hr>
          <span className='w-1/12 px-4'>Edit</span>
        </div>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
      </section>
    </div>
  )
}

export default Product