import React from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import {Link} from 'react-router-dom';
const Navbar = () => {
    return (
        <div className='h-14 px-10 z-50 sticky top-0 bg-violet-500 justify-between flex items-center'>
            <Link to='/' className='text-3xl text-white font-bold'>KingKart</Link>
            <div className='p-[0.3rem] bg-white rounded-lg flex items-center w-1/4 px-2 gap-3'>
                <BsSearch className='w-5 h-5 text-slate-600'/>
                <input type="text" placeholder='Search here...' className='focus:outline-none text-lg w-full text-slate-600'/>
            </div>
            <div className='flex items-center text-white text-lg gap-4'>
                <Link to='/' className='hover:bg-white transition-all duration-200 hover:text-violet-500 p-1 px-3 rounded-md'>Home</Link>
                <Link to='/categories' className='hover:bg-white transition-all duration-200 hover:text-violet-500 p-1 px-3 rounded-md'>Categories</Link>
                <Link to='/settings' className='hover:bg-white transition-all duration-200 hover:text-violet-500 p-1 px-3 rounded-md'>Settings</Link>
            </div>
            <div className='flex items-center gap-5'>
                <FaShoppingCart className='w-6 h-6 text-white cursor-pointer transition-transform hover:scale-125' />
                <IoSettings className='w-6 h-6 text-white cursor-pointer transition-transform hover:scale-125' />
            </div>
        </div>
    )
}

export default Navbar