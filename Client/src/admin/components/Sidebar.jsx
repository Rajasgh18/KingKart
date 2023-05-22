import React, { useState } from 'react'
import { SiPhpmyadmin } from "react-icons/si";
import { TbEdit } from "react-icons/tb";
const Sidebar = () => {
    const [ctgrBtn, setCtgrBtn] = useState("my-2 hover:text-blue-400 text-white");
    const handleClick = (btn) => {
        const btns = document.querySelectorAll('button');
        const active = document.getElementById('active');
        const arr = [...btns];
        arr.forEach(e => {
            if (e === btn.target) {
                e.appendChild(active);  
                e.classList += " text-blue-400"
            }else{
                e.classList = "flex m-2 items-center text-white"
            }
        })
    }
    return (
        <div className='flex w-1/5 bg-blue-950 h-screen flex-col'>
            <header className='h-16 w-full bg-blue-500 flex items-center justify-center'>
                <SiPhpmyadmin className='h-14 w-14 fill-white' />
                <span className="text-3xl font-['viga'] ml-2 text-white">ADMIN</span>
            </header>
            <div className='pt-6 px-6 flex items-center justify-between text-gray-400'>
                <h1 className='text-2xl'>Categories</h1>
                <TbEdit className='h-8 w-8 cursor-pointer'/>
            </div>
            <div className='pl-8 pt-2 flex flex-col items-start text-xl'>
                <button onClick={handleClick} className='flex m-2 items-center text-blue-400'>
                    <div id='active' className='absolute left-0 w-2 rounded-tr-md rounded-br-md h-10 bg-blue-400'></div>
                    <span className={`${ctgrBtn} pointer-events-none text-inherit`}>Speakers</span>
                </button>
                <button onClick={handleClick} className='flex m-2 items-center text-white'>
                    <span className={`${ctgrBtn} pointer-events-none text-inherit`}>Headphone</span>
                </button>
                <button onClick={handleClick} className='flex m-2 items-center text-white'>
                    <span className={`${ctgrBtn} pointer-events-none text-inherit`}>Earbud</span>
                </button>
            </div>
        </div>
    )
}

export default Sidebar