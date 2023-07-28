import React, { useEffect, useRef } from 'react';
import { TailSpin } from 'react-loader-spinner';

const Loader = () => {
    const loaderRef = useRef();
    useEffect(()=>{
        window.scrollTo({ top: 0,});
    }, [])

    return (
        <div className='flex justify-center items-center min-h-[calc(100vh-3.5rem)] w-full'>
            <TailSpin height={60} width={60} color='blue' />
        </div>
    )
}

export default Loader