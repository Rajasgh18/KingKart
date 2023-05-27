import React from 'react'

const DeleteProduct = ({ open }) => {
    const onClose = () => {
        const form = document.getElementById('openDialog');
        form.style.animationName = 'closeAnim';
        setTimeout(() => {
            open(false);
        }, 300);
    }
    return (
        <div className='absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-opacity-50 bg-slate-800'>
            <div id='openDialog' className='bg-white gap-4 flex flex-col items-center justify-center rounded-lg opacity-100 p-6'>
                <h1 className='text-2xl'>Do you want to delete this product?</h1>
                <div className='flex gap-6 text-white text-lg'>
                    <button className='p-2 px-6 bg-red-500 rounded-lg'>Yes</button>
                    <button onClick={onClose} className='p-2 px-6 bg-green-500 rounded-lg'>No</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteProduct