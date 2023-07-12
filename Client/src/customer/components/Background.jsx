import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md';

const Background = ({ backgroundRef }) => {

    const caraousel = ["Frame3.svg", "Frame22.svg", "Frame20.svg"];
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
                return <div key={index}  className={`min-w-full relative h-full flex flex-col`}>
                    <img ref={e => caraouselRef.current[index] = e} src={`/assets/svgs/${item}`} className={`transition-transform duration-1000 object-cover w-full h-full absolute`} alt="" />
                    <aside id='headings' className='w-1/2 h-full relative flex flex-col items-start lg:px-20 md:px-14 sm:px-8 px-4 justify-center'>
                   
             
                    </aside>
                </div>
            })}
        </div>
    )
}

export default Background