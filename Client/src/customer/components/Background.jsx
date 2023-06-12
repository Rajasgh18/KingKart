import React from 'react'

const Background = ({ backgroundRef }) => {
    return (
        <div className='h-96 my-10 w-full gap-4 bg-gradient-to-r from-violet-500 to-blue-400 flex rounded-2xl'>
            <aside id='headings' ref={e => backgroundRef.current[0] = e} className='w-1/2 h-full relative flex flex-col items-start px-20 justify-center'>
                <h3 className='cursor-default text-2xl font-viga text-yellow-400'>Beats Solo</h3>
                <h2 className='cursor-default text-7xl font-viga text-green-400 '>Wireless</h2>
                <h3 className='cursor-default text-9xl font-viga text-white font-bold'>HEADPHONES</h3>
                <button className='p-2 px-4 transition-transform hover:scale-110 text-white bg-red-500 text-lg rounded-md'>Shop Wireless headphone</button>
            </aside>
            <aside className='w-1/2 h-full flex items-center justify-center'>
                <img id='bgImg' ref={e => backgroundRef.current[1] = e} src="/assets/images/headphones_a_4.webp" className='h-full relative w-full object-contain' alt="" />
            </aside>
        </div>
    )
}

export default Background