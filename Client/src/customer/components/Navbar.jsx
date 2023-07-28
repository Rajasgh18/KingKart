import React, { useContext, useEffect, useRef, useState } from 'react';
import { BsSearch, BsCart3 } from "react-icons/bs";
import { IoLogOutOutline, IoHomeOutline, IoInformationCircleOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { FaUserTie } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { PiSquaresFour } from "react-icons/pi";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import SearchResult from './SearchResult';

const Navbar = () => {
    const { user } = useContext(UserContext);
    const dropDownRef1 = useRef(null);
    const dropDownBoxRef1 = useRef(null);
    const dropDownRef2 = useRef(null);
    const dropDownBoxRef2 = useRef(null);
    const searchBoxRef = useRef(null);
    const searchResultRef = useRef(null);
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchClicked, setSearchClicked] = useState(false);
    const Navigate = useNavigate();
    const location = useLocation().pathname;

    const handleDropDown1 = () => {
        if (isOpen1) {
            dropDownBoxRef1.current.style.animation = 'dropHide 0.3s ease-in-out';
            setTimeout(() => {
                setIsOpen1(false)
            }, 250);
        } else {
            setIsOpen1(true)
        }
    }
    const handleDropDown2 = () => {
        if (isOpen2) {
            dropDownBoxRef2.current.style.animation = 'dropHide 0.3s ease-in-out';
            setTimeout(() => {
                setIsOpen2(false)
            }, 250);
        } else {
            setIsOpen2(true)
        }
    }

    const handleClickOutside = (event) => {
        if (isOpen1 && dropDownRef1.current && !dropDownRef1.current.contains(event.target)) {
            dropDownBoxRef1.current.style.animation = 'dropHide 0.3s ease-in-out';
            setTimeout(() => {
                setIsOpen1(false)
            }, 250);
        }
        if (isOpen2 && dropDownRef2.current && !dropDownRef2.current.contains(event.target)) {
            dropDownBoxRef2.current.style.animation = 'dropHide 0.3s ease-in-out';
            setTimeout(() => {
                setIsOpen2(false)
            }, 250);
        }
    };
    const handleSearchClickOutside = (event) => {
        if (searchResultRef.current && searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
            searchResultRef.current.style.animation = 'dropHide 0.3s ease-in-out';
            setTimeout(() => {
                setSearchQuery('');
            }, 250);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        document.addEventListener('click', handleSearchClickOutside);
        document.addEventListener('click', handleSearchClick);

        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('click', handleSearchClickOutside);
            document.removeEventListener('click', handleSearchClick);
        };
    }, [isOpen1, isOpen2]);

    const handleSearchClick = (event) => {
        const sb = document.getElementById('searchBar');
        if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
            sb.style.animation = 'searchBoxDisappear 0.4s ease-in-out';
            setTimeout(() => {
                setSearchClicked(false);
            }, 300);
        } else {
            sb.style.animation = '';
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userId');
        Navigate('/login');
    }

    return (
        <nav className='lg:h-14 sm:h-12 h-10 z-50 transition-all sticky top-0 bg-[#0C1934] justify-evenly flex items-center'>
            <Link to='/' className='w-1/4'>
                <img className='lg:h-14 sm:h-12 h-10' src="/assets/logo.png" alt="" />
            </Link>
            <div className='md:flex items-center hidden text-lg gap-10'>
                <Link to='/' className={`underline-animation transition-all duration-200 rounded-md ${location === '/' ? "text-[#f00] underline underline-offset-8" : "text-white"}`}>Home</Link>
                <Link to='/categories' className={`underline-animation transition-all duration-200 rounded-md ${location.includes('/categories') ? "text-[#f00] underline underline-offset-8" : "text-white"}`}>Categories</Link>
                <Link to='/about-us' className={`underline-animation transition-all duration-200 rounded-md ${location.includes('/about-us') ? "text-[#f00] underline underline-offset-8" : "text-white"}`}>About Us</Link>
            </div>
            <div className='w-1/4 flex items-center justify-end gap-5'>
                <div ref={searchBoxRef} className='relative flex justify-center flex-col'>
                    <div onClick={() => { setSearchClicked(true) }} className={`flex justify-center items-center ${searchClicked ? "bg-white text-slate-600 rounded-md p-1 px-2" : "bg-transparent text-white"} items-center gap-2`}>
                        <label htmlFor='searchBar' className='peer'><BsSearch className='lg:w-5 lg:h-5 sm:w-4 sm:h-4 cursor-pointer hover:scale-125 transition-transform text-inherit' /></label>
                        <input onChange={(e) => { setSearchQuery(e.target.value) }} value={searchQuery} id='searchBar' type="text" placeholder='Search here...' className={`focus:outline-none ${searchClicked ? "w-52" : "w-0"} w-0 peer-focus:w-52 transition-all duration-500 lg:text-lg sm:text-md text-base text-slate-600`} />
                    </div>
                    {searchQuery && <SearchResult searchResultRef={searchResultRef} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
                </div>
                {user._id && <div ref={dropDownRef2} className='cursor-pointer relative'>
                    <CiUser onClick={handleDropDown2} className='text-white w-7 h-7 hover:scale-125 transition-transform duration-5=700' />
                    {isOpen2 && <div ref={dropDownBoxRef2} className='absolute dropDownShow text-slate-700 text-lg p-3 px-3 right-0 rounded-md shadow-[0_0_10px] shadow-slate-400 bg-white mt-5'>
                        <button className='flex p-1 items-center whitespace-nowrap gap-2'><FaUserTie className='w-5 h-5' />{user.name}</button>
                        <button className='flex p-1 items-center whitespace-nowrap gap-2'><MdEmail className='w-5 h-5' />{user.username}</button>
                    </div>}
                </div>}
                <Link to="/cart" className='sm:flex hidden'>
                    <BsCart3 className={`w-6 h-6 cursor-pointer transition-transform hover:scale-125 ${location.includes('/cart') ? "text-red-500" : "text-white"}`} />
                    <span className='bg-red-600 absolute px-[0.4rem] font-bold ml-4 -mt-2 text-white text-sm h-fit w-fit rounded-full'>{user?.cartItems?.length}</span>
                </Link>
                <div className='sm:flex hidden justify-end'>
                    {user._id ? <IoLogOutOutline onClick={handleLogout} className='w-7 h-7 text-white cursor-pointer transition-transform hover:scale-125' /> : <Link to='/login' className='text-white text-lg underline-animation'>Login</Link>}
                </div>
                <div ref={dropDownRef1} className='sm:hidden relative flex'>
                    <div onClick={handleDropDown1} className={`flex flex-col gap-[0.375rem] ${isOpen1 ? "border-red-500" : "border-white"} cursor-pointer hover:border-red-500`}>
                        <div className={`border-b-2 w-6 border-inherit rounded-full ease-in-out transition-all relative duration-200 ${isOpen1 ? "rotate-45 top-2" : "top-0"}`} />
                        <div className={`border-b-2 w-6 border-inherit rounded-full ease-in-out transition-all duration-200 ${isOpen1 ? "w-[0]" : ""}`} />
                        <div className={`border-b-2 w-6 border-inherit rounded-full ease-in-out transition-all relative duration-200 ${isOpen1 ? "-rotate-45 bottom-2" : "bottom-0"}`} />
                    </div>
                    {isOpen1 && <div ref={dropDownBoxRef1} className='absolute px-4 right-0 dropDownShow text-slate-600 bg-white flex flex-col gap-2 rounded shadow-[0_0_10px_0] shadow-slate-500 mt-8 py-2'>
                        <Link to='/' className='flex gap-1 items-center hover:text-red-600 transition-all duration-600'><IoHomeOutline className='w-6 h-6' />Home</Link>
                        <Link to='/categories' className='flex items-center hover:text-red-600 transition-all duration-600 gap-1'><PiSquaresFour className='w-6 h-6' />Categories</Link>
                        <Link to='/about-us' className='flex items-center hover:text-red-600 transition-all duration-600 gap-1'><IoInformationCircleOutline className='w-6 h-6' />About</Link>
                        <Link to='/cart' className=' flex gap-1 items-center text-slate-600 hover:text-red-600'>
                            <div className='flex relative'>
                                <BsCart3 className={`w-6 h-6 mr-1 cursor-pointer ${location.includes('/cart') ? "text-red-500" : "text-inherit"}`} />
                                <span className='bg-red-600 flex pt-[0.05rem] absolute px-[0.3rem] font-bold -top-1 ml-4 text-white text-[0.6rem] h-fit w-fit rounded-full'>{user?.cartItems?.length}</span>
                            </div>
                            Cart</Link>
                        <button onClick={handleLogout} className='flex hover:text-red-500 items-center gap-1'><IoLogOutOutline className='w-7 h-7' />{user._id ? "Logout" : "Login"}</button>
                    </div>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar