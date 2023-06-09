import React, { useEffect, useRef, useState } from 'react';
import { BsRobot } from 'react-icons/bs';
import { FaUserTie } from 'react-icons/fa';
import { Bars } from 'react-loader-spinner';

const ChatBot = () => {
    const chatBotRef = useRef();
    const chatBotBtnRef = useRef();
    const [isClicked, setIsClicked] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    const [messages, setMessages] = useState([{ name: 'chatbot', text: " I'm here to assist you with any questions, concerns, or issues you might have while navigating our online store.. How can I assist you today?", options: ["📦Product", "👨‍🔧Service"] }]);
    const [choosedOptions, setChoosedOptions] = useState([]);
    const scrollRef = useRef();

    const handleBtn = () => {
        setIsClicked(true);
    }

    const handleClickOutside = (e) => {
        if (chatBotRef.current && !chatBotRef.current.contains(e.target)) {
            chatBotRef.current.style.animation = 'chatDisappear 0.3s ease-in-out';
            setTimeout(() => {
                setIsClicked(false);
            }, 200);
        } else {
            if (chatBotRef.current && chatBotRef.current.contains(e.target))
                chatBotRef.current.style.animation = 'chatAppear 0.3s ease-in-out';
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, [isClicked]);

    const handleNewMessages = (e) => {
        setIsLoader(true);
        setMessages(prev => [...prev, { text: e, name: 'user', options: [] }]);
        setChoosedOptions(prev => [...prev, e]);
        setTimeout(() => {
            switch (e) {
                case '📦Product': setMessages(prev => [...prev, { text: "so,what's your Query related product☞", name: 'chatBot', options: ['Delivery🚚', 'Query for product🖥️', 'Another one'] }]);
                    break;
                case '👨‍🔧Service': setMessages(prev => [...prev, { text: "Tell me the issue", name: 'chatBot', options: ['Computer Related💻', 'Other Accesories🖨️', 'Service related'] }]);
                    break;
                case 'dash': setMessages(prev => [...prev, { text: "edd", name: 'chatBot', options: ['we', 'awwx', 'wsq'] }]);
                    break;
            }
        }, 1000);
        setIsLoader(false);
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [handleNewMessages]);

    return (
        <>
            {!isClicked ? <div ref={chatBotBtnRef} onClick={handleBtn} className='fixed bottom-16 right-16 bg-blue-400 border-2 border-blue-500 cursor-pointer hover:scale-110 transition-transform duration-200 p-2 rounded-lg text-white'><BsRobot className='w-10 h-10 pointer-events-none' /></div> :
                <div ref={chatBotRef} className='w-[30%] h-[60%] fixed scrollBar flex flex-col gap-4 bottom-16 right-16 chatBotAnim bg-white shadow-[0_0_10px] p-4 rounded-md shadow-slate-400'>
                    <div className='flex items-center gap-2'>
                        <BsRobot className='bg-slate-100 border border-blue-200 h-10 w-10 p-[0.4rem] text-blue-800 rounded-full' />
                        <h4 className='bg-slate-100 border border-blue-200 text-blue-800 w-fit p-2 px-3 cursor-default rounded-xl chatTextAppear'>👋 Hello there! Welcome to our e-commerce website support.</h4>
                    </div>
                    <div className='flex gap-5 flex-col'>
                        {messages.length !== 0 && messages.map((message, index) => {
                            return <div ref={scrollRef} key={index} className={`flex w-full flex-col gap-4 ${message.name === 'user' ? "items-end" : ""}`}>
                                {!isLoader && <><div className={`flex gap-2 ${message.name === 'user' ? "flex-row-reverse" : ""}`}>
                                    {message.name === 'user' ? <FaUserTie className='bg-slate-100 border border-blue-200 h-10 w-10 p-[0.4rem] text-blue-800 rounded-full' /> : <BsRobot className='bg-slate-100 border border-blue-200 h-10 w-10 p-[0.4rem] text-blue-800 rounded-full' />}
                                    <p className='bg-slate-100 text-blue-800 border border-blue-200 w-fit p-2 px-3 cursor-pointer rounded-xl chatTextAppear'>{message.text}</p>
                                </div>
                                    <div className='flex gap-2 flex-col w-fit'>
                                        {message.options.length !== 0 && message.options.map((option, index) => {
                                            return <span key={index} onClick={() => handleNewMessages(option)} className={`cursor-pointer chatTextAppear px-3 border p-2 ${choosedOptions.find(e => e === option) ? 'bg-blue-400 text-white' : 'text-blue-800 bg-slate-100 border-blue-200'} rounded-xl`}>{option}</span>
                                        })}
                                    </div>
                                </>}
                            </div>
                        })}
                        {isLoader && <div className={`flex gap-2 items-center`}>
                            <BsRobot className='bg-slate-100 border border-blue-200 h-10 w-10 p-[0.4rem] text-blue-800 rounded-full' />
                            <div className='bg-slate-100 border border-blue-200 text-blue-800 w-fit p-2 px-3 cursor-default rounded-xl chatTextAppear'>
                                <Bars height={30} color='blue' />
                            </div>
                        </div>}
                    </div>
                </div>
            }
        </>
    )
}

export default ChatBot;