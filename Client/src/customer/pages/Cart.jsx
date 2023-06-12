import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import CartItem from '../components/CartItem';
import Loader from '../components/Loader';

const Cart = () => {
  const { user } = useContext(UserContext);
  const [isLoader, setIsLoader] = useState(true);
  let offerPrice = 0;
  let mrp = 0;
  let discount = 0;
  let deliveryCharge = 0;
  user?.cartItems.length !== 0 && user?.cartItems.forEach(item => {
    offerPrice += item.offerPrice;
    mrp += item.mrp;
    discount += item.mrp - item.offerPrice;
    deliveryCharge += item.deliveryCharge;
  });

  return (
    <section className='mx-20 my-5 flex gap-5 flex-'>
      <aside className='w-[70%] h-full rightAppear relative rounded bg-white shadow-[0_0_8px] shadow-slate-300'>
        {isLoader ? user?.cartItems.map(item => {
          return <CartItem key={item._id} cartDetails={item} />;
        })
          : <Loader />
        }
      </aside>
      <aside className='w-[30%] leftAppear relative h-fit rounded bg-white shadow-[0_0_8px] p-4 shadow-slate-300'>
        <table className='w-full flex flex-col'>
          <thead className='border-b-2'>
            <tr className='py-2'>
              <td className='font-viga w-full text-lg text-slate-600'>PRICE DETAILS ({user?.cartItems.length} items)</td>
            </tr>
          </thead>
          <tbody className='flex flex-col text-slate-600'>
            <tr className='flex justify-between py-2 '>
              <td>MRP</td>
              <td className='font-viga'>Rs {mrp}</td>
            </tr>
            <tr className='flex justify-between py-2 '>
              <td>Offer Price</td>
              <td className='font-viga'>Rs {offerPrice}</td>
            </tr>
            <tr className='flex justify-between py-2'>
              <td>Discount</td>
              <td className='font-viga'>- / Rs {discount}</td>
            </tr>
            <tr className='flex justify-between py-2'>
              <td>Delivery Charges</td>
              <td className='font-viga'>+ Rs {deliveryCharge}</td>
            </tr>
            <tr className='flex justify-between py-2 border-t-2'>
              <td className='text-lg font-bold'>Total Amount</td>
              <td className='font-viga text-lg'>Rs {offerPrice + deliveryCharge}</td>
            </tr>
          </tbody>
        </table>
      </aside>
    </section>
  )
}

export default Cart