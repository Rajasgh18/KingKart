import React from 'react'
import {useNavigate} from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';

const Product = ({details}) => {
    const Navigate = useNavigate();
    const handleProduct = ()=>{
        Navigate(`/${details._id}`)
    }
    return (
        <div onClick={handleProduct} className='flex flex-col hover:text-blue-500 gap-2 text-slate-600 justify-start'>
            <img src={`/assets/productImg/${details.img[0]}`} className='my-2 p-2 cursor-pointer bg-slate-200 transition-transform hover:scale-110 duration-300 rounded-lg object-contain w-[90%] h-[90%]' alt="" />
            <h3 className='text-lg text-inherit  font-bold'>{details.name}</h3>
            <span className='flex rounded px-1 bg-green-500 text-white items-center justify-center gap-1 w-fit'>{details.rating}<AiFillStar /></span>
                  <div className='flex gap-2 items-end'>
                    <span className='text-lg text-slate-700 font-viga'>Rs {details.price}</span>
                    <span className='text text-slate-500 line-through'>Rs 7,999</span>
                    <span className='text text-green-600'>11%off</span>
                  </div>
        </div>
    )
}

export default Product