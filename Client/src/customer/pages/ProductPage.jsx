import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AiFillStar } from 'react-icons/ai';
import ProductInfo from '../components/ProductInfo';
import { UserContext } from '../context/UserContext';
import 'intersection-observer';
import { TailSpin } from 'react-loader-spinner';
import DialogBox from '../components/DialogBox';
import Loader from '../components/Loader';

const ProductPage = () => {

  const { setUser, setChanges, url, user, setSelectedProducts } = useContext(UserContext);
  const userId = localStorage.getItem('userId');
  const _id = useLocation().pathname;
  const [productDetail, setProductDetail] = useState({});
  const [isLoader1, setIsLoader1] = useState(true);
  const [isLoader2, setIsLoader2] = useState(true);
  const [isDialog, setIsDialog] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [text, setText] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const caraouselRef = useRef([]);
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
        const res = await axios.get(`${url}/product${_id}`);
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
        const res = await axios.get(`${url}/product`);
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
    if (user._id) {
      try {
        const res = await axios.put(`${url}/user/cart-add/${userId}`, { productId: productDetail._id })
        if (res.data === "Successfully added to the cart!") {
          setUser(prev => {
            const details = { ...prev };
            details.cartItems.push(productDetail._id);
            return details;
          });
          setText('Your product has been added to the cart');
          setIsDialog(true);
          setChanges(prev => [prev++]);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setText('Please login first!')
      setIsDialog(true);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      caraouselRef.current.forEach(element => {
        element.style.transform = `translateX(-${activeIndex * 100}%)`
      });
      setActiveIndex((prevIndex) => (prevIndex + 1) % productDetail?.img.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [productDetail, activeIndex]);

  const handleBuy = () => {
    if(user._id){
      setSelectedProducts([productDetail])
      Navigate('/address')
    }else{
      setText("Please Login First!");
      setIsDialog(true);
    }
  }

  return (
    <>
      {!isLoader1 ?
        <section className='lg:mx-20 md:mx-14 sm:mx-8 mx-4 lg:my-12 md:my-10 sm:my-8 my-4 gap-5 flex flex-col h-full'>
          <aside className='w-full lg:h-[400px] sm:h-[300px] h-[200px] relative bg-white shadow-[0_0_15px] shadow-slate-300 rounded-xl flex overflow-hidden'>
            {productDetail.img.length !== 0 && productDetail.img.map((img, index) => {
              return <div key={index} className={`min-w-full relative h-full flex flex-col`}>
                <img ref={e => caraouselRef.current[index] = e} src={`/assets/productImg/${img}`} className={`transition-transform duration-1000 object-contain absolute w-full h-full`} alt="" />
              </div>
            })}
            {/* <div className={`flex h-[100px] w-full border-2 md:gap-1 overflow-y-auto lg:gap-2 lg:p-2 sm:p-1 p-2 gap-2`}>
              {productDetail.img.map((i, index) => {
                return <img onMouseEnter={() => setImgIndex(index)} key={index} src={`/assets/productImg/${i}`} alt="" className={`${index === imgIndex && "border-2 border-blue-500"}  productImg cursor-pointer imgLoad bg-slate-200 rounded object-contain`} />
              })}
            </div> */}
          </aside>
          <aside className='leftAppear lg:gap-3 gap-2 flex flex-col'>
            <h2 className='lg:text-3xl md:text-xl text-slate-700'>{productDetail.name}</h2>
            <span className='flex rounded px-2 bg-green-500 text-white items-center justify-center gap-1 w-fit'>{productDetail.rating}<AiFillStar /></span>
            <div className='flex flex-col'>
              <span className='text-green-600'>Extra Rs {productDetail.mrp - productDetail.offerPrice} off</span>
              <div className='flex md:gap-4 gap-2 items-end'>
                <span className='lg:text-4xl md:text-3xl sm:text-2xl text-slate-700 font-viga'>Rs {productDetail.offerPrice}</span>
                <span className='lg:text-lg md:text-md sm:text-base text-sm text-slate-500 line-through'>Rs {productDetail.mrp}</span>
                <span className='lg:text-lg md:text-md sm:text-base text-sm text-green-600'>{Math.round(((productDetail.mrp - productDetail.offerPrice) / productDetail.mrp) * 100)}%off</span>
              </div>
              <span className='text-slate-700 lg:text-lg md:text-md sm:text-base text-sm'>+ Rs {productDetail.deliveryCharge} Delivery Charge</span>
            </div>
            {/* <Offer /> */}
            {/* <Exchange productDetail={productDetail} /> */}
          </aside>
          <ProductInfo setImgIndex={setImgIndex} productDetail={productDetail} imgIndex={imgIndex} />
          <aside className='w-full flex justify-center my-5 gap-4'>
            <button onClick={handleCart} className='hover:bg-slate-700 text-white flex items-center gap-2 justify-center rounded md:p-3 md:px-4 p-2 px-3 text-base bg-slate-800 md:text-xl'>Add to Cart</button>
            <button onClick={handleBuy} className='hover:bg-slate-700 flex items-center justify-center gap-2 text-white rounded md:p-3 md:px-4 p-2 px-3 text-base bg-slate-800 md:text-xl'>Buy Now</button>
          </aside>
          {isDialog && <DialogBox text={text} setIsDialog={setIsDialog} isDialog={isDialog} />}
          <aside className='flex flex-col gap-8'>
            <div className='w-full flex justify-center'>
              <div className='w-fit flex justify-center flex-col gap-1'>
                <h1 className='text-center lg:text-4xl md:text-3xl sm:text-2xl text-xl font-viga text-slate-800'>Related Products</h1>
                <hr className='border-b-2 mx-[10%] border-red-500' />
              </div>
            </div>
            <div className='flex scrollBar p-2 gap-5'>
              {!isLoader2 ? products.map((p, index) => {
                return <div
                  className='flex relative bottomA flex-shrink-0 text-slate-700 hover:text-blue-500 flex-col gap-2'
                  onClick={() => { Navigate(`/${p._id}`) }}
                  ref={(element) => { (productRefs.current[index] = element) }} key={p._id}>
                  <img src={`assets/productImg/${p.img[0]}`} className='h-40 p-2 w-40 duration-200 cursor-pointer transition-transform hover:scale-110 bg-white shadow-[0_0_10px] shadow-slate-300 rounded-lg' alt="" />
                  <h4 className='text-inherit'>{p.name.length <= 18 ? p.name : `${p.name.substring(0, 18)}...`}</h4>
                  <span className='flex rounded px-1 bg-green-500 text-white items-center justify-center gap-1 w-fit'>{p.rating}<AiFillStar /></span>
                  <div className='flex gap-2 items-end'>
                    <span className='text-sm text-slate-700 font-viga'>Rs {p.offerPrice}</span>
                    <span className='text-sm text-slate-500 line-through'>Rs {p.mrp}</span>
                    <span className='text-sm text-green-600'>{Math.round(((p.mrp - p.offerPrice) / p.mrp) * 100)}%off</span>
                  </div>
                </div>
              }) : <div className='flex-grow w-full flex justify-center items-center'><TailSpin width={60} height={60} color='blue' /></div>}
            </div>
          </aside>
        </section> : <Loader />}
    </>
  )
}

export default ProductPage