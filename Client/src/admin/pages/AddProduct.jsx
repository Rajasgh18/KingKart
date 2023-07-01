import React, { useContext, useEffect, useState } from 'react';
import Loader from '../components/Loader';
import ImgBox from '../components/ImgBox';
import { Link, useNavigate } from 'react-router-dom';
import { FiUpload } from "react-icons/fi";
import axios from 'axios';
import DropDown from '../components/DropDown';
import ChooseCategories from '../components/ChooseCategories';
import CreateContext from '../context/createContext';

const AddProduct = () => {
  const {url} = useContext(CreateContext);
  const [isLoader, setIsLoader] = useState(true);
  const [formDetails, setFormDetails] = useState({ name: '', desc: '', category: '', offerPrice: '', mrp: '', deliveryCharge: '', rating: '' });
  const [category, setCategory] = useState([]);
  const [dropDownValue, setDropDownValue] = useState("No Category");
  const [choosedCategory, setChoosedCategory] = useState('');
  const [properties, setProperties] = useState({});

  const { name, desc, offerPrice, mrp, deliveryCharge, rating } = formDetails;
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
        await axios.post(`${url}/image/single`, formData);
        setInputImg(prev => [...prev, fileName]);
      }
    } catch (error) {
      console.error(error);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...formDetails, img: inputImg, properties };
      const res = await axios.post(`${url}/product`, data);
      Navigate('/admin/products');
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${url}/category`);
        setCategory(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCategories();
  }, [])

  const propertiesToFill = [];
  if (category.length !== 0 && category) {
    let catInfo = category.find(({ _id }) => _id === formDetails.category)
    catInfo && propertiesToFill.push(...catInfo?.properties);
    while (catInfo?.parentCategory?._id) {
      const parentCat = category.find(({ _id }) => _id === catInfo?.parentCategory?._id)
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
  }

  return (
    !isLoader ? <Loader /> :
      <div className='flex flex-col gap-4 px-12 py-8 text-slate-600'>
        <div className='flex justify-between'>
          <h1 className='text-3xl text-slate-700'>New Product</h1>
          <Link to='/admin/products' className='btnPrimary px-4 p-2 text-xl'>Back</Link>
        </div>
        <form onSubmit={handleSubmit} className='flex w-full flex-col rounded-lg opacity-100'>
          <label htmlFor="name" className='text-lg'>Product Name</label>
          <input placeholder='Product name' onChange={handleForm} id='name' type="text" className='inputPrimary' value={name} />
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
          <DropDown dropDownValue={dropDownValue} setDropDownValue={setDropDownValue} formDetails={formDetails} setFormDetails={setFormDetails} setProperties={setProperties} setChoosedCategory={setChoosedCategory} name="product" noSelectionText="No Category" category={category} dropInputCss="w-1/4 my-4" dropDownCss="w-[18.4%]" />
          <ChooseCategories propertiesToFill={propertiesToFill} properties={properties} setProperties={setProperties} />
          <label htmlFor="desc" className='text-lg'>Description</label>
          <textarea placeholder='Description...' onChange={handleForm} id='desc' className='inputPrimary' value={desc} />
          <label htmlFor="offerPrice" className='text-lg'>Offer Price</label>
          <input placeholder='Offer Price' onChange={handleForm} id='offerPrice' type="Number" className='inputPrimary' value={offerPrice} />
          <label htmlFor="mrp" className='text-lg'>MRP</label>
          <input placeholder='MRP' onChange={handleForm} id='mrp' type="Number" className='inputPrimary' value={mrp} />
          <label htmlFor="deliveryCharge" className='text-lg'>Delivery Charge</label>
          <input placeholder='Delivery Charge' onChange={handleForm} id='deliveryCharge' type="Number" className='inputPrimary' value={deliveryCharge} />
          <label htmlFor="rating" className='text-lg'>Rating</label>
          <input placeholder='Rating' onChange={handleForm} id='rating' type="NUmber" className='inputPrimary' value={rating} />
          <div className='flex gap-2 mt-4 items-center'>
            <button type='submit' className='bg-blue-500 cursor-pointer text-white w-fit rounded-md p-3 px-6 text-lg'>Save</button>
          </div>
        </form>
      </div>
  )
}

export default AddProduct