import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { BsSearch, BsFillBox2Fill } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { HiArchive } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import SearchResult from './SearchResult';
const Navbar = () => {
    const { user } = useContext(UserContext);
    const dropDownRef = useRef(null);
    const dropDownBoxRef = useRef(null);
    const searchBoxRef = useRef(null);
    const searchResultRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const Navigate = useNavigate();

    const handleDropDown = () => {
        if (isOpen) {
            dropDownBoxRef.current.style.animation = 'dropHide 0.3s ease-in-out';
            setTimeout(() => {
                setIsOpen(false)
            }, 250);
        } else {
            setIsOpen(true)
        }
    }

    const handleClickOutside = (event) => {
        if (isOpen && dropDownRef.current && !dropDownRef.current.contains(event.target)) {
            dropDownBoxRef.current.style.animation = 'dropHide 0.3s ease-in-out';
            setTimeout(() => {
                setIsOpen(false)
            }, 250);
        }
    };
    const handleSearchClickOutside = (event) => {
        if (searchResultRef.current && searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
            searchResultRef.current.style.animation = 'dropHide 0.3s ease-in-out';
            setTimeout(() => {
                setSearchQuery('')
            }, 250);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        document.addEventListener('click', handleSearchClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('click', handleSearchClickOutside);
        };
    }, [isOpen]);

    const handleLogout = () => {
        localStorage.removeItem('userId');
        Navigate('/login');
    }

    return (
        <div className='h-14 px-10 z-50 sticky top-0 bg-violet-500 justify-between flex items-center'>
            <Link to='/' className='text-3xl text-white font-bold'>KingKart</Link>
            <div ref={searchBoxRef} className='w-1/4 flex flex-col'>
                <div className='p-[0.3rem] bg-white rounded-lg flex items-center w-full px-2 gap-3'>
                    <label htmlFor="searchBar"><BsSearch className='w-5 h-5 text-slate-600' /></label>
                    <input onChange={(e) => { setSearchQuery(e.target.value) }} value={searchQuery} id='searchBar' type="text" placeholder='Search here...' className='focus:outline-none text-lg w-full text-slate-600' />
                </div>
                {searchQuery && <SearchResult searchResultRef={searchResultRef} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
            </div>
            <div className='flex items-center text-white text-lg gap-4'>
                <Link to='/' className='hover:bg-white transition-all duration-200 hover:text-violet-500 p-1 px-3 rounded-md'>Home</Link>
                <Link to='/categories' className='hover:bg-white transition-all duration-200 hover:text-violet-500 p-1 px-3 rounded-md'>Categories</Link>
                <Link to='/settings' className='hover:bg-white transition-all duration-200 hover:text-violet-500 p-1 px-3 rounded-md'>Settings</Link>
            </div>
            <div className='flex items-center gap-5'>
                <Link to="/cart" className='flex'>
                    <FaShoppingCart className='w-6 h-6 text-white cursor-pointer transition-transform hover:scale-125' />
                    <span className='bg-red-600 absolute px-[0.4rem] font-bold ml-4 -mt-2 text-white text-sm h-fit w-fit rounded-full'>{user?.cartItems?.length}</span>
                </Link>
                <div ref={dropDownRef} className='flex justify-end'>
                    <IoSettings onClick={handleDropDown} className='w-6 h-6 text-white cursor-pointer transition-transform hover:scale-125' />
                    {isOpen && <div ref={dropDownBoxRef} className='absolute dropDownShow text-slate-600 bg-white flex flex-col gap-2 rounded shadow-[0_0_10px_0] shadow-slate-400 mt-8 py-2 w-fit'>
                        <button className='flex hover:bg-violet-500 hover:text-white transition-all duration-600 px-5 py-1 items-center gap-2'><CgProfile className='w-6 h-6' />My Profile</button>
                        <button className='flex hover:bg-violet-500 hover:text-white transition-all duration-600 px-5 py-1 items-center gap-2'><HiArchive className='w-6 h-6' />My Orders</button>
                        <button onClick={handleLogout} className='cursor-pointer flex hover:bg-violet-500 hover:text-white transition-all duration-600 px-5 py-1 items-center gap-2'><FiLogOut className='w-6 h-6' />Logout</button>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Navbar