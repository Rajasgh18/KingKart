import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import axios from 'axios';
import { AiFillStar } from 'react-icons/ai';
import { FaBolt, FaShoppingCart } from 'react-icons/fa';
import Offer from '../components/Offer';
import Exchange from '../components/Exchange';
import ProductInfo from '../components/ProductInfo';
import Product from '../components/Product';

const ProductPage = () => {
  const _id = useLocation().pathname;
  const [productDetail, setProductDetail] = useState({});
  const [isLoader, setIsLoader] = useState(true);
  const [imgIndex, setImgIndex] = useState(0);
  const Navigate = useNavigate();


  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/product${_id}`);
        setProductDetail(res.data);
        setIsLoader(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProductDetails();
  }, [_id]);

  const [products, SetProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/product');
        SetProducts(res.data);
        setIsLoader(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProducts();
  }, [])

  return (
    <>
      {!isLoader ?
        <section className='flex flex-col gap-10'>
          <section className='mx-20 flex min-h-[90vh] bg-white shadow-md'>
            <aside className='w-[40%] h-[91vh] p-4 flex flex-col sticky top-14 left-0 items-center'>
              <div className='flex w-full justify-center h-2/3'>
                <div className={`flex flex-col flex-shrink-0 border-2 gap-2 overflow-y-auto p-2 full `}>
                  {productDetail.img.map((i, index) => {
                    return <img onMouseEnter={() => setImgIndex(index)} key={index} src={`/assets/productImg/${i}`} alt="" className={`${index === imgIndex && "border-2 border-blue-500"} w-20 h-20 productImg cursor-pointer imgLoad bg-slate-200 rounded object-contain`} />
                  })}
                </div>
                <div className='w-full h-full '>
                  <img src={`/assets/productImg/${productDetail.img[imgIndex]}`} className={`w-full imgLoad h-full border-2 border-l-0 bg-slate-100 object-contain`} alt="" />
                </div>
              </div>
              <div className='w-full flex my-5 gap-4'>
                <button className='hover:bg-yellow-400 text-white flex items-center gap-2 justify-center rounded p-3 px-4 bg-yellow-500 text-xl w-full'><FaShoppingCart />Add to Cart</button>
                <button className='hover:bg-orange-400 flex items-center justify-center gap-2 text-white rounded p-3 px-4 bg-orange-500 text-xl w-full'><FaBolt />Buy Now</button>
              </div>
            </aside>
            <aside className='flex-grow gap-3 flex flex-col p-4'>
              <h2 className='text-2xl text-slate-700'>{productDetail.name}</h2>
              <span className='flex rounded px-2 bg-green-500 text-white items-center justify-center gap-1 w-fit'>{productDetail.rating}<AiFillStar /></span>
              <div className='flex flex-col'>
                <span className='text-green-600'>Extra Rs 3000 off</span>
                <div className='flex gap-4 items-end'>
                  <span className='text-4xl text-slate-700 font-viga'>Rs {productDetail.price}</span>
                  <span className='text-lg text-slate-500 line-through'>Rs 7  ,999</span>
                  <span className='text-lg text-green-600'>11%off</span>
                </div>
                <span className='text-slate-700'>+ Rs 99 Secured Packaging Fee</span>
              </div>
              <Offer />
              <Exchange productDetail={productDetail} />
              <ProductInfo setImgIndex={setImgIndex} productDetail={productDetail} imgIndex={imgIndex} />
            </aside>
          </section>
          <section className='mx-20 bg-white p-5 shadow-md flex flex-col gap-8 mb-10'>
            <h1 className='text-4xl text-slate-600'>More Products</h1>
            <div className='flex scrollBar p-2 gap-5'>
              {products.map(p => {
                return <div onClick={() => { Navigate(`/${p._id}`) }} key={p._id} className='flex flex-shrink-0 text-slate-700 hover:text-blue-500 flex-col gap-2'>
                  <img src={`assets/productImg/${p.img[0]}`} className='h-40 p-2 w-40 duration-200 cursor-pointer transition-transform hover:scale-110 bg-slate-200 rounded-lg' alt="" />
                  <h4 className='text-inherit'>{p.name}</h4>
                  <span className='flex rounded px-1 bg-green-500 text-white items-center justify-center gap-1 w-fit'>{p.rating}<AiFillStar /></span>
                  <div className='flex gap-2 items-end'>
                    <span className='text-sm text-slate-700 font-viga'>Rs {p.price}</span>
                    <span className='text-sm text-slate-500 line-through'>Rs 7,999</span>
                    <span className='text-sm text-green-600'>11%off</span>
                  </div>
                </div>
              })}
            </div>
          </section>
        </section>
        : <Loader />
      }
    </>
  )
}

export default ProductPage