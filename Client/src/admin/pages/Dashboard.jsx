import React from 'react'
import Widget from '../components/Widget'

const Dashboard = () => {
  return (
    <div className='flex flex-grow p-8'>
      <div className='flex w-full gap-5'>
        <Widget name="Users" value={100} url="/admin/users"/>
        <Widget name="Orders" value={10} url="/admin/orders"/>
        <Widget name="Earnings" value={100} url="/admin/category"/>
        <Widget name="Balance" value={200} url="/admin/products"/>
      </div>
    </div>
  )
}

export default Dashboard