import React, { useContext, useEffect, useState } from 'react'
import Loader from '../components/Loader';
import { UserContext } from '../context/UserContext';
import { AiFillStar } from 'react-icons/ai';


const Address = () => {

  const { user, selectedProducts, Navigate } = useContext(UserContext);
  const [isLoader, setIsLoader] = useState(true);
  const [addresses, setAddresses] = useState([0, 1, 2, 3]);

  useEffect(() => {
    if (selectedProducts.length !== 0) return setIsLoader(false);
    Navigate('/')
  }, [])

  return (
    <>
      {!isLoader ? <section className='lg:mx-20 min-h-[calc(100vh-5.5rem)] md:mx-10 sm:mx-8 mx-0 my-4 flex md:flex-row flex-col md:gap-4 gap-2'>
        <section className='w-full p-5 flex flex-col flex-grow rounded bg-white shadow-[0_0_8px] gap-8 shadow-slate-300'>
          <div className='w-full flex justify-center'>
            <div className='w-fit flex justify-center flex-col gap-1'>
              <h1 className='text-center lg:text-3xl md:text-2xl sm:text-xl text-lg font-viga text-slate-800'>YOUR ADDRESSES</h1>
              <hr className='border-b-2 mx-[10%] border-red-500' />
            </div>
          </div>
          <aside className='grid grid-cols-4 gap-4'>
            {addresses.length !== 0 ? addresses.map(address => {
              return <div key={address} className='w-full flex flex-col border border-slate-300 p-2 gap-2 rounded'>
                <input type="text" placeholder='Full Name' className='border focus:outline-blue-500 focus:outline border-slate-300 p-1 px-2 rounded w-full' />
                <input type="text" placeholder='Phone Number' className='border focus:outline-blue-500 focus:outline border-slate-300 p-1 px-2 rounded w-full' />
                <input type="text" placeholder='Street Address' className='border focus:outline-blue-500 focus:outline border-slate-300 p-1 px-2 rounded w-full' />
                <div className='flex gap-2'>
                  <input type="text" placeholder='District' className='border focus:outline-blue-500 focus:outline border-slate-300 p-1 px-2 rounded w-full' />
                  <input type="text" placeholder='Pincode' className='border focus:outline-blue-500 focus:outline border-slate-300 p-1 px-2 rounded w-full' />
                </div>
                <div className='flex gap-2'>
                  <input type="text" placeholder='State' className='border focus:outline-blue-500 focus:outline border-slate-300 p-1 px-2 rounded w-full' />
                  <button className='px-4 bg-slate-800 hover:bg-slate-900 focus:bg-green-500 text-white rounded'>Use</button>
                  <button onClick={() => setAddresses(addresses.slice(0, addresses.length - 1))} className='px-4 bg-red-500 hover:bg-red-600 text-white rounded'>Delete</button>
                </div>
              </div>;
            }) : <div>No Addresses added yet!</div>}
          </aside>
          <button onClick={() => setAddresses(prev => [...prev, prev + 1])} className='bg-slate-700 p-2 hover:scale-105 transition-transform px-3 rounded w-fit text-white'>Add new address</button>
          <div className='w-full flex justify-center'>
            <div className='w-fit flex justify-center flex-col gap-1'>
              <h1 className='text-center lg:text-3xl md:text-2xl sm:text-xl text-lg font-viga text-slate-800'>YOUR PRODUCTS</h1>
              <hr className='border-b-2 mx-[10%] border-red-500' />
            </div>
          </div>
          <aside className='flex gap-6 justify-center'>
            {selectedProducts.length !== 0 && selectedProducts.map(p => {
              return <div
                className='flex relative bottomA flex-shrink-0 text-slate-700 hover:text-blue-500 flex-col gap-2'
                onClick={() => { Navigate(`/${p._id}`) }}
                // ref={(element) => { (productRefs.current[index] = element) }}
                key={p._id}>
                <img src={`assets/productImg/${p.img[0]}`} className='h-40 p-2 w-40 duration-200 cursor-pointer transition-transform hover:scale-110 bg-white shadow-[0_0_8px] shadow-slate-300 rounded-lg' alt="" />
                <h4 className='text-inherit'>{p.name.length <= 18 ? p.name : `${p.name.substring(0, 18)}...`}</h4>
                <span className='flex rounded px-1 bg-green-500 text-white items-center justify-center gap-1 w-fit'>{p.rating}<AiFillStar /></span>
                <div className='flex gap-2 items-end'>
                  <span className='text-sm text-slate-700 font-viga'>Rs {p.offerPrice}</span>
                  <span className='text-sm text-slate-500 line-through'>Rs {p.mrp}</span>
                  <span className='text-sm text-green-600'>{Math.round(((p.mrp - p.offerPrice) / p.mrp) * 100)}%off</span>
                </div>
              </div>
            })}
          </aside>
        </section>
      </section> : <Loader />}
    </>
  )
}

export default Address