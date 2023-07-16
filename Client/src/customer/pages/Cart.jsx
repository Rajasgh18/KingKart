import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import CartItem from '../components/CartItem';
import { TailSpin } from 'react-loader-spinner';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Cart = () => {
  const { url, user, userId, Navigate } = useContext(UserContext);
  const query = useLocation().search;
  const [cartItems, setCartItems] = useState([]);
  const [isLoader, setIsLoader] = useState(true);
  const [paymentLoader, setPaymentLoader] = useState(false);
  const [itemDetails, setItemDetails] = useState({ offerPrice: 0, mrp: 0, discount: 0, deliveryCharge: 0 });
  const [orderCredentials, setorderCredentials] = useState({ name: user.name, username: user.username, city: '', postalCode: '', streetAddress: '', country: '' });

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await axios.post(`${url}/user/cart-items`, { ids: user.cartItems });
        setCartItems(res.data);
        setIsLoader(false);
        setItemDetails(prev => {
          let d = { ...prev };
          d.offerPrice = 0;
          d.mrp = 0;
          d.discount = 0;
          d.deliveryCharge = 0;
          res.data.forEach(item => {
            const q = user.cartItems?.filter(i => i === item._id).length;
            d.offerPrice += q * item.offerPrice
            d.mrp += item.mrp;
            d.discount += item.mrp - item.offerPrice;
            d.deliveryCharge += item.deliveryCharge;
          })
          return d
        })
        const productsEle = document.getElementsByClassName('rightAppear');
        Array.from(productsEle).forEach((product, index) => {
          product.style.display = 'flex';
          const delay = (index + 1) * 150;
          product.style.animation = `appearRight ${delay}ms ease-in-out`;
        });
      } catch (error) {
        console.error(error);
      }
    }
    fetchCartItems();
  }, [user])

  const handleOrderChange = (e) => {
    setorderCredentials({ ...orderCredentials, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPaymentLoader(true);
    try {
      const res = await axios.post(`${url}/order/`, { ...orderCredentials, products: user.cartItems })
      setPaymentLoader(false);
      if (res.data.url)
        window.location = res.data.url;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (query === '?success=1') {
      const clearCart = async () => {
        try {
          const res = await axios.post(`${url}/user/cart-clear`, { userId });
          console.log(res.data);
        } catch (error) {
          console.error(error);
        }
      }
      clearCart();
      setTimeout(() => {
        Navigate('/');
      }, 5000);
    }
  }, [])

  return (
    <>
      {query === '?success=1'
        ? <div className='flex flex-col orderPlacedAnim gap-2 bg-white rounded-lg items-center w-fit m-auto my-10 p-5 py-10 shadow-[0_0_8px] shadow-slate-300'>
          <h1 className='text-3xl font-viga text-slate-600'>YOUR ORDER HAS BEEN PLACED</h1>
          <p className='text-xl text-slate-500'>Thank you for the order, we will email you soon about the order details</p>
        </div>
        : (!isLoader ? <section className='lg:mx-20 md:mx-16 sm:mx-12 flex-grow my-5 flex gap-5'>
          <aside className='w-[70%] flex flex-col flex-grow rounded bg-white shadow-[0_0_8px] shadow-slate-300'>
            {cartItems.length !== 0 ? cartItems.map((item, index) => {
              return <CartItem key={item._id} cartDetails={item} />;
            }) : <div className='text-center p-4 flex-grow text-lg text-slate-700'>Your Cart is empty</div>}
          </aside>
          <aside className='w-[30%] flex flex-col gap-3 sticky leftAppear top-[4.8rem] h-fit '>
            <table className='w-full flex flex-col rounded bg-white shadow-[0_0_8px] p-4 shadow-slate-300'>
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
            <form onSubmit={handleSubmit} className='w-full flex flex-col gap-2 text-slate-700 rounded bg-white shadow-[0_0_8px] p-4 shadow-slate-300'>
              <h1 className='font-viga text-slate-600 text-xl'>ORDER INFORMATION</h1>
              <input name='name' onChange={handleOrderChange} value={orderCredentials.name} type="text" placeholder='Name' className='w-full bg-slate-100 p-2 focus:outline-none border-2 border-slate-300 rounded' />
              <input name='username' onChange={handleOrderChange} value={orderCredentials.username} type="text" placeholder='Username' className='w-full bg-slate-100 p-2 focus:outline-none border-2 border-slate-300 rounded' />
              <div className='flex gap-2'>
                <input name='city' onChange={handleOrderChange} value={orderCredentials.city} type="text" placeholder='City' className='w-full bg-slate-100 p-2 focus:outline-none border-2 border-slate-300 rounded' />
                <input name='postalCode' onChange={handleOrderChange} value={orderCredentials.postalCode} type="text" placeholder='Postal Code' className='w-full bg-slate-100 p-2 focus:outline-none border-2 border-slate-300 rounded' />
              </div>
              <input name='streetAddress' onChange={handleOrderChange} value={orderCredentials.streetAddress} type="text" placeholder='Street Address' className='w-full bg-slate-100 p-2 focus:outline-none border-2 border-slate-300 rounded' />
              <input name='country' onChange={handleOrderChange} value={orderCredentials.country} type="text" placeholder='Country' className='w-full bg-slate-100 p-2 focus:outline-none border-2 border-slate-300 rounded' />
              <button type='submit' className='w-full p-2 m-2 bg-blue-500 hover:bg-blue-600 rounded text-white text-lg flex justify-center'>{!paymentLoader ? "Continue to Payment" : <TailSpin width={28} height={28} color='white' />}</button>
            </form>
          </aside>
        </section> : <div className='flex justify-center items-center flex-grow w-full'><TailSpin height={60} width={60} color='rgb(139 92 246)' /></div>)}
    </>
  )
}

export default Cart