import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BsChevronDown } from "react-icons/bs";
import DropDown from '../components/DropDown';
import CategoryTable from '../components/CategoryTable';
import Loader from '../components/Loader';
import CategoryProperty from '../components/CategoryProperty';
import { FiUpload } from "react-icons/fi";
import ImgBox from '../components/ImgBox';
import CreateContext from '../context/createContext';

const Category = () => {

  const {url} = useContext(CreateContext);
  const [category, setCategory] = useState([]);
  const [categoryDetails, setCategoryDetails] = useState({ categoryName: "", parentCategory: "No Parent Category", properties: [{}] });
  const [properties, setProperties] = useState([]);
  const [inputImg, setInputImg] = useState(null);
  const [isLoader, setIsLoader] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = { ...categoryDetails, properties, categoryImg: inputImg };
      if (categoryDetails.parentCategory === "No Parent Category")
        data = { categoryName: categoryDetails.categoryName, parentCategory: null, properties, categoryImg: inputImg };
      for (let i = 0; i < category.length; i++) {
        if (category[i].categoryName === categoryDetails.categoryName) {
          const res = await axios.put(`${url}/category/${category[i]._id, data}`);
          setCategoryDetails({ categoryName: "", parentCategory: "No Selection" });
          setProperties([])
          setInputImg(null);
          return;
        }
      }
      const res = await axios.post(`${url}/category`, data);
      setCategoryDetails({ categoryName: "", parentCategory: "No Parent Category" });
      setInputImg(null);
      setProperties([])
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(`${url}/category`);
        setCategory(res.data);
        setIsLoader(false);
      } catch (error) {
        console.error(error);
      }
    }
    getCategories();
  }, [categoryDetails])

  const handleCategoryImg = async (e) => {
    try {
      const data = e.target.files[0];
      const formData = new FormData();
      const fileName = Date.now() + data.name;
      formData.append('fileName', fileName);
      formData.append('image', data);
      await axios.post(`${url}/image/single`, formData);
      setInputImg(fileName);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className='p-12 w-full flex flex-col gap-4'>
      <header>
        <h1 className={`text-4xl text-slate-700`}>Category</h1>
        <h3 className={`text-lg text-slate-500`}>{category.length} entries found</h3>
      </header>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2 w-full'>
        <label htmlFor="category" className='text-lg text-slate-600'>Create New Categories</label>
        <div className='flex items-center gap-4'>
          <div onDragOver={e => e.preventDefault()}>
            <input onChange={handleCategoryImg} id='categoryImg' type="file" className='hidden' />
            <label htmlFor='categoryImg' className='flex flex-col text-lg text-blue-500 cursor-pointer items-center justify-center bg-slate-100 h-28 w-28 rounded border-2 border-blue-500'><FiUpload className='h-10 w-10' />Add Image</label>
          </div>
          {inputImg && <div id='image' className='my-4 flex'>
            <ImgBox name={inputImg} />
          </div>}
        </div>
        <div className='flex w-full justify-evenly gap-2'>
          <input id='category' name='categoryName' onChange={e => setCategoryDetails({ ...categoryDetails, [e.target.name]: e.target.value })} value={categoryDetails.categoryName} type="text" className='border-2 p-2 my-2 bg-slate-100 border-slate-300 focus:outline-blue-500 rounded-md w-full h-12 text-lg text-slate-700' placeholder='Category Name' />
          <DropDown name="category" setCategoryDetails={setCategoryDetails} categoryDetails={categoryDetails} noSelectionText="No Parent Category" category={category} dropInputCss="w-full" dropDownCss="w-[36.3%]" />
        </div>
        <CategoryProperty properties={properties} setProperties={setProperties} />
        <button type='submit' className='btnPrimary my-4 w-fit p-3 px-5 text-lg'>Save</button>
      </form>
      <CategoryTable category={category} setInputImg={setInputImg} setProperties={setProperties} setCategoryDetails={setCategoryDetails} isLoader={isLoader} />
      {isLoader && <Loader />}
    </section>
  )
}

export default Category