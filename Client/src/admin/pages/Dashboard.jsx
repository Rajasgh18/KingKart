import React, { useState } from 'react';
import Widget from '../components/Widget';
import Chart from '../components/Chart';

const Dashboard = () => {
  return (
    <div className='flex flex-col flex-grow md:p-8 sm:p-6 p-4 lg:gap-8 md:gap-6 sm:gap-4 gap-2'>
      <div className='flex sm:flex-row flex-col flex-wrap w-full lg:gap-5 md:gap-3 gap-2'>
        <Widget name="Users" link="/admin/users" />
        <Widget name="Orders" link="/admin/orders" />
        <Widget name="Earnings" link="/admin/category" />

      </div>
      <Chart title="Last 30 Days (Revenue)" aspect={3 / 1} />
    </div>
  )
}

export default Dashboard