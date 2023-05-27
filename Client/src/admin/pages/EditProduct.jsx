import React, { useEffect, useState } from 'react'
import { FiUpload } from "react-icons/fi";
import Loader from '../components/Loader';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const EditProduct = () => {

    const [product, setProduct] = useState({});
    const { _id, name, category, desc, img, price, rating } = product;
    const [isLoader, setIsLoader] = useState(true);

    const [inputName, setInputName] = useState(name);
    const [inputImg, setInputImg] = useState(img);
    const [inputDesc, setInputDesc] = useState(desc);
    const [inputCategory, setInputCategory] = useState(category);
    const [inputPrice, setInputPrice] = useState(price);
    const [inputRating, setInputRating] = useState(rating);

    const id = useParams().id;
    console.log(id);

    const onClose = () => {
        const form = document.getElementById('openDialog');
        form.style.animationName = 'closeAnim';
        setTimeout(() => {
            open(false);
        }, 390);
    }

    useEffect(() => {
        const getDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/admin/product/${id}`);
                setProduct(res.data);
                setIsLoader(false);
            } catch (error) {
                console.error(error);
            }
        }
        getDetails();
    }, [])

    return (
        isLoader ? <Loader /> :
            <div className='flex flex-col gap-4 px-12 py-8 text-slate-600'>
                <h1 className='text-3xl text-slate-700'>Edit Product</h1>
                <form className='flex w-full flex-col rounded-lg opacity-100'>
                    <label htmlFor="name" className='text-lg'>Product Name</label>
                    <input onChange={e => setInputName(e.target.value)} id='name' type="text" className='inputPrimary' value={inputName} />
                    <label htmlFor="name" className='text-lg'>Description</label>
                    <input onChange={e => setInputDesc(e.target.value)} id='name' type="text" className='inputPrimary' value={inputDesc} />
                    <label htmlFor="name" className='text-lg'>Price</label>
                    <input onChange={e => setInputPrice(e.target.value)} id='name' type="text" className='inputPrimary' value={inputPrice} />
                    <label htmlFor="name" className='text-lg'>Rating</label>
                    <input onChange={e => setInputRating(e.target.value)} id='name' type="text" className='inputPrimary' value={inputRating} />
                    <label htmlFor="name" className='text-lg'>Category</label>
                    <input onChange={e => setInputCategory(e.target.value)} id='name' type="text" className='inputPrimary' value={inputCategory} />
                    <label htmlFor="image" className='text-lg'>Images</label>
                    <div id='image' className='my-4 flex'>
                        <img src="/assets/images/a64b345016e96adfb8849af5521c8e0ecfe8f027-555x555.webp" className='object-contain w-28 mr-4 h-28 border-2 border-slate-300 rounded bg-slate-100' alt="" />
                        <img src="/assets/images/a64b345016e96adfb8849af5521c8e0ecfe8f027-555x555.webp" className='object-contain w-28 mr-4 h-28 border-2 border-slate-300 rounded bg-slate-100' alt="" />
                        <img src="/assets/images/a64b345016e96adfb8849af5521c8e0ecfe8f027-555x555.webp" className='object-contain w-28 mr-4 h-28 border-2 border-slate-300 rounded bg-slate-100' alt="" />
                        <div className='flex flex-col text-lg text-blue-500 cursor-pointer   items-center justify-center bg-slate-100 h-28 w-28 rounded border-2 border-blue-500'><FiUpload className='h-10 w-10'/>Add Image</div>
                    </div>
                </form>
            </div>
    )
}

export default EditProduct