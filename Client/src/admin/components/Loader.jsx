import React from 'react'
import HashLoader from "react-spinners/HashLoader";
const Loader = () => {
    return (
        <div className='w-full h-full flex items-center justify-center'>
            <HashLoader speedMultiplier={1.2} color='#3b82f6'/>
        </div>
    )
}

export default Loader;