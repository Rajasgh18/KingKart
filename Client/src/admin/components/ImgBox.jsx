import React from 'react'

const ImgBox = ({ name }) => {
    return (
        <img
            id='imgLoad'
            src={`/assets/productImg/${name}`}
            className='object-contain w-28 mr-4 h-28 border-2 border-slate-300 rounded bg-slate-100'
            alt=""
        />
    )
}

export default ImgBox