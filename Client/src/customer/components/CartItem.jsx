import axios from 'axios';
import React, { useContext, useRef } from 'react'
import { AiFillStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const CartItem = ({ cartDetails }) => {
    const { user } = useContext(UserContext);
    const Navigate = useNavigate();
    const currentItem = useRef(null);
    const handleClick = () => {
        Navigate(`/${cartDetails._id}`)
    }

    const handleRemove = async () => {
        try {
            currentItem.current.classList += " removeItem"
            setTimeout(async () => {
                const res = await axios.put(`http://localhost:5000/api/user/cart-remove/${user._id}`, { productId: cartDetails._id })
            }, [400])
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div ref={currentItem} className='item p-5 relative w-full h-1/4 flex gap-4 border-b-2'>
            <aside className='w-[12%] h-full'>
                <img onClick={handleClick} src={`/assets/productImg/${cartDetails?.img[0]}`} className='cursor-pointer w-full imgLoad h-full object-contain' alt="" />
            </aside>
            <aside className='flex flex-col gap-1'>
                <h3 onClick={handleClick} className='text-lg cursor-pointer text-slate-700'>{cartDetails?.name}</h3>
                <span className='flex rounded px-1 bg-green-500 text-white items-center justify-center gap-1 w-fit'>{cartDetails?.rating}<AiFillStar /></span>
                <div className='flex gap-2 items-end'>
                    <span className='text-lg text-slate-700 font-viga'>Rs {cartDetails?.offerPrice}</span>
                    <span className='text text-slate-500 line-through'>Rs {cartDetails?.mrp}</span>
                    <span className='text text-green-600'>{Math.round(((cartDetails?.mrp - cartDetails?.offerPrice) / cartDetails?.mrp) * 100)}%off</span>
                </div>
                <button onClick={handleRemove} className='w-fit hover:bg-red-600 hover:scale-105 transition-transform p-1 px-2 rounded-md bg-red-500 text-white text-md'>Remove</button>
            </aside>
        </div>
    )
}

export default CartItem