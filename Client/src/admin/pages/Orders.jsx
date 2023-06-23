import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import CreateContext from '../context/createContext';
import { IoFilter, IoSettings, IoCaretDown } from "react-icons/io5";
import { TailSpin } from 'react-loader-spinner';

const Orders = () => {

  const { url } = useContext(CreateContext);
  const [orders, setOrders] = useState([]);
  const [isLoader, setIsLoader] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${url}/order/`);
        setOrders(res.data);
        setIsLoader(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchOrders();
  }, []);

  return (
    <div className='flex flex-col gap-4 text-slate-700 p-12'>
      <header>
        <h1 className='text-4xl text-slate-700'>Orders</h1>
        <p className='text-lg text-slate-500'>{orders.length} entries found</p>
      </header>
      <div className='flex w-full my-2 justify-between'>
        <button className='flex p-2 px-3 items-center gap-2 text-xl rounded-md justify-center border border-gray-300'>
          <IoFilter className='w-7 h-7' />
          Filters
        </button>
        <button className='flex p-3 px-3 items-center gap-2 text-xl rounded-md text-inherit justify-center border border-gray-300'>
          <IoSettings className='w-7 h-7' />
          <IoCaretDown className='w-4 h-4' />
        </button>
      </div>
      <table className='border border-slate-200'>
        <thead>
          <tr className='bg-slate-100'>
            <th className='itemBoxPrimary'>Recipient</th>
            <th className='itemBoxPrimary'>Products</th>
            <th className='itemBoxPrimary'>Date</th>
          </tr>
        </thead>
        <tbody>
          {!isLoader && (orders.length !== 0 ? orders.map(order => {
            return <tr>
              <td className='itemBoxPrimary'>
                Name  - {order.name}<br />
                Email - {order.username}<br />
                City - {order.city}<br />
                Postal Code - {order.postalCode}<br />
                Street Address - {order.streetAddress}<br />
                Country - {order.country}<br />
              </td>
              <td className='itemBoxPrimary '>{order.line_items.map(item => {
                return <>
                  {item.price_data.product_data.name + " x " + item.quantity}< br />
                </>
              })}</td>
              <td className='itemBoxPrimary'>{order.createdAt}</td>
            </tr>
          }) : <tr><td className='p-4 text-slate-600 text-lg'>No Order as of yet!</td></tr>)}
        </tbody>
      </table>
      {isLoader && <div className='flex p-4 justify-center items-center'><TailSpin height={40} width={40} color='blue' /></div>}
    </div>
  )
}

export default Orders