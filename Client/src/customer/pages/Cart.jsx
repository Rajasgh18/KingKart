import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import CartItem from '../components/CartItem';
import { TailSpin } from 'react-loader-spinner';
import axios from 'axios';

const Cart = () => {
  const { url, userId } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [isLoader, setIsLoader] = useState(true);
  const [isDelete, setIsDelete] = useState(true);
  const [itemDetails, setItemDetails] = useState({offerPrice: 0, mrp: 0, discount: 0, deliveryCharge: 0});

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await axios.get(`${url}/user/cart-items/${userId}`);
        setCartItems(res.data);
        setIsLoader(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCartItems();
  }, [isDelete])

  useEffect(()=>{
    setItemDetails({offerPrice: 0, mrp: 0, discount: 0, deliveryCharge: 0})
    cartItems.forEach((item) => {
      itemDetails.offerPrice += item.offerPrice
      itemDetails.mrp += item.mrp;
      itemDetails.discount += item.mrp - item.offerPrice;
      itemDetails.deliveryCharge += item.deliveryCharge;
    })
    setItemDetails(itemDetails);
  }, [cartItems, isDelete])

  return (
    <>
      {!isLoader ? <section className='mx-20 flex-grow my-5 flex gap-5'>
        <aside className='w-[70%] h-full rightAppear relative rounded bg-white shadow-[0_0_8px] shadow-slate-300'>
          {cartItems.length !== 0 ? cartItems.map(item => {
            return <CartItem setIsDelete={setIsDelete} key={item._id} cartDetails={item} />;
          }) : <div className='text-center p-4 flex-grow'>"No Items in the cart"</div>}
        </aside>
        <aside className='w-[30%] sticky top-[4.8rem] leftAppear h-fit rounded bg-white shadow-[0_0_8px] p-4 shadow-slate-300'>
          <table className='w-full flex flex-col'>
            <thead className='border-b-2'>
              <tr className='py-2'>
                <td className='font-viga w-full text-lg text-slate-600'>PRICE DETAILS ({cartItems.length} items)</td>
              </tr>
            </thead>
            <tbody className='flex flex-col text-slate-600'>
              <tr className='flex justify-between py-2 '>
                <td>MRP</td>
                <td className='font-viga'>Rs {itemDetails.mrp}</td>
              </tr>
              <tr className='flex justify-between py-2 '>
                <td>Offer Price</td>
                <td className='font-viga'>Rs {itemDetails.offerPrice}</td>
              </tr>
              <tr className='flex justify-between py-2'>
                <td>Discount</td>
                <td className='font-viga'>- / Rs {itemDetails.discount}</td>
              </tr>
              <tr className='flex justify-between py-2'>
                <td>Delivery Charges</td>
                <td className='font-viga'>+ Rs {itemDetails.deliveryCharge}</td>
              </tr>
              <tr className='flex justify-between py-2 border-t-2'>
                <td className='text-lg font-bold'>Total Amount</td>
                <td className='font-viga text-lg'>Rs {itemDetails.offerPrice + itemDetails.deliveryCharge}</td>
              </tr>
            </tbody>
          </table>
        </aside>
      </section> : <div className='flex justify-center items-center flex-grow w-full'><TailSpin height={60} width={60} color='rgb(139 92 246)' /></div>}
    </>
  )
}

export default Cart