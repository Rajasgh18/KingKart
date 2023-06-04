import React, { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import DeleteDialog from './DeleteDialog';

const CategoryItem = ({ details, setCategoryDetails, setProperties }) => {
    const { _id, categoryName, parentCategory } = details;

    const [isDeleteOpened, setIsDeleteOpened] = useState(false);

    const handleDelete = () => {
        if (isDeleteOpened)
            setIsDeleteOpened(false);
        else
            setIsDeleteOpened(true);
    }

    const handleEdit = async () => {
        setCategoryDetails({ categoryName, parentCategory: parentCategory ? parentCategory : "No Parent Category" });
        details.properties && setProperties(details.properties);
    }

    return (
        <tbody>
            <tr>
                <td className='itemBoxPrimary text-slate-600 h-14'>{categoryName}</td>
                <td className='itemBoxPrimary text-slate-600 h-14'>{parentCategory ? parentCategory.categoryName : "No Parent Category"}</td>
                <td className='itemBoxPrimary text-slate-600 w-[10%] text-center space-x-2 h-14'>
                    <FiEdit onClick={handleEdit} className='w-6 h-6 cursor-pointer inline' />
                    <AiOutlineDelete onClick={handleDelete} className='w-7 h-7 cursor-pointer inline' />
                    {isDeleteOpened && <DeleteDialog name="category" id={_id} setCategoryDetails={setCategoryDetails} open={setIsDeleteOpened} />}
                </td>
            </tr>
        </tbody>
    )
}

export default CategoryItem;