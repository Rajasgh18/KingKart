import React from 'react';
import { FaTag } from 'react-icons/fa';

const Offer = () => {
    return (
        <div className='flex flex-col gap-2'>
            <h3 className='text-lg font-bold text-slate-600'>Available Offers</h3>
            <div className='px-2 flex flex-col gap-2'>
                <p className='flex gap-2 text-slate-700 items-center'><FaTag className='text-green-500 h-4 w-4' /> <strong className='text-slate-600'>Bank Offer </strong>5% Cashback on Flipkart Axis Bank Card <strong className='text-blue-500'>T&C</strong></p>
                <p className='flex gap-2 text-slate-700 items-center'><FaTag className='text-green-500 h-4 w-4' /> <strong className='text-slate-600'>Bank Offer </strong>₹4000 Off On HDFC Bank Credit Card Transactions <strong className='text-blue-500'>T&C</strong></p>
                <p className='flex gap-2 text-slate-700 items-center'><FaTag className='text-green-500 h-4 w-4' /> <strong className='text-slate-600'>Bank Offer </strong>₹4000 Off On HDFC Bank Debit Card EMI Transactions <strong className='text-blue-500'>T&C</strong></p>
                <p className='flex gap-2 text-slate-700 items-center'><FaTag className='text-green-500 h-4 w-4' /> <strong className='text-slate-600'>Special Price </strong>Get extra ₹8901 off (price inclusive of cashback/coupon) <strong className='text-blue-500'>T&C</strong></p>
                <p className='flex gap-2 text-slate-700 items-center'><FaTag className='text-green-500 h-4 w-4' /> <strong className='text-slate-600'>No cost EMI ₹2,959/month. </strong>Standard EMI also available <strong className='text-blue-500'>View More</strong></p>
            </div>
        </div>
    )
}

export default Offer