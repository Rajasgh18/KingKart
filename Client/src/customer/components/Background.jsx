import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md';

const Background = ({ backgroundRef }) => {

    const caraousel = ["car1.svg", "car2.svg", "car3.svg"];
    const [activeIndex, setActiveIndex] = useState(0);
    const caraouselRef = useRef([]);

    useEffect(() => {
        const interval = setInterval(() => {
            caraouselRef.current.forEach(element => {
                element.style.transform = `translateX(-${activeIndex * 100}%)`
            });
            setActiveIndex((prevIndex) => (prevIndex+1) % 3);
            console.log(activeIndex)
        }, 3000);

        return () => clearInterval(interval);
    }, [activeIndex]);

    return (
        <div className={`lg:h-[760px] relative md:h-72 sm:h-52 overflow-hidden h-40 w-full flex items-center`}>
            {caraousel.map((item, index) => {
                return <div key={index} ref={e => caraouselRef.current[index] = e} className={`min-w-full h-full ease-in-out transition-transform duration-1000 bg-[url(/assets/svgs/${item})] bg-no-repeat bg-cover flex flex-col`}>
                    <aside id='headings' className='w-1/2 h-full relative flex flex-col items-start lg:px-20 md:px-14 sm:px-8 px-4 justify-center'>
                        <h3 className='cursor-default lg:text-2xl md:text-xl sm:text-base text-base font-viga text-yellow-400'>Beats Solo</h3>
                        <h2 className='cursor-default lg:text-7xl md:text-5xl sm:text-3xl text-xl font-viga text-green-400 '>Wireless</h2>
                        <h3 className='cursor-default lg:text-9xl md:text-7xl sm:text-5xl text-3xl font-viga text-white font-bold'>HEADPHONES</h3>
                        <button className='lg:p-2 lg:px-4 lg:text-lg md:text-base md:p-1 md:px-3 p-[0.2rem] px-2 my-1 text-sm  transition-transform hover:scale-110 text-white bg-red-500 rounded-md'>Shop Now</button>
                    </aside>
                </div>
            })}
        </div>
    )
}

export default Background