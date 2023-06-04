import React, { useEffect } from 'react'
import Item from './Item'

const ItemTable = ({ productList, isLoader }) => {
    return (
        <table className='shadow-[0_0_6px_1px] shadow-slate-200'>
            <thead className='bg-slate-100 text-slate-600'>
                <tr>
                    <td className='itemBoxPrimary w-1/4'>Id</td>
                    <td className='itemBoxPrimary w-1/6'>Name</td>
                    <td className='itemBoxPrimary w-1/6'>Price</td>
                    <td className='itemBoxPrimary w-1/6'>Caterogory</td>
                    <td className='itemBoxPrimary w-1/6'>More Details</td>
                    <td className='itemBoxPrimary w-1/6'>Edit</td>
                </tr>
            </thead>
            {productList.length !== 0 && !isLoader ? productList.map(product => {
                return <Item key={product._id} details={product} />
            }) : !isLoader && <div className='w-full text-center py-4 text-lg text-slate-600'>No Products Added Yet!</div>}
        </table>
    )
}

export default ItemTable