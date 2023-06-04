import React, { useContext, useEffect, useState } from 'react'
import CreateContext from '../context/createContext';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import DeleteDialog from './DeleteDialog';
import axios from 'axios';
const Item = ({ details }) => {
    const { mode } = useContext(CreateContext);
    const itemBoxBorder = `w-[1px] h-full ${mode === "dark" ? "bg-slate-400" : "bg-slate-300"}`;
    const Navigate = useNavigate();

    const { _id, name, price, category } = details;
    const [categoryDetails, setCategoryDetails] = useState({});
    const [isDeleteOpened, setIsDeleteOpened] = useState(false);
    const handleDelete = () => {
        if (isDeleteOpened)
            setIsDeleteOpened(false);
        else
            setIsDeleteOpened(true);
    }

    const handleClick = () => {
        Navigate(`/admin/products/${_id}`);
    }

    useEffect(()=>{
        const fetchCategory = async ()=>{
            try {
                const res = await axios.get('http://localhost:5000/api/admin/category/'+category);
                setCategoryDetails(res.data);
            } catch (error) {
                console.error(error)
            }
        }
        fetchCategory();
    }, [])

    return (
        <tbody className="">
            <tr>
                <td className='itemBoxPrimary h-20 w-1/4'>{_id}</td>
                <td className='itemBoxPrimary h-20 w-1/6'>{name}</td>
                <td className='itemBoxPrimary h-20 w-1/6'>{price}</td>
                <td className='itemBoxPrimary h-20 w-1/6'>{categoryDetails?.categoryName}</td>
                <td className='itemBoxPrimary h-20 w-1/6 text-center'>
                    <button id='details' onClick={handleClick} className='p-2 px-4 bg-blue-500 text-white rounded-md'>More Details</button>
                </td>
                <td className='itemBoxPrimary h-20 w-1/6 space-x-1'>
                    <FiEdit onClick={handleClick} className='w-7 h-7 text-green-600 cursor-pointer inline' />
                    <MdDelete onClick={handleDelete} className='w-7 h-7 text-red-600 cursor-pointer inline' />
                    {isDeleteOpened && <DeleteDialog name="product" id={_id} open={setIsDeleteOpened} />}
                </td>
            </tr>
        </tbody>
    )
}

export default Item