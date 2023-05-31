import React, { useState } from 'react';
import Loader from '../components/Loader';
import ImgBox from '../components/ImgBox';
import { useNavigate } from 'react-router-dom';
import { FiUpload } from "react-icons/fi";
import axios from 'axios';

const AddProduct = () => {
  const [isLoader, setIsLoader] = useState(true);
  const [formDetails, setFormDetails] = useState({ name: '', desc: '', category: '', price: '', rating: '' });
  const { name, desc, category, price, rating } = formDetails;
  const [inputImg, setInputImg] = useState("");
  const Navigate = useNavigate();

  const handleForm = (e) => {
    setFormDetails({ ...formDetails, [e.target.id]: e.target.value });
  }

  const addImgHandle = async (e) => {
    const data = Array.from(e.target.files);
    try {
      for (let i = 0; i < data.length; i++) {
        const formData = new FormData();
        const fileName = Date.now() + data[i].name;
        formData.append('fileName', fileName);
        formData.append('image', data[i]);
        await axios.post('http://localhost:5000/api/admin/image/single', formData);
        setInputImg(prev => [...prev, fileName]);
      }
    } catch (error) {
      console.error(error);
    }
    for (let i = 0; i < data.length; i++) {

    }
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const data = {...formDetails, img: inputImg};
      const res = await axios.post('http://localhost:5000/api/admin/product', data);
      console.log(res.data);
      Navigate('/admin/products');
    } catch (error) {
      console.error(error);
    }
  } 
  return (
    !isLoader ? <Loader /> :
      <div className='flex flex-col gap-4 px-12 py-8 text-slate-600'>
        <h1 className='text-3xl text-slate-700'>New Product</h1>
        <form onSubmit={handleSubmit} className='flex w-full flex-col rounded-lg opacity-100'>
          <label htmlFor="name" className='text-lg'>Product Name</label>
          <input placeholder='Product name' onChange={handleForm} id='name' type="text" className='inputPrimary' value={name} />
          <label htmlFor="desc" className='text-lg'>Description</label>
          <textarea placeholder='Description...' onChange={handleForm} id='desc' className='inputPrimary' value={desc} />
          <label htmlFor="price" className='text-lg'>Price</label>
          <input placeholder='Price' onChange={handleForm} id='price' type="Number" className='inputPrimary' value={price} />
          <label htmlFor="rating" className='text-lg'>Rating</label>
          <input placeholder='Rating' onChange={handleForm} id='rating' type="NUmber" className='inputPrimary' value={rating} />
          <label htmlFor="category" className='text-lg'>Category</label>
          <input placeholder='Category' onChange={handleForm} id='category' type="text" className='inputPrimary' value={category} />
          <label htmlFor="image" className='text-lg'>Images</label>
          <div id='image' className='my-4 flex'>
            {inputImg.length !== 0 && inputImg.map(i => {

              return <ImgBox key={i} name={i} />
            })}
            <div onDragOver={e => e.preventDefault()}>
              <input onChange={addImgHandle} id='addImg' type="file" className='hidden' multiple />
              <label htmlFor='addImg' className='flex flex-col text-lg text-blue-500 cursor-pointer  items-center justify-center bg-slate-100 h-28 w-28 rounded border-2 border-blue-500'><FiUpload className='h-10 w-10' />Add Image</label>
            </div>
          </div>
          <div className='flex gap-2 mt-4 items-center'>
            <button type='submit' className='bg-blue-500 cursor-pointer text-white w-fit rounded-md p-3 px-6 text-lg'>Save</button>
          </div>
        </form>
      </div>
  )
}

export default AddProduct