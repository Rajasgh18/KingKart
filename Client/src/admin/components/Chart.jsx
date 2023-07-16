import { useContext, useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from 'axios';
import CreateContext from '../context/createContext';



const Chart = ({ aspect, title }) => {
  const [chartData, setChartData] = useState([]);
  const { url } = useContext(CreateContext);
  const getDaysInMonth = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    return new Date(currentYear, currentMonth, 0).getDate()
  }
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${url}/order`);
        const currentDate = new Date();
        let dat = [];
        for (let i = 0; i < getDaysInMonth(); i++) {
          dat[i] = { name: i + 1, Total: 0 };
          dat[i].Total = res.data.filter(order => {
            const date = new Date(order.createdAt);
            if (date.getMonth() === currentDate.getMonth())
              if (date.getDate() - 1 === i)
                return order;
          }).length;
          setChartData(dat);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchOrders();
  }, []);

  return (
    <>
      <div className="w-full shadow-[0_0_12px] p-4 flex flex-col rounded-md gap-4 shadow-slate-300">
        <h1 className="text-slate-700 text-lg flex justify-center">{title}</h1>
        <ResponsiveContainer width="100%" height="100%" aspect={aspect}>
          <AreaChart
            width={720}
            height={250}
            data={chartData}
          >
            <defs>
              <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="gray" />
            <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Total"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#total)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Chart;
