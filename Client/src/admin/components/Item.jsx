import React, { useContext, useEffect, useState } from 'react'
import CreateContext from '../context/createContext';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import DeleteDialog from './DeleteDialog';
import axios from 'axios';
const Item = ({ details }) => {
    const { mode, url } = useContext(CreateContext);
    const Navigate = useNavigate();

    const { _id, name, offerPrice, category } = details;
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
                const res = await axios.get(`${url}/category/${category}`);
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
                <td className='itemBoxPrimary h-20 w-1/6'>{offerPrice}</td>
                <td className='itemBoxPrimary h-20 w-1/6'>{categoryDetails?.categoryName}</td>
                <td className='itemBoxPrimary h-20 w-1/6 text-center'>
                    <button id='details' onClick={handleClick} className='p-2 px-4 bg-blue-500 text-white rounded-md'>More Details</button>
                </td>
                <td className='itemBoxPrimary h-20 w-1/6 space-x-1 text-center'>
                    <FiEdit onClick={handleClick} className='w-7 h-7 text-green-600 cursor-pointer inline' />
                    <MdDelete onClick={handleDelete} className='w-7 h-7 text-red-600 cursor-pointer inline' />
                    {isDeleteOpened && <DeleteDialog setCategoryDetails={setCategoryDetails} name="product" id={_id} open={setIsDeleteOpened} />}
                </td>
            </tr>
        </tbody>
    )
}

export default Item