import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';

const Product = ({ details }) => {
    const Navigate = useNavigate();
    const handleProduct = () => {
        Navigate(`/${details._id}`)
    }

    const handleNameLength = (len) => {
        if (details.name.length > len)
            return details.name.substring(0, len) + "...";
        else
            return details.name;
    }

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div onClick={handleProduct} className='flex flex-col bottomAppear rounded-lg hover:text-blue-500 md:gap-2 gap-1 text-slate-600 justify-start'>
            <img src={`/assets/productImg/${details.img[0]}`} className='my-2 p-2 cursor-pointer transition-transform hover:scale-110 duration-300 object-contain shadow-[0_2px_8px_1px] shadow-slate-300 bg-white rounded-md w-[100%] h-[100%]' alt="" />
            <div className='flex flex-col md:gap-2 gap-1 bg-white shadow-[0_2px_8px_1px] shadow-slate-300 rounded p-3'>
                <h3 className='lg:text-lg md:text-md text-inherit  font-bold'>{screenWidth >= 1280 ? handleNameLength(20) : screenWidth >= 1112 ? handleNameLength(16) : handleNameLength(12)}</h3>
                <span className='flex rounded px-1 bg-green-500 text-white items-center justify-center gap-1 w-fit'>{details.rating}<AiFillStar /></span>
                <div className='flex flex-wrap lg:gap-2 md:gap-1 gap-[0.2rem] items-end'>
                    <span className='md:text-lg text-base text-slate-700 font-viga'>Rs {details.offerPrice}</span>
                    <span className='lg:text-lg md:text-md sm:text-base text-sm text-slate-500 line-through'>Rs {details.mrp}</span>
                    <span className='lg:text-lg md:text-md sm:text-base text-sm text-green-600'>{Math.round(((details.mrp - details.offerPrice) / details.mrp) * 100)}%off</span>
                </div>
            </div>
        </div>
    )
}

export default Product