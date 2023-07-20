import React from 'react';
import { BsInstagram, BsWhatsapp, BsFacebook, BsFillPhoneFill } from 'react-icons/bs';

const About = () => {
    return (
        <section className='flex flex-grow sm:flex-row flex-col w-full items-start justify-center lg:gap-10 md:gap-8 sm:gap-5 gap-5 lg:p-16 md:p-12 sm:p-8 p-5 lg:px-24 md:px-20 sm:px-16 px-8'>
            <img src="/assets/logo.svg" className='rightAppear w-full rounded' alt="" />
            <aside className='flex leftAppear lg:text-xl md:text-base text-xs w-full flex-col text-slate-700 sm:gap-4 gap-2'>
                <p>Welcome to our e-commerce website, your ultimate destination for all your electronic product needs and PC building solutions. At KGN computer, we pride ourselves on offering a wide range of high-quality electronic, along with exceptional customer service, to ensure your satisfaction and peace of mind. We understand the importance of reliablity when it comes to online shopping, especially for electronics. That's why we go the extra mile to ensure that every purchase you make is a positive experience. Hope you will find Exclusive, Unique and Rare Products in just one click.</p>
                <div>
                    <p>Regards,</p>
                    <p>Team KGN Computer</p>
                </div>
                <div className='flex sm:gap-4 gap-2'>
                    <BsInstagram className='sm:w-7 sm:h-7 w-5 h-5 cursor-pointer hover:text-pink-500 transition-colors duration-300' />
                    <BsFacebook className='sm:w-7 sm:h-7 w-5 h-5 cursor-pointer hover:text-blue-700 transition-colors duration-300' />
                    <BsWhatsapp className='sm:w-7 sm:h-7 w-5 h-5 cursor-pointer hover:text-green-600 transition-colors duration-300' />
                </div>
            </aside>
        </section>
    )
}

export default About