import React, { useState } from 'react'
import { SiPhpmyadmin } from "react-icons/si";
import { TbEdit } from "react-icons/tb";
import { BsSpeedometer2 } from "react-icons/bs";
import { BsArchive } from "react-icons/bs";
import { BsBoxSeam } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { Link, useLocation, useRoutes } from 'react-router-dom';
const Sidebar = () => {
    const location = useLocation().pathname;
    const activeLink = 'btn flex gap-3 items-center text-blue-400';
    const inactiveLink = 'btn flex gap-3 items-center';

    return (
        <aside className='sticky left-0 bottom-0 flex w-1/5 bg-blue-950 gap-6 flex-col'>
            <header className='h-14 w-full bg-blue-500 gap-2 flex items-center justify-center'>
                <SiPhpmyadmin className='h-12 w-12 fill-white' />
                <span className="text-2xl font-['viga'] text-white">ADMIN</span>
            </header>
            <div className='pl-8 gap-6 flex flex-col items-start text-xl text-white'>
                <Link to='/admin' className={location === '/admin/' || location === '/admin' ? activeLink : inactiveLink}>
                    {location === '/admin/' || location === '/admin' && <div id='active' className='absolute left-0 w-2 rounded-tr-md rounded-br-md h-10 bg-blue-400'></div>}
                    <BsSpeedometer2 className='w-6 h-6' />
                    Dashboard
                </Link>
                <Link to='/admin/orders' className={location === '/admin/orders' ? activeLink : inactiveLink}>
                    {location === '/admin/orders' && <div id='active' className='absolute left-0 w-2 rounded-tr-md rounded-br-md h-10 bg-blue-400'></div>}
                    <BsBoxSeam className='w-6 h-6' />
                    Orders
                </Link>
                <Link to='/admin/products' className={location.includes('/admin/products') ? activeLink : inactiveLink}>
                    {location.includes('/admin/products') && <div id='active' className='absolute left-0 w-2 rounded-tr-md rounded-br-md h-10 bg-blue-400'></div>}
                    <BsArchive className='w-6 h-6' />
                    Products
                </Link>
                <Link to='/admin/settings' className={location === '/admin/settings' ? activeLink : inactiveLink}>
                    {location === '/admin/settings' && <div id='active' className='absolute left-0 w-2 rounded-tr-md rounded-br-md h-10 bg-blue-400'></div>}
                    <FiSettings className='w-6 h-6' />
                    Settings
                </Link>
            </div>
        </aside>
    )
}

export default Sidebar