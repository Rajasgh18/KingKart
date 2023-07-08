import React, { useContext, useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const SearchResult = ({ searchQuery, searchResultRef, setSearchQuery }) => {
    const {url} = useContext(UserContext);
    const encodedQuery = encodeURIComponent(searchQuery);
    const [isLoader, setIsLoader] = useState(true);
    const [resultItems, setResultItems] = useState([]);
    const Navigate = useNavigate();

    useEffect(() => {
        const fetchSearchResults = async () => {
            setIsLoader(true);
            try {
                const res = await axios.get(`${url}/product/search?products=${encodedQuery}`);
                setResultItems(res.data);
                setIsLoader(false);
            } catch (error) {
                console.error(error);
            }
        }
        fetchSearchResults();
    }, [encodedQuery]);

    return (
        <div ref={searchResultRef} className='absolute dropDownShow text-slate-700 top-14 w-full flex items-center max-h-72 scrollBar py-3 flex-col gap-2 bg-white shadow-[0_0_8px] shadow-slate-500 rounded-lg'>
            {!isLoader ? resultItems.length !== 0 ? resultItems.map(item => {
                return <div key={item._id} onClick={() => { Navigate(`/${item._id}`); setSearchQuery('') }} className='flex w-full gap-2 px-3 items-center hover:bg-blue-100 cursor-pointer'>
                    <img src={`/assets/productImg/${item.img[0]}`} className='w-16 h-16 p-2 rounded-md ' alt="" />
                    <div className='flex flex-col'>
                        <h3 className='text-slate-700 text-lg'>{item.name}</h3>
                        <span className='text-blue-600 text-sm'>in {item.category.categoryName}</span>
                    </div>
                </div>
            }) : "No result found" : <TailSpin height={30} width={30} color='blue' />}
        </div>
    )
}

export default SearchResult