
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
  
}


export default Navbar