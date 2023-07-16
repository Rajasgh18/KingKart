import React, { useContext, useState } from 'react';
import { BsSpeedometer2 } from "react-icons/bs";
import { BsArchive } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { BsBoxSeam } from "react-icons/bs";
import { SiChatbot } from "react-icons/si";
import { FaListUl, FaRegUserCircle } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import CreateContext from '../context/createContext';
const Sidebar = () => {
    const { show, setShow } = useContext(CreateContext);
    const location = useLocation().pathname;
    const activeLink = 'btn flex gap-3 items-center text-blue-400';
    const inactiveLink = 'btn flex gap-3 items-center';

    return (
        <aside className={`${show ? "left-0" : "-left-full"} transition-all duration-500 ease-in-out fixed w-auto md:sticky md:min-h-screen top-0 h-full flex bg-blue-950 gap-6 flex-col`}>
            <div className='h-14 w-full bg--500 gap-2 flex items-center justify-center px-4'>
                <header className='gap-2 flex items-center'>
                    
                    <span className="text-2xl font-['viga'] text-white">kingkart</span>
                </header>
                <RxCross2 onClick={() => show ? setShow(false) : setShow(true)} className='md:hidden absolute right-3 text-white w-7 h-7' />
            </div>
            <div className='p-8 pt-0 pr-20 gap-6 flex flex-col items-start text-xl text-white'>
                <Link to='/admin' className={location === '/admin/' || location === '/admin' ? activeLink : inactiveLink}>
                    {(location === '/admin' || location === '/admin/') && <div id='active' className='absolute left-0 w-2 rounded-tr-md rounded-br-md h-10 bg-blue-400'></div>}
                    <BsSpeedometer2 className='w-6 h-6' />
                    Dashboard
                </Link>
                <Link to='/admin/users' className={location === '/admin/users' ? activeLink : inactiveLink}>
                    {location === '/admin/users' && <div id='active' className='absolute left-0 w-2 rounded-tr-md rounded-br-md h-10 bg-blue-400'></div>}
                    <FaRegUserCircle className='w-6 h-6' />
                    Users
                </Link>
                <Link to='/admin/orders' className={location === '/admin/orders' ? activeLink : inactiveLink}>
                    {location === '/admin/orders' && <div id='active' className='absolute left-0 w-2 rounded-tr-md rounded-br-md h-10 bg-blue-400'></div>}
                    <BsBoxSeam className='w-6 h-6' />
                    Orders
                </Link>
                <Link to='/admin/category' className={location === '/admin/category' ? activeLink : inactiveLink}>
                    {location === '/admin/category' && <div id='active' className='absolute left-0 w-2 rounded-tr-md rounded-br-md h-10 bg-blue-400'></div>}
                    <FaListUl className='w-6 h-6' />
                    Categories
                </Link>
                <Link to='/admin/products' className={location.includes('/admin/products') ? activeLink : inactiveLink}>
                    {location.includes('/admin/products') && <div id='active' className='absolute left-0 w-2 rounded-tr-md rounded-br-md h-10 bg-blue-400'></div>}
                    <BsArchive className='w-6 h-6' />
                    Products
                </Link>
                <Link to='/admin/settings' className={location === '/admin/settings' ? activeLink : inactiveLink}>
                    {location === '/admin/settings' && <div id='active' className='absolute left-0 w-2 rounded-tr-md rounded-br-md h-10 bg-blue-400'></div>}
                    <SiChatbot className='w-6 h-6' />
                    Queries
                </Link>
  
            </div>
        </aside>
    )
}

export default Sidebar