import axios from 'axios';
import React from 'react'

const DeleteDialog = ({ open, id, name, setCategoryDetails }) => {
    const onClose = () => {
        const form = document.getElementById('openDialog');
        form.style.animationName = 'closeAnim';
        setTimeout(() => {
            open(false);
        }, 300);
    }

    const handleDelete = async () => {
        try {
            onClose();
            const res = await axios.delete(`http://localhost:5000/api/admin/${name === "product" ? "product" : "category"}/${id}`);
            if (res.data === "success") {
            }
            else {
                console.log(res.data);
            }
            setCategoryDetails({ categoryName: "", parentCategory: "No Parent Category" });
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='fixed top-0 -left-4 w-screen min-h-screen flex items-center justify-center bg-opacity-50 bg-slate-800'>
            <div id='openDialog' className='bg-white gap-4 flex flex-col items-center justify-center rounded-lg opacity-100 p-6'>
                <h1 className='text-2xl'>Do you want to delete this {name}?</h1>
                <div className='flex gap-6 text-white text-lg'>
                    <button onClick={handleDelete} className='p-2 px-6 bg-red-500 rounded-lg'>Yes</button>
                    <button onClick={onClose} className='p-2 px-6 bg-green-500 rounded-lg'>No</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteDialog