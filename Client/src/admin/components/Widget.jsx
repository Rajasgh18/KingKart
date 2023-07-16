import React, { forwardRef, useContext, useEffect, useState } from 'react';
import { CiUser } from 'react-icons/ci';
import { BsCart3 } from 'react-icons/bs';
import { LiaRupeeSignSolid } from 'react-icons/lia';
import { CiWallet } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import CreateContext from '../context/createContext';
import axios from 'axios';

const Widget = ({ name, link }) => {

    const { url } = useContext(CreateContext);
    const [value, setValue] = useState(0);

    useEffect(() => {
        const fetchDetails = async () => {
            let res;
            try {
                switch (name) {
                    case "Users":
                        res = await axios.get(`${url}/user`);
                        setValue(res.data.length)
                        break;
                    case "Orders":
                        res = await axios.get(`${url}/order`);
                        setValue(res.data.length)
                        break;
                    case "Earnings":
                        res = await axios.get(`${url}/order`);
                        const data = res.data;
                        let earn = 0;
                        for(let i=0; i<data.length; i++){
                            for(let j=0; j<data[i].line_items.length; j++){
                                earn += data[i].line_items[j].price_data.unit_amount;
                            }
                        }
                        setValue(earn)
                        break;
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchDetails();
    }, [])

    return (
        <div className='flex-1 flex gap-2 flex-col shadow-[0_0_12px] rounded-lg p-3 shadow-slate-300'>
            <h2 className='text-lg text-slate-500'>{name}</h2>
            <h1 className='text-3xl text-slate-600'>{name === "Balance" || name === "Earnings" ? "Rs " + value : value}</h1>
            <div className={`flex ${name === "Earnings" ? "justify-end" : "justify-between"}`}>
                <Link to={link} className={`underline underline-offset-4 text-slate-700 cursor-pointer text-sm ${name === "Earnings" && 'hidden'}`}>See all {name.toLowerCase()}</Link>
                {name === "Users"
                    ? <CiUser className="bg-red-300 w-6 h-6 p-[0.2rem] rounded text-red-700" />
                    : name === "Orders"
                        ? <BsCart3 className="bg-yellow-300 w-6 h-6 p-[0.2rem] rounded text-yellow-700" />
                        : name === "Earnings"
                            ? <LiaRupeeSignSolid className="bg-green-300 w-6 h-6 p-[0.2rem] rounded text-green-700" />
                            : <CiWallet className="bg-violet-300 w-6 h-6 p-[0.2rem] rounded text-violet-700" />
                }
            </div>
        </div>
    )
}

export default Widget