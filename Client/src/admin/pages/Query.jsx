import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import CreateContext from '../context/createContext';
import { TailSpin } from 'react-loader-spinner';

const Settings = () => {
  const [query, setQuery] = useState([]);
  const [isLoader, setIsLoader] = useState(true);
  const { url } = useContext(CreateContext);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const res = await axios.get(`${url}/query/`);
        setQuery(res.data);
        setIsLoader(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchQueries();
  }, []);

  return (
    <section className='p-12 flex flex-col gap-10'>
      <header>
        <h1 className={`text-4xl text-slate-700`}>Queries</h1>
        <h3 className={`text-lg text-slate-500`}>{query.length} entries found</h3>
      </header>
      <table>
        <thead>
          <tr className='bg-slate-100'>
            <th className='itemBoxPrimary text-slate-700'>UserID</th>
            <th className='itemBoxPrimary text-slate-700'>Name</th>
            <th className='itemBoxPrimary text-slate-700'>Query</th>
          </tr>
        </thead>
        <tbody className='text-slate-700'>
          {!isLoader && (query.length !== 0 && query.map(q => {
            return <tr key={q._id}>
              <td className='border border-slate-300 p-3'>{q.userId}</td>
              <td className='border border-slate-300 p-3'>{q.name}</td>
              <td className='border border-slate-300 p-3'>{q.query}</td>
            </tr>
          }))}
        </tbody>
      </table>
      {isLoader && <div className='flex justify-center'><TailSpin width={45} height={45} color="blue" /></div>}
    </section>
  )
}

export default Settings