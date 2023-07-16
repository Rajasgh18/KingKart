import React, { useState } from 'react';
import Widget from '../components/Widget';
import Featured from '../components/featured/Featured';
import Chart from '../components/Chart';

const Dashboard = () => {
  return (
    <div className='flex flex-col flex-grow p-9 gap-8'>
      <div className='flex w-full gap-5'>
        <Widget name="Users" link="/admin/users" />
        <Widget name="Orders" link="/admin/orders" />
        <Widget name="Earnings" link="/admin/category" />

      </div>
      <div className="charts flex gap-8">
        {/* <Featured /> */}
        <Chart title="Last 30 Days (Revenue)" aspect={3 / 1} />
      </div>
    </div>
  )
}

export default Dashboard