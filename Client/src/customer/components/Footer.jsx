import React from 'react';
import footerDetails from '../footer';
import { BsInstagram, BsWhatsapp, BsFacebook, BsFillPhoneFill } from 'react-icons/bs';
import { HiMail } from 'react-icons/hi';

const Footer = () => {
    return (
        <footer className='bg-[#0C1934] mt-10 p-12 md:px-16 px-10 text-slate-400 gap-10 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1'>
            {footerDetails.map((details, index) => {
                return <aside key={index} className='w-full flex flex-col gap-5'>
                    <div className='flex flex-col w-fit'>
                        <h3 className='text-lg text-white'>{details.title}</h3>
                        <hr className='mr-[35%] border-b border-red-500' />
                    </div>
                    {(index === 0 || index === 3) && <p className='text-sm'>{details.desc}</p>}
                    <div>
                        <div className='flex flex-col gap-2'>
                            {index !== 0 && details.list.map((item, ind) => {
                                return <div key={ind} className='flex gap-2 items-center'>
                                    {index === 3 && (ind === 0 ? <BsFillPhoneFill className='h-5 w-5'/> : <HiMail className='h-5 w-5'/>)}
                                    <li className='list-none hover:underline text-sm'>{item}</li>
                                </div>
                            })}
                        </div>
                        <div>
                            {index === 0 && <div className='flex gap-4'>
                                <BsInstagram className='w-6 h-6 cursor-pointer hover:text-slate-200 transition-colors duration-300' />
                                <BsFacebook className='w-6 h-6 cursor-pointer hover:text-slate-200 transition-colors duration-300' />
                                <BsWhatsapp className='w-6 h-6 cursor-pointer hover:text-slate-200 transition-colors duration-300' />
                            </div>}
                        </div>
                    </div>
                </aside>
            })}
        </footer>
    )
}

export default Footer;