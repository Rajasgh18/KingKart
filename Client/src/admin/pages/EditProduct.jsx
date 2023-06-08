import React, { useEffect, useState } from 'react';
import { FiUpload } from "react-icons/fi";
import Loader from '../components/Loader';
import ImgBox from '../components/ImgBox';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ChooseCategories from '../components/ChooseCategories';
import DropDown from '../components/DropDown';
const EditProduct = () => {

    const [isLoader, setIsLoader] = useState(true);
    const [formDetails, setFormDetails] = useState({ _id: '', name: '', desc: '', category: '', price: '', rating: '' });
    const [inputImg, setInputImg] = useState("");
    const [category, setCategory] = useState([]);
    const [choosedCategory, setChoosedCategory] = useState('No Category');
    const [properties, setProperties] = useState({});
    // const [dropDownValue, setDropDownValue] = useState("No Category");
    const id = useParams().id;
    const Navigate = useNavigate();
    const propertiesToFill = [];

    const addImgHandle = async (e) => {
        const data = Array.from(e.target.files);
        try {
            for (let i = 0; i < data.length; i++) {
                const formData = new FormData();
                const fileName = Date.now() + data[i].name;
                formData.append('fileName', fileName);
                formData.append('image', data[i]);
                const res = await axios.post('http://localhost:5000/api/image/single', formData);
                setInputImg(prev => [...prev, fileName]);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { ...formDetails, img: inputImg, properties };
        console.log(properties)
        try {
            const res = await axios.put('http://localhost:5000/api/product/' + id, data);
            Navigate('/admin/products');
        } catch (error) {
            console.error(error);
        }
    }
    const getDetails = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/product/${id}`);
            setFormDetails({ ...res.data });
            setProperties(res.data.properties);
            setInputImg(res.data.img);
            setIsLoader(false);
        } catch (error) {
            console.error(error);
        }
    }

    const handleReset = () => {
        getDetails();
    }

    useEffect(() => {
        getDetails();
    }, []);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/category');
                setCategory(res.data);
            } catch (error) {
                console.error(error)
            }
        }
        getCategories();
    }, [])

    useEffect(() => {
        if (category.length !== 0) {
            const catName = category?.find(({ _id }) => _id === formDetails.category);
            setChoosedCategory(catName?.categoryName || "No Category");
        }
    }, [category, properties])

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
        isLoader ? <Loader /> :
            <div className='flex flex-col gap-4 px-12 py-8 text-slate-600'>
                <h1 className='text-3xl text-slate-700'>Edit Product</h1>
                <form onSubmit={handleSubmit} onReset={handleReset} className='flex w-full flex-col rounded-lg opacity-100'>
                    <label htmlFor="name" className='text-lg'>Product Name</label>
                    <input onChange={e => setFormDetails({ ...formDetails, [e.target.id]: e.target.value })} id='name' type="text" className='inputPrimary' value={formDetails.name} />
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
                    <DropDown choosedCategories={choosedCategory}    formDetails={formDetails} setFormDetails={setFormDetails} setProperties={setProperties} setChoosedCategory={setChoosedCategory} name="product" noSelectionText="No Category" category={category} dropInputCss="w-1/4 my-4" dropDownCss="w-[18.4%]" />
                    <ChooseCategories propertiesToFill={propertiesToFill} name="edit" properties={properties} setProperties={setProperties} />
                    <label htmlFor="desc" className='text-lg'>Description</label>
                    <textarea onChange={e => setFormDetails({ ...formDetails, [e.target.id]: e.target.value })} id='desc' className='inputPrimary' value={formDetails.desc} />
                    <label htmlFor="price" className='text-lg'>Price</label>
                    <input onChange={e => setFormDetails({ ...formDetails, [e.target.id]: e.target.value })} id='price' type='number' className='inputPrimary' value={formDetails.price} />
                    <label htmlFor="rating" className='text-lg'>Rating</label>
                    <input onChange={e => setFormDetails({ ...formDetails, [e.target.id]: e.target.value })} id='rating' type="number" className='inputPrimary' value={formDetails.rating} />
                    <div className='flex gap-4 mt-4 items-center'>
                        <button type='submit' className='bg-blue-500 cursor-pointer text-white w-fit rounded-md p-3 px-6 text-lg'>Save</button>
                        <button type='reset' className='bg-red-500 cursor-pointer text-white w-fit rounded-md p-3 px-6 text-lg'>Reset</button>
                    </div>
                </form>
            </div>
    )
}

export default EditProduct