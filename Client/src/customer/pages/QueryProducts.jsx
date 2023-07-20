import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import {UserContext} from '../context/UserContext';

const QueryProducts = () => {

    const {url} = useContext(UserContext);
    const searchQuery = useLocation().search;
    const Navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [isLoader, setIsLoader] = useState(true);
    const productImgRef = useRef(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios.get(`${url}/product/search${searchQuery}`);
            setProducts(res.data);
            setIsLoader(false);
            const productsEle = document.getElementsByClassName('leftAppear');
            Array.from(productsEle).forEach((product, index) => {
                const delay = (index + 1) * 150;
                product.style.animation = `appearLeft ${delay}ms ease-in-out`;
            });
        }
        fetchProducts();
    }, []);
    return (
        <>
            {!isLoader ? <section className='flex gap-3 mx-20 my-5 flex-grow text-slate-700'>
                {/* <aside className='w-1/4 p-4 flex flex-col rightAppear relative rounded bg-white shadow-[0_2px_8px_2px] shadow-slate-300'>
                    <h1 className='text-2xl'>Filters</h1>
                </aside> */}
                <aside className='flex flex-col py- flex-grow rounded bg-white shadow-[0_2px_8px_2px] shadow-slate-300'>
                    {products.length !== 0 && products.map(p => {
                        return <div onClick={() => { Navigate(`/${p._id}`) }} key={p._id} className='h-52 leftAppear flex relative hover:text-blue-600 cursor-pointer border-b-2 p-4'>
                            <img ref={productImgRef} src={`/assets/productImg/${p.img[0]}`} className={`h-full w-1/4 transition-all duration-300 object-contain`} alt="" />
                            <aside className='flex flex-col gap-2 flex-grow'>
                                <h2 className='text-inherit text-xl'>{p.name}</h2>
                                <div className='flex gap-2'>
                                    <span className='flex rounded px-2 bg-green-500 text-white items-center justify-center gap-1 w-fit'>{p.rating}<AiFillStar /></span>
                                    <div className='flex gap-2 items-end'>
                                        <span className='text-lg text-slate-700 font-viga'>Rs {p.offerPrice}</span>
                                        <span className='text text-slate-500 line-through'>Rs {p.mrp}</span>
                                        <span className='text text-green-600'>{Math.round(((p.mrp - p.offerPrice) / p.mrp) * 100)}%off</span>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    })}
                </aside>
            </section> : <div className='flex flex-grow items-center justify-center'><TailSpin height={60} width={70} color='blue' /></div>}
        </>
    )
}

export default QueryProducts