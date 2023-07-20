import axios from 'axios';
import React, { useContext, useRef, useState } from 'react'
import { AiFillStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const CartItem = ({ cartDetails }) => {
    const { user, setChanges, userId, setUser, url } = useContext(UserContext);
    const Navigate = useNavigate();
    const currentItem = useRef(null);
    const [quantity, setQuantity] = useState(user.cartItems?.filter(item => item === cartDetails._id).length);
    const handleClick = () => {
        Navigate(`/${cartDetails._id}`)
    }

    const handleRemove = async () => {
        try {
            currentItem.current.style.animation = 'disappearItem 0.7s ease-in-out';
            setTimeout(async () => {
                currentItem.current.style.display = 'none';
            }, [400]);
            const res = await axios.put(`${url}/user/cart-remove/${user._id}`, { productId: cartDetails._id })
            setChanges(prev => [prev++]);
        } catch (error) {
            console.error(error)
        }
    }

    const handleIncrease = async () => {
        try {
            const res = await axios.put(`${url}/user/cart-increase/${userId}`, { productId: cartDetails._id });
            setQuantity(prev => [++prev]);
            setUser({ ...user, cartItems: res.data });
        } catch (error) {
            console.error(error);
        }
    }
    const handleDecrease = async () => {
        try {
            const res = await axios.put(`${url}/user/cart-decrease/${userId}`, { productId: cartDetails._id });
            console.log(res.data);
            setQuantity(prev => [--prev]);
            setUser({ ...user, cartItems: res.data });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div ref={currentItem} className='item p-4 rightAppear flex w-full md:h-[200px] h-[150px] items-center gap-4 border-b-2'>
            <aside className='md:w-[20%] sm:w-[30%] w-[40%] h-full'>
                <img onClick={handleClick} src={`/assets/productImg/${cartDetails?.img[0]}`} className='cursor-pointer w-full imgLoad h-full object-contain' alt="" />
            </aside>
            <aside className='flex flex-col md:gap-2 gap-1'>
                <h3 onClick={handleClick} className='lg:text-xl gap-16 md:text-lg sm:text-base cursor-pointer text-slate-700'>{cartDetails?.name}</h3>
                <span className='flex rounded px-1 bg-green-500 sm:text-base text-sm text-white items-center justify-center gap-1 w-fit'>{cartDetails?.rating}<AiFillStar /></span>
                <div className='flex gap-2 items-end'>
                    <span className='md:text-lg text-slate-700 font-viga'>Rs {quantity * cartDetails?.offerPrice}</span>
                </div>
                <div className='flex md:gap-5 gap-3'>
                    <div className='flex items-center md:gap-3 gap-2 text-base sm:text-lg md:text-xl'>
                        <button onClick={handleDecrease} className='bg-blue-500 hover:scale-110 duration-200 transition-transform md:px-4 px-3 md:rounded-md rounded text-white text-base md:text-2xl'>-</button>
                        <span>{quantity}</span>
                        <button onClick={handleIncrease} className='bg-blue-500 hover:scale-110 duration-200 transition-transform md:px-4 px-3 md:rounded-md rounded text-white text-base md:text-2xl'>+</button>
                    </div>
                    <button onClick={handleRemove} className='w-fit hover:bg-red-600 hover:scale-105 transition-transform px-2 md:rounded-md rounded bg-red-500 text-white md:text-base text-sm'>Remove</button>
                </div>
            </aside>
        </div>
    )
}

export default CartItem