import React, { useEffect, useState } from 'react';
import { FiUpload } from "react-icons/fi";
import Loader from '../components/Loader';
import ImgBox from '../components/ImgBox';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
const EditProduct = () => {

    const [product, setProduct] = useState({});
    const [isLoader, setIsLoader] = useState(true);

    const { _id, name, category, desc, img, price, rating } = product;
    const [inputName, setInputName] = useState(name);
    const [inputImg, setInputImg] = useState(img);
    const [inputDesc, setInputDesc] = useState(desc);
    const [inputCategory, setInputCategory] = useState(category);
    const [inputPrice, setInputPrice] = useState(price);
    const [inputRating, setInputRating] = useState(rating);
    const id = useParams().id;
    const Navigate = useNavigate();

    const addImgHandle = async (e) => {
        const data = Array.from(e.target.files);
        try {
            for (let i = 0; i < data.length; i++) {
                const formData = new FormData();
                const fileName = Date.now() + data[i].name;
                formData.append('fileName', fileName);
                formData.append('image', data[i]);
                const res = await axios.post('http://localhost:5000/api/admin/image/single', formData);
                setInputImg(prev => [...prev, fileName]);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const details = { name: inputName, desc: inputDesc, price: inputPrice, rating: inputRating, category: inputCategory, img: inputImg };
        try {
            const res = await axios.put('http://localhost:5000/api/admin/product/' + _id, details);
            Navigate('/admin/products');
        } catch (error) {
            console.error(error);
        }
    }

    const handleReset = () => {
        setInputName(name);
        setInputDesc(desc);
        setInputCategory(category);
        setInputImg(img);
        setInputPrice(price);
        setInputRating(rating);
    }

    useEffect(() => {
        const getDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/admin/product/${id}`);
                console.log(res.data)
                setProduct(res.data);
                setInputName(res.data.name);
                setInputDesc(res.data.desc);
                setInputCategory(res.data.category);
                setInputImg(res.data.img);
                setInputPrice(res.data.price);
                setInputRating(res.data.rating);
                setIsLoader(false);
            } catch (error) {
                console.error(error);
            }
        }
        getDetails();
    }, []);

    return (
        isLoader ? <Loader /> :
            <div className='flex flex-col gap-4 px-12 py-8 text-slate-600'>
                <h1 className='text-3xl text-slate-700'>Edit Product</h1>
                <form onSubmit={handleSubmit} onReset={handleReset} className='flex w-full flex-col rounded-lg opacity-100'>
                    <label htmlFor="image" className='text-lg'>Images</label>
                    <div id='image' className='my-4 flex'>
                        {inputImg && inputImg.map(i => {
                            return <ImgBox key={i} name={i} />;
                        })}
                        <div onDragOver={e => e.preventDefault()}>
                            <input onChange={addImgHandle} id='addImg' type="file" className='hidden' multiple />
                            <label htmlFor='addImg' className='flex flex-col text-lg text-blue-500 cursor-pointer  items-center justify-center bg-slate-100 h-28 w-28 rounded border-2 border-blue-500'><FiUpload className='h-10 w-10' />Add Image</label>
                        </div>
                    </div>
                    <label htmlFor="name" className='text-lg'>Product Name</label>
                    <input onChange={e => setInputName(e.target.value)} id='name' type="text" className='inputPrimary' value={inputName} />
                    <label htmlFor="desc" className='text-lg'>Description</label>
                    <textarea onChange={e => setInputDesc(e.target.value)} id='desc' className='inputPrimary' value={inputDesc} />
                    <label htmlFor="price" className='text-lg'>Price</label>
                    <input onChange={e => setInputPrice(e.target.value)} id='price' type='number' className='inputPrimary' value={inputPrice} />
                    <label htmlFor="rating" className='text-lg'>Rating</label>
                    <input onChange={e => setInputRating(e.target.value)} id='rating' type="number" className='inputPrimary' value={inputRating} />
                    <label htmlFor="category" className='text-lg'>Category</label>
                    <input onChange={e => setInputCategory(e.target.value)} id='category' type="text" className='inputPrimary' value={inputCategory} />
                    <div className='flex gap-4 mt-4 items-center'>
                        <button type='submit' className='bg-blue-500 cursor-pointer text-white w-fit rounded-md p-3 px-6 text-lg'>Save</button>
                        <button type='reset' className='bg-red-500 cursor-pointer text-white w-fit rounded-md p-3 px-6 text-lg'>Reset</button>
                    </div>
                </form>
            </div>
    )
}

export default EditProduct