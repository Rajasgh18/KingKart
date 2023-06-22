import React from 'react';
import CategoryItem from './CategoryItem';

const CategoryTable = ({ category, setInputImg, isLoader, setProperties, setCategoryDetails, setDropDownValue }) => {
    return (
        <table className='shadow-[0_0_6px_1px] shadow-slate-200'>
            <thead className='bg-slate-100 text-slate-600'>
                <tr>
                    <td className='itemBoxPrimary'>Category Name</td>
                    <td className='itemBoxPrimary'>Parent Category</td>
                    <td className='itemBoxPrimary'>Edit</td>
                </tr>
            </thead>
            {category.length !== 0 && !isLoader ? category.map(c => {
                return <CategoryItem setInputImg={setInputImg} setCategoryDetails={setCategoryDetails} setProperties={setProperties} setDropDownValue={setDropDownValue} key={c._id} details={c} />
            }) : !isLoader && <div className='w-full text-center my-4 text-lg text-slate-600'>No Category Added Yet!</div>}
        </table>
    )
}

export default CategoryTable