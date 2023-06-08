import React from 'react'
import { FaLocationArrow, FaSearchLocation } from 'react-icons/fa'
import { MdLocationPin } from 'react-icons/md'

const ProductInfo = ({ productDetail, imgIndex, setImgIndex }) => {
    
    return (
        
        <div className='flex flex-col gap-8'>
            <div className='flex justify-between w-2/3'>
                <h3 className='text-slate-500 font-bold'>Color</h3>
                <div className='grid grid-cols-4 gap-2 w-[60%]'>
                    {productDetail.img.map((i, index) => {
                        return <img key={index} onMouseEnter={() => setImgIndex(index)} src={`/assets/productImg/${i}`} className={`${index === imgIndex && "border-2 border-blue-500"} cursor-pointer imgLoad w-16 h-16 object-contain bg-slate-200 rounded`} alt="" />
                    })}
                </div>
            </div>
            <div className='flex justify-between w-2/3'>
                <h3 className='text-slate-500 font-bold'>Delivery</h3>
                <div className='flex flex-col gap-2 w-[60%]'>
                    <div className='flex gap-2 items-center border-b-2 text-lg text-slate-600 border-blue-500 pb-2'>
                        <MdLocationPin />
                        <input type="text" placeholder='Enter Delivery Pincode' className='bg-transparent focus:outline-none' />
                    </div>
                    <div className='text-sm'><strong className='text-slate-600'>Delivery by 9 Jun, Friday</strong> | <span className='text-green-600'>Free</span> <span className='line-through text-slate-600'>Rs 40</span></div>
                </div>
            </div>
            <div className='flex justify-between w-2/3'>
                <h3 className='text-slate-500 font-bold'>Highlights</h3>
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