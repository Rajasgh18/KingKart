import React from 'react'
import './loader.scss';
const Loader = () => {
    return (
        <div className='w-full h-full flex items-center justify-center'>
            <div className='loader'>
                <div className='blob'></div>
                <div className='blob'></div>
                <div className='blob'></div>
                <div className='blob'></div>
                <div className='blob'></div>
                <div className='blob'></div>
                <div className='blob'></div>
            </div>
        </div>
    )
}

export default Loader