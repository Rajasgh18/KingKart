import React from 'react'

const Background = ({ backgroundRef }) => {
    return (
        <div className={`lg:h-[760px] md:h-72 lg:gap-4 sm:h-52 sm:gap-2 h-40 bg-[url(/assets/change1.svg)] bg-no-repeat bg-cover w-full flex`}>
            <aside id='headings' ref={e => backgroundRef.current[0] = e} className='w-1/2 h-full relative flex flex-col items-start lg:px-20 md:px-14 sm:px-8 px-4 justify-center'>
                <h3 className='cursor-default lg:text-2xl md:text-xl sm:text-base text-base font-viga text-yellow-400'>Beats Solo</h3>
                <h2 className='cursor-default lg:text-7xl md:text-5xl sm:text-3xl text-xl font-viga text-green-400 '>Wireless</h2>
                <h3 className='cursor-default lg:text-9xl md:text-7xl sm:text-5xl text-3xl font-viga text-white font-bold'>HEADPHONES</h3>
                <button className='lg:p-2 lg:px-4 lg:text-lg md:text-base md:p-1 md:px-3 p-[0.2rem] px-2 my-1 text-sm  transition-transform hover:scale-110 text-white bg-red-500 rounded-md'>Shop Now</button>
            </aside>
        </div>
    )
}

export default Background