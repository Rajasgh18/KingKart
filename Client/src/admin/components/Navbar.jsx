import React, { useContext, useEffect } from 'react'
import { MdOutlineSearch, MdDarkMode, MdWbSunny } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import CreateContext from '../context/createContext';
const Navbar = () => {
  const { mode, setMode, show, setShow } = useContext(CreateContext);
  const handleChange = () => {
    if (mode === 'light')
      setMode('dark');
    else
      setMode('light');
  }

  const handleShow = () => {
    show ? setShow(false) : setShow(true);
  }

  useEffect(() => {
  }, [mode]);
  return (
    <div className={`w-full h-14 ${mode === "light" ? "bg-blue-50" : "bg-slate-800"} shadow-md flex items-center justify-between px-10`}>
      <RxHamburgerMenu onClick={handleShow} className={`md:hidden w-6 h-6 cursor-pointer ${show ? "" : ""}`} />
      <div className='flex items-center w-1/3 p-2'>
        <MdOutlineSearch className='w-7 h-7 mr-2 fill-gray-400' />
        <input className='bg-transparent text-xl w-full focus:outline-none' placeholder='Search for an entry...' />
      </div>
      <div>
        {
          mode === "light" ? <MdDarkMode onClick={handleChange} className='w-8 h-8 fill-slate-700 cursor-pointer' /> : <MdWbSunny onClick={handleChange} className='w-8 h-8 fill-yellow-400 cursor-pointer' />
        }
      </div>
    </div>
  )
}

export default Navbar