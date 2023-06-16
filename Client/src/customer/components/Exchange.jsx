import React from 'react';

const Exchange = ({ productDetail }) => {
    return (
        <table className='w-2/3 my-4'>
            <thead className='border-2 bg-blue-50'>
                <tr className='text-slate-700'>
                    <td className='p-4 flex justify-between'>
                        <span className='flex gap-2 items-center'>
                            <input type="radio" className='w-4 h-4 focus:outline-none'/>
                            Buy Without Exchange
                        </span>
                        <span className='text-slate-600 font-viga'>Rs {productDetail.offerPrice}</span>
                    </td>
                </tr>
            </thead>
            <tbody className='border-2'>
                <tr className='text-slate-700'>
                    <td className='p-4 flex justify-between'>
                        <span className='flex gap-2 items-center'>
                            <input type="radio" className='w-4 h-4 focus:outline-none'/>
                            Buy With Exchange
                        </span>
                        <span className='text-slate-600 font-viga'>upto Rs 3000 off</span>
                    </td>
                </tr>
                <tr>
                    <td className='text-slate-500 px-4 pb-4'>Get extra Rs 1000 off on exchange of select models</td>
                </tr>
            </tbody>
        </table>
    )
}

export default Exchange