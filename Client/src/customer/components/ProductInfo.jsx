import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { FaLocationArrow, FaSearchLocation } from 'react-icons/fa'
import { MdLocationPin } from 'react-icons/md'
import { UserContext } from '../context/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductInfo = ({ productDetail, imgIndex, setImgIndex }) => {

    const Navigate = useNavigate();
    const { url } = useContext(UserContext);
    const [colorProduct, setColorProduct] = useState([]);
    const location = useLocation().pathname;

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const res = await axios.get(`${url}/product/search?products=${productDetail.name}`);
                setColorProduct(res.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchSearchResults();
    }, []);

    return (
        <div className='flex flex-col lg:gap-8 md:gap-6 sm:gap-4 gap-2'>
            <div className='flex justify-between md:w-2/3 w-full'>
                <h3 className='text-slate-700 md:text-lg text-base'>Color</h3>
                <div className='flex gap-4 w-[60%]'>
                    {colorProduct.length !== 0 && colorProduct.map((i, index) => {
                        return <img key={index} onClick={() => Navigate(`/${i._id}`)} src={`/assets/productImg/${i.img[0]}`} className={`${location === '/' + i._id && "border-2 border-blue-500"} cursor-pointer imgLoad w-16 h-16 object-contain bg-slate-200 rounded`} alt="" />
                    })}
                </div>
            </div>
            <div className='flex justify-between md:w-2/3 w-full'>
                <h3 className='text-slate-700 md:text-lg text-base'>Highlights</h3>
                <ul className='flex flex-col list-disc pl-4 md:gap-2 gap-1 md:text-md text-sm text-slate-700 w-[60%]'>
                    {productDetail.highlights.length !== 0 && productDetail.highlights.map((highlight, index) => {
                        return <li key={index}>{highlight}</li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default ProductInfo