import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import CartItem from '../components/CartItem';
import { TailSpin } from 'react-loader-spinner';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import DialogBox from '../components/DialogBox';
import Loader from '../components/Loader';

const Cart = () => {
  const { url, user, userId, Navigate, setSelectedProducts } = useContext(UserContext);
  const query = useLocation().search;
  const [cartItems, setCartItems] = useState([]);
  const [isLoader, setIsLoader] = useState(true);
  const [isDialog, setIsDialog] = useState(false);
  const [paymentLoader, setPaymentLoader] = useState(false);
  const [itemDetails, setItemDetails] = useState({ offerPrice: 0, mrp: 0, discount: 0, deliveryCharge: 0 });
  const [orderCredentials, setorderCredentials] = useState({ name: user.name, username: user.username, city: '', postalCode: '', streetAddress: '', country: '' });
  const [text, setText] = useState('');

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
    if (!user._id) return setIsDialog(true);
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

  const handleContinue = () => {
    if (user._id) {
      if (cartItems.length === 0) {
        setText("Please add items to your cart!");
        setIsDialog(true);
      } else {
        setSelectedProducts(cartItems)
        Navigate('/address');
      }
    } else {
      setText('Please Login First!')
      setIsDialog(true);
    }
  }

  return (
    <>
      {query === '?success=1'
        ? <div className='flex flex-col orderPlacedAnim gap-2 bg-white rounded-lg items-center w-fit m-auto my-10 p-5 py-10 shadow-[0_0_8px] shadow-slate-300'>
          <h1 className='text-3xl font-viga text-slate-600'>YOUR ORDER HAS BEEN PLACED</h1>
          <p className='text-xl text-slate-500'>Thank you for the order, we will email you soon about the order details</p>
        </div>
        : (!isLoader ? <section className='lg:mx-20 min-h-[calc(100vh-5.5rem)] md:mx-10 sm:mx-8 mx-0 my-4 flex md:flex-row flex-col md:gap-4 gap-2'>
          <aside className='md:w-[70%] w-full flex flex-col flex-grow rounded bg-white shadow-[0_0_8px] shadow-slate-300'>
            {cartItems.length !== 0 ? cartItems.map((item, index) => {
              return <CartItem key={item._id} cartDetails={item} />;
            }) : <div className='relative flex justify-center items-center p-10 w-full text-center flex-grow text-lg text-slate-700'>
              <h1 className='text-xl'>Your Cart is Empty</h1>
              {/* <img src="/assets/svgs/cart.svg" className='absolute z-0 rounded h-full object-cover w-full' alt="" /> */}
            </div>}
          </aside>
          {isDialog && <DialogBox setIsDialog={setIsDialog} text={text} />}
          <aside className='md:w-[30%] w-full flex flex-col gap-3 sticky leftAppear top-[9%] h-fit '>
            <table className='w-full flex flex-col rounded bg-white shadow-[0_0_8px] p-4 shadow-slate-300'>
              <thead className='border-b-2'>
                <tr className='py-2'>
                  <td className='font-viga w-full lg:text-lg md:text-base text-slate-600'>PRICE DETAILS ({cartItems.length} items)</td>
                </tr>
              </thead>
              <tbody className='flex flex-col gap-2 mt-2 lg:text-base md:text-sm text-slate-600'>
                <tr className='flex justify-between'>
                  <td>MRP</td>
                  <td>&#8377;{itemDetails.mrp}</td>
                </tr>
                <tr className='flex justify-between'>
                  <td>Offer Price</td>
                  <td>&#8377;{itemDetails.offerPrice}</td>
                </tr>
                <tr className='flex justify-between'>
                  <td>Discount</td>
                  <td className='text-green-500'>- &#8377;{itemDetails.discount}</td>
                </tr>
                <tr className='flex justify-between'>
                  <td>Delivery Charges</td>
                  <td>+ &#8377;{itemDetails.deliveryCharge}</td>
                </tr>
                <tr className='flex lg:text-large md:text-base justify-between border-t-2 pt-2'>
                  <td className='font-bold'>Total Amount</td>
                  <td className='font-bold'>&#8377;{itemDetails.offerPrice + itemDetails.deliveryCharge}</td>
                </tr>
              </tbody>
            </table>
            <section className='md:flex hidden sticky items-center justify-between bottom-0 w-full text-slate-700 bg-white shadow-[0_0_8px] lg:p-4 p-3 shadow-slate-300 rounded'>
              <div>
                <p className='font-bold md:text-lg text-base'>&#8377;{itemDetails.offerPrice + itemDetails.deliveryCharge}</p>
                <p className='text-blue-600 cursor-pointer text-sm'>view price details</p>
              </div>
              <button onClick={handleContinue} className='bg-slate-700 hover:bg-slate-800 h-fit py-2 text-white px-4 rounded md:rounded-md md:text-lg'>Continue</button>
            </section>
            {/* <form onSubmit={handleSubmit} className='w-full lg:text-base md:text-xs flex flex-col gap-2 text-slate-700 rounded bg-white shadow-[0_0_8px] p-4 shadow-slate-300'>
              <h1 className='font-viga text-slate-600 lg:text-xl md:text-base'>ORDER INFORMATION</h1>
              <input name='name' onChange={handleOrderChange} value={orderCredentials.name} type="text" placeholder='Name' className='w-full bg-slate-100 lg:p-2 md:p-1 focus:outline-none border-2 border-slate-300 rounded' />
              <input name='username' onChange={handleOrderChange} value={orderCredentials.username} type="text" placeholder='Username' className='w-full bg-slate-100 lg:p-2 md:p-1 focus:outline-none border-2 border-slate-300 rounded' />
              <div className='flex gap-2'>
                <input name='city' onChange={handleOrderChange} value={orderCredentials.city} type="text" placeholder='City' className='w-full bg-slate-100 lg:p-2 md:p-1 focus:outline-none border-2 border-slate-300 rounded' />
                <input name='postalCode' onChange={handleOrderChange} value={orderCredentials.postalCode} type="text" placeholder='Postal Code' className='w-full bg-slate-100 lg:p-2 md:p-1 focus:outline-none border-2 border-slate-300 rounded' />
              </div>
              <input name='streetAddress' onChange={handleOrderChange} value={orderCredentials.streetAddress} type="text" placeholder='Street Address' className='w-full bg-slate-100 lg:p-2 md:p-1 focus:outline-none border-2 border-slate-300 rounded' />
              <input name='country' onChange={handleOrderChange} value={orderCredentials.country} type="text" placeholder='Country' className='w-full bg-slate-100 lg:p-2 md:p-1 focus:outline-none border-2 border-slate-300 rounded' />
              <button type='submit' className='w-full lg:p-2 md:p-1 my-2 bg-blue-500 hover:bg-blue-600 rounded text-white lg:text-lg md:text-md flex justify-center'>{!paymentLoader ? "Continue to Payment" : <TailSpin width={28} height={28} color='white' />}</button>
            </form> */}
          </aside>
          <section className='flex md:hidden sticky items-center justify-between bottom-0 w-full text-slate-700 bg-white shadow-[0_0_8px] lg:p-4 p-3 shadow-slate-300 rounded'>
            <div>
              <p className='font-bold md:text-lg text-base'>&#8377;{itemDetails.offerPrice + itemDetails.deliveryCharge}</p>
              <p className='text-blue-600 cursor-pointer text-sm'>view price details</p>
            </div>
            <button onClick={handleContinue} className='bg-slate-700 hover:bg-slate-800 h-fit py-2 text-white px-4 rounded md:rounded-md md:text-lg'>Continue</button>
          </section>
        </section> : <Loader />)}
    </>
  )
}

export default Cart