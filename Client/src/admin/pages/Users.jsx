import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import CreateContext from '../context/createContext';
import { TailSpin } from 'react-loader-spinner';

const Users = () => {
    const { url } = useContext(CreateContext);
    const [users, setUsers] = useState([]);
    const [isLoader, setIsLoader] = useState(true);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`${url}/user`);
                setUsers(res.data);
                setIsLoader(false);
            } catch (error) {
                console.error(error);
            }
        }
        fetchUsers();
    }, []);

    return (
        <section className='p-12 flex flex-col gap-10'>
            <div>
                <h1 className='text-4xl text-slate-700'>Users</h1>
                <p className='text-lg text-slate-500'>{users.length} entries found</p>
            </div>
            <table className='border border-slate-300 w-full'>
                <thead>
                    <tr className='bg-slate-100'>
                        <th className='itemBoxPrimary text-slate-700'>Name</th>
                        <th className='itemBoxPrimary text-slate-700'>Username</th>
                        <th className='itemBoxPrimary text-slate-700'>Date of Creation</th>
                    </tr>
                </thead>
                <tbody>
                    {!isLoader && (users.length !== 0 ? users.map(user => {
                        return <tr key={user._id}>
                            <td className='itemBoxPrimary text-slate-700'>{user.name}</td>
                            <td className='itemBoxPrimary text-slate-700'>{user.username}</td>
                            <td className='itemBoxPrimary text-slate-700'>{Date(user.createdAt)}</td>
                        </tr>
                    }) : <tr><td className='p-3 text-lg text-slate-700'>No Users Yet!</td></tr>)}
                </tbody>
            </table>
            {isLoader && <div className='flex justify-center'><TailSpin width={45} height={45} color='blue' /></div>}
        </section>
    )
}

export default Users