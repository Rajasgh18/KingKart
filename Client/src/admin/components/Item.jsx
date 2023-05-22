import React, { useContext } from 'react'
import CreateContext from '../context/createContext';
import { MdDelete } from "react-icons/md";
import { RiPencilFill } from "react-icons/ri";
const Item = () => {
    const {mode} = useContext(CreateContext);
    return (
        <div className={`flex w-full h-24 text-lg ${mode === "light" ? "text-slate-600 border-gray-400" : "text-white border-gray-300"} items-center border-b`}>
            <span className='w-1/12 flex items-center justify-center'><img src="/assets/a64b345016e96adfb8849af5521c8e0ecfe8f027-555x555.webp" alt="img" className='h-20 w-20' /></span>
            <hr className={`w-[1px] h-full ${mode === "dark" ? "bg-slate-400" : "bg-slate-300"}`}></hr>
            <span className='w-1/6 px-4'>0xjkfdrsvjhiu</span>
            <hr className={`w-[1px] h-full ${mode === "dark" ? "bg-slate-400" : "bg-slate-300"}`}></hr>
            <span className='w-1/6 px-4'>Boat Headphone</span>
            <hr className={`w-[1px] h-full ${mode === "dark" ? "bg-slate-400" : "bg-slate-300"}`}></hr>
            <span className='w-1/6 px-4'>Over the Ears Headphone</span>
            <hr className={`w-[1px] h-full ${mode === "dark" ? "bg-slate-400" : "bg-slate-300"}`}></hr>
            <span className='w-1/6 px-4'>Nice and comfy with 40mm drivers</span>
            <hr className={`w-[1px] h-full ${mode === "dark" ? "bg-slate-400" : "bg-slate-300"}`}></hr>
            <span className='w-1/6 flex items-center justify-center px-4'><span className='p-2 bg-green-200 text-green-500 border-2 border-green-400 rounded'>Published</span></span>
            <hr className={`w-[1px] h-full ${mode === "dark" ? "bg-slate-400" : "bg-slate-300"}`}></hr>
            <span className='w-1/12 flex items-center justify-evenly px-4'>
                <RiPencilFill className='w-7 h-7 cursor-pointer'/>
                <MdDelete className='w-7 h-7 cursor-pointer'/>
            </span>
        </div>
    )
}

export default Item