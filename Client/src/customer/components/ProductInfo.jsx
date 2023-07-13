import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { FaLocationArrow, FaSearchLocation } from 'react-icons/fa'
import { MdLocationPin } from 'react-icons/md'
import { UserContext } from '../context/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductInfo = ({ productDetail, imgIndex, setImgIndex }) => {

    const Navigate = useNavigate();
    const {url} = useContext(UserContext);
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
        <div className='flex flex-col gap-8'>
            <div className='flex justify-between w-2/3'>
                <h3 className='text-slate-700 text-lg'>Color</h3>
                <div className='flex gap-4 w-[60%]'>
                    {colorProduct.length !== 0 && colorProduct.map((i, index) => {
                        return <img key={index} onClick={()=> Navigate(`/${i._id}`)} src={`/assets/productImg/${i.img[0]}`} className={`${location === '/'+i._id && "border-2 border-blue-500"} cursor-pointer imgLoad w-16 h-16 object-contain bg-slate-200 rounded`} alt="" />
                    })}
                </div>
            </div>
            <div className='flex justify-between w-2/3'>
                <h3 className='text-slate-700 text-lg'>Delivery</h3>
                <div className='flex flex-col gap-2 w-[60%]'>
                    <div className='flex gap-2 items-center border-b-2 text-lg text-slate-600 border-blue-500 pb-2'>
                        <MdLocationPin className='text-red-500' />
                        <input type="text" placeholder='Enter Delivery Pincode' className='bg-transparent focus:outline-none' />
                    </div>
                    <div className='text-sm'><strong className='text-slate-600'>Delivery by 9 Jun, Friday</strong></div>
                </div>
            </div>
            <div className='flex justify-between w-2/3'>
                <h3 className='text-slate-700 text-lg'>Highlights</h3>
                <ul className='flex flex-col list-disc pl-4 gap-2 text-md text-slate-700 w-[60%]'>
                    <li>10W with powerfull bass</li>
                    <li>15.49 cm (6.1 inch) Super Retina XDR Display</li>
                    <li>A15 Bionic Chip, 6 Core Processor Processor</li>
                </ul>
            </div>
        </div>
    )
}

export default ProductInfo