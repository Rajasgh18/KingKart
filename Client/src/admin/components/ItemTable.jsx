import React, { useEffect } from 'react'
import Item from './Item'

const ItemTable = ({ productList, isLoader }) => {
    return (
        <table>
            <thead className='bg-slate-100 text-slate-600'>
                <tr>
                    <th className='itemBoxPrimary w-1/4 text-left'>Id</th>
                    <th className='itemBoxPrimary w-1/6 text-left'>Name</th>
                    <th className='itemBoxPrimary w-1/6 text-left'>Caterogory</th>
                    <th className='itemBoxPrimary w-1/6 text-left'>Offer Price</th>
                    <th className='itemBoxPrimary w-1/6 text-left'>MRP</th>
                    <th className='itemBoxPrimary w-1/6 text-left'>Edit</th>
                </tr>
            </thead>
            {productList.length !== 0 && !isLoader ? productList.map(product => {
                return <Item key={product._id} details={product} />
            }) : !isLoader && <tbody><tr><td className='w-1/6 text-center py-4 text-lg text-slate-600'>No Products Added Yet!</td></tr></tbody>}
        </table>
    )
}

export default ItemTable