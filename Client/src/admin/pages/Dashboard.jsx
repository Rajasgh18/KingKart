import React from 'react'
import Widget from '../components/Widget'
import Featured from '../components/featured/Featured'
import Chart from '../components/chart/Chart'

const Dashboard = () => {
  return (
    <div className='flex flex-col flex-grow p-9 gap-8'>
      <div className='flex w-full gap-5'>
        <Widget name="Users" value={100} url="/admin/users"/>
        <Widget name="Orders" value={10} url="/admin/orders"/>
        <Widget name="Earnings" value={100} url="/admin/category"/>
  
      </div>
      <div className="charts flex gap-8">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2/ 1} />
      </div>
      
      
          
    </div>
    
  )
}

export default Dashboard