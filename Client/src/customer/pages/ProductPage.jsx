import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AiFillStar } from 'react-icons/ai';
import { FaBolt, FaShoppingCart } from 'react-icons/fa';
import Offer from '../components/Offer';
import Exchange from '../components/Exchange';
import ProductInfo from '../components/ProductInfo';
import { UserContext } from '../context/UserContext';
import 'intersection-observer';
import { TailSpin } from 'react-loader-spinner';

const ProductPage = () => {

  const { setUser, setChanges } = useContext(UserContext);
  const userId = localStorage.getItem('userId');
  const _id = useLocation().pathname;
  const [productDetail, setProductDetail] = useState({});
  const [isLoader1, setIsLoader1] = useState(true);
  const [isLoader2, setIsLoader2] = useState(true);
  const [imgIndex, setImgIndex] = useState(0);
  const Navigate = useNavigate();

  const productRefs = useRef([]);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const productsEle = document.querySelectorAll('.bottomA');
      if (entry.isIntersecting) {
        Array.from(productsEle).forEach((product, index) => {
          const delay = (index + 1) * 100;
          product.style.animation = `appearBottom ${delay}ms ease-in-out`;
        });
      } else {
        Array.from(productsEle).forEach((product, index) => {
          product.style.animation = ``;
        });
      }
    });
  },
    { rootMargin: '0px' }
  );


  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoader1(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/product${_id}`);
        setProductDetail(res.data);
        setIsLoader1(false);
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
        setIsLoader2(false);
        productRefs.current.forEach((element, index) => {
          if (element) {
            observer.observe(element);
          }
        });
        return () => {
          productRefs.current.forEach((element) => {
            if (element) {
              observer.unobserve(element);
            }
          });
        };
      } catch (error) {
        console.error(error);
      }
    }
    fetchProducts();
  }, []);

  const handleCart = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/user/cart-add/${userId}`, { productId: productDetail._id })
      if (res.data === "Successfully added to the cart!") {
        setUser(prev => {
          const details = { ...prev };
          details.cartItems.push(productDetail._id);
          return details;
        });
        setChanges(prev => [prev++]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {!isLoader1 ? <section className='flex flex-col gap-10 flex-1'>
        <section className='mx-20 flex h-full bg-white shadow-md'>
          <aside className='w-[40%] h-2/3 p-4 flex flex-col sticky top-14 left-0 items-center'>
            <div className='flex w-full justify-center h-full'>
              <div className={`flex flex-col flex-shrink-0 border-2 gap-2 overflow-y-auto p-2`}>
                {productDetail.img.map((i, index) => {
                  return <img onMouseEnter={() => setImgIndex(index)} key={index} src={`/assets/productImg/${i}`} alt="" className={`${index === imgIndex && "border-2 border-blue-500"} w-20 h-20 productImg cursor-pointer imgLoad bg-slate-200 rounded object-contain`} />
                })}
              </div>
              <div className='w-full h-full'>
                <img src={`/assets/productImg/${productDetail.img[imgIndex]}`} className={`w-full imgLoad h-96 border-2 border-l-0 bg-slate-100 object-contain`} alt="" />
              </div>
            </div>
            <div className='w-full flex my-5 gap-4'>
              <button onClick={handleCart} className='hover:bg-yellow-400 text-white flex items-center gap-2 justify-center rounded p-3 px-4 bg-yellow-500 text-xl w-full'><FaShoppingCart />Add to Cart</button>
              <button className='hover:bg-orange-400 flex items-center justify-center gap-2 text-white rounded p-3 px-4 bg-orange-500 text-xl w-full'><FaBolt />Buy Now</button>
            </div>
          </aside>
          <aside className='flex-grow leftAppear relative gap-3 flex flex-col p-4'>
            <h2 className='text-2xl text-slate-700'>{productDetail.name}</h2>
            <span className='flex rounded px-2 bg-green-500 text-white items-center justify-center gap-1 w-fit'>{productDetail.rating}<AiFillStar /></span>
            <div className='flex flex-col'>
              <span className='text-green-600'>Extra Rs {productDetail.mrp - productDetail.offerPrice} off</span>
              <div className='flex gap-4 items-end'>
                <span className='text-4xl text-slate-700 font-viga'>Rs {productDetail.offerPrice}</span>
                <span className='text-lg text-slate-500 line-through'>Rs {productDetail.mrp}</span>
                <span className='text-lg text-green-600'>{Math.round(((productDetail.mrp - productDetail.offerPrice) / productDetail.mrp) * 100)}%off</span>
              </div>
              <span className='text-slate-700'>+ Rs {productDetail.deliveryCharge} Delivery Charge</span>
            </div>
            <Offer />
            <Exchange productDetail={productDetail} />
            <ProductInfo setImgIndex={setImgIndex} productDetail={productDetail} imgIndex={imgIndex} />
          </aside>
        </section>
        <section className='mx-20 bg-white p-5 shadow-md flex flex-col gap-8 mb-10'>
          <h1 className='text-4xl text-slate-600'>More Products</h1>
          <div className='flex scrollBar p-2 gap-5'>
            {!isLoader2 ? products.map((p, index) => {
              return <div
                className='flex relative bottomA flex-shrink-0 text-slate-700 hover:text-blue-500 flex-col gap-2'
                onClick={() => { Navigate(`/${p._id}`) }}
                ref={(element) => { (productRefs.current[index] = element) }} key={p._id}>
                <img src={`assets/productImg/${p.img[0]}`} className='h-40 p-2 w-40 duration-200 cursor-pointer transition-transform hover:scale-110 bg-slate-200 rounded-lg' alt="" />
                <h4 className='text-inherit'>{p.name.length <= 18 ? p.name : `${p.name.substring(0, 18)}...`}</h4>
                <span className='flex rounded px-1 bg-green-500 text-white items-center justify-center gap-1 w-fit'>{p.rating}<AiFillStar /></span>
                <div className='flex gap-2 items-end'>
                  <span className='text-sm text-slate-700 font-viga'>Rs {p.offerPrice}</span>
                  <span className='text-sm text-slate-500 line-through'>Rs {p.mrp}</span>
                  <span className='text-sm text-green-600'>{Math.round(((p.mrp - p.offerPrice) / p.mrp) * 100)}%off</span>
                </div>
              </div>
            }) : <div className='flex-grow w-full flex justify-center items-center'><TailSpin width={60} height={60} color='blue'/></div>}
          </div>
        </section>
      </section> : <div className='flex-grow w-full flex justify-center items-center'><TailSpin width={60} height={60} color='blue'/></div>}
    </>
  )
}

export default ProductPage