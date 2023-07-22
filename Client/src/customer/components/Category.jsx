import React from 'react';
import { useNavigate } from 'react-router-dom';

const Category = ({ details }) => {
    const Navigate = useNavigate();
    return (
        <div onClick={() => { Navigate(`/products?category=${details.categoryName}`) }} className={`flex justify-end relative items-center bg-white flex-col bottomAppear gap-2 cursor-pointer transition-transform hover:scale-110 duration-300 rounded shadow-[0_2px_8px_1px] shadow-slate-300`}>
            <img src={`/assets/productImg/${details.categoryImg}`} className='h-52 w-52 p-2 object-contain' alt="" />
            <p className='absolute w-full text-xl text-center bg-[#1D2B66] bg-opacity-70 rounded-bl rounded-br p-4 text-white'>{details.categoryName}</p>
        </div>
    )
}

export default Category;