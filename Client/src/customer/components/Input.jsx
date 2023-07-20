import React from 'react'

const Input = ({id, name, value, onChange}) => {

    return (
        <div className='flex relative flex-col justify-center border-b-2 border-purple-500 my-2 py-1 gap-2'>
            <input name={name} value={value} id={id} onChange={onChange} type={name === 'Password' || name === "Confirm" ? "password" : "text"} className='bg-transparent peer focus:outline-none' />
            <label htmlFor={id} className={`absolute text-inherit bg-transparent peer-focus:text-base peer-focus:-translate-y-5 cursor-text transition-all duration-300 peer-focus:text-purple-500 ${value ? "-translate-y-5 text-base text-purple-500" : "lg:text-lg text-sm"}`}>{name === "Confirm" ? "Confirm Password" : name}</label>
        </div>
    )
}

export default Input