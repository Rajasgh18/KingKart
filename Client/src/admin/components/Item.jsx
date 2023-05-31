import React, { useContext, useState } from 'react'
import CreateContext from '../context/createContext';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { RiPencilFill } from "react-icons/ri";
import DeleteProduct from './DeleteProduct';
const Item = ({ details }) => {
    const { mode } = useContext(CreateContext);
    const itemBoxBorder = `w-[1px] h-full ${mode === "dark" ? "bg-slate-400" : "bg-slate-300"}`;
    const Navigate = useNavigate();

    const { _id, name, price, category } = details;
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

    return (
        <div className={`flex w-full h-20 text-md ${mode === "light" ? "text-slate-600 border-gray-400" : "text-white border-gray-300"} items-center border-b`}>
            <span className='w-1/3 px-4'>{_id}</span>
            <hr className={itemBoxBorder}></hr>
            <span className='itemBoxPrimary'>{name}</span>
            <hr className={itemBoxBorder}></hr>
            <span className='itemBoxPrimary'>{price}</span>
            <hr className={itemBoxBorder}></hr>
            <span className='itemBoxPrimary'>{category}</span>
            <hr className={itemBoxBorder}></hr>
            <span className='itemBoxPrimary flex justify-center'>
                <button id='details' onClick={handleClick} className='p-2 bg-blue-500 text-white rounded-md'>More Details</button>
            </span>
            <hr className={itemBoxBorder}></hr>
            <span className='w-1/12 px-4 flex items-center justify-evenly'>
                <RiPencilFill onClick={handleClick} className='w-6 h-6 text-green-600 cursor-pointer' />
                <MdDelete onClick={handleDelete} className='w-6 h-6 text-red-600 cursor-pointer' />
                {isDeleteOpened && <DeleteProduct id={_id} open={setIsDeleteOpened} />}
            </span>
        </div>
    )
}

export default Item