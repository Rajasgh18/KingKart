import React from 'react';
import HashLoader from "react-spinners/HashLoader";
const Loader = () => {
    return (
        <div className='min-w-screen min-h-screen flex items-center justify-center'>
            <HashLoader speedMultiplier={1.2} color='#3b82f6' />
        </div>
    )
}

export default Loader;