import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BsChevronDown } from "react-icons/bs";
import DropDown from '../components/DropDown';
import CategoryTable from '../components/CategoryTable';
import Loader from '../components/Loader';
import CategoryProperty from '../components/CategoryProperty';

const Category = () => {

  const [category, setCategory] = useState([]);
  const [categoryDetails, setCategoryDetails] = useState({ categoryName: "", parentCategory: "No Parent Category", properties: [{}] });
  const [properties, setProperties] = useState([]);

  const [isLoader, setIsLoader] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = { ...categoryDetails, properties };
      if (categoryDetails.parentCategory === "No Parent Category")
        data = { categoryName: categoryDetails.categoryName, parentCategory: null, properties };
      for (let i = 0; i < category.length; i++) {
        if (category[i].categoryName === categoryDetails.categoryName) {
          const res = await axios.put('http://localhost:5000/api/category/' + category[i]._id, data);
          setCategoryDetails({ categoryName: "", parentCategory: "No Parent Category" });
          setProperties([])
          return;
        }
      }
      const res = await axios.post('http://localhost:5000/api/category', data);
      setCategoryDetails({ categoryName: "", parentCategory: "No Parent Category" });
      setProperties([])
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/category');
        setCategory(res.data);
        setIsLoader(false);
      } catch (error) {
        console.error(error);
      }
    }
    getCategories();
  }, [categoryDetails])

  return (
    <section className='p-12 w-full flex flex-col gap-4'>
      <header>
        <h1 className={`text-4xl text-slate-700`}>Category</h1>
        <h3 className={`text-lg text-slate-500`}>{category.length} entries found</h3>
      </header>
      <form onSubmit={handleSubmit} className='flex flex-col w-full'>
        <label htmlFor="category" className='text-lg text-slate-600'>Create New Categories</label>
        <div className='flex w-full justify-evenly gap-2'>
          <input id='category' name='categoryName' onChange={e => setCategoryDetails({ ...categoryDetails, [e.target.name]: e.target.value })} value={categoryDetails.categoryName} type="text" className='border-2 p-2 my-2 bg-slate-100 border-slate-300 focus:outline-blue-500 rounded-md w-full h-12 text-lg text-slate-700' placeholder='Category Name' />
          <DropDown name="category" setCategoryDetails={setCategoryDetails} categoryDetails={categoryDetails} noSelectionText="No Parent Category" category={category} dropInputCss="w-full" dropDownCss="w-[36.3%]" />
        </div>
        <CategoryProperty properties={properties} setProperties={setProperties} />
        <button type='submit' className='btnPrimary my-4 w-fit p-3 px-5 text-lg'>Save</button>
      </form>
      <CategoryTable category={category} setProperties={setProperties} setCategoryDetails={setCategoryDetails} isLoader={isLoader} />
      {isLoader && <Loader />}
    </section>
  )
}

export default Category