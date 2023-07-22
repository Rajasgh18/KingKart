import React, { useContext, useEffect, useRef, useState } from 'react';
import { BsRobot } from 'react-icons/bs';
import { FaUserTie } from 'react-icons/fa';
import { AiOutlineSend } from 'react-icons/ai';
import { UserContext } from '../context/UserContext';
import { TailSpin } from 'react-loader-spinner';
import axios from 'axios';

const ChatBot = () => {
    const chatBotRef = useRef();
    const chatBotBtnRef = useRef();
    const [isClicked, setIsClicked] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    const [isInput, setIsInput] = useState(false);
    const [messages, setMessages] = useState([{ name: 'chatbot', text: " I'm here to assist you with any questions, concerns, or issues you might have while navigating our online store.. How can I assist you today?", options: ["📦Product", "👨‍🔧Service"] }]);
    const [choosedOptions, setChoosedOptions] = useState([]);
    const scrollRef = useRef();
    const [query, setQuery] = useState('');
    const [querySent, setQuerySent] = useState(false);
    const { url, user } = useContext(UserContext);

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
        setMessages(prev => [...prev, { text: e, name: 'user', options: [] }]);
        setChoosedOptions(prev => [...prev, e]);
        setTimeout(() => {
            switch (e) {
                case '📦Product': setMessages(prev => [...prev, { text: "so,what's your Query related product☞", name: 'chatBot', options: ['Delivery🚚', 'Query for product🖥️', 'Another one'] }]);
                    break;
                case '👨‍🔧Service': setMessages(prev => [...prev, { text: "Tell me the issue", name: 'chatBot', options: ['Computer Related💻', 'Other Accesories🖨️', 'Service related'] }]);
                    break;
                case 'Computer Related💻':
                case 'Query for product🖥️':
                case 'Another one':
                case 'Computer Related💻':
                case 'Service related':
                case 'Delivery🚚': setMessages(prev => [...prev, { text: "Enter Your Query", name: 'chatBot', options: [] }]);
                    break;
            }
        }, 1000);
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
        messages.filter(message => message.text === "Enter Your Query").length !== 0 ? setIsInput(true) : setIsInput(false);
    }, [handleNewMessages]);

    const handleQuerySubmit = async (e) => {
        e.preventDefault();
        setIsLoader(true);
        try {
            const res = await axios.post(`${url}/query`, { userId: user._id, name: user.name, query });
            setIsLoader(false);
            setQuerySent(true);
            setQuery('');
            setTimeout(() => {
                setQuerySent(false);
            }, 3000);
        } catch (error) {
            console.error(error);
        }
    }

    const handleRestart = () => {
        
        setMessages([{ name: 'chatbot', text: " I'm here to assist you with any questions, concerns, or issues you might have while navigating our online store.. How can I assist you today?", options: ["📦Product", "👨‍🔧Service"] }])
        setChoosedOptions([])
    }

    return (
        <>
            {!isClicked ? <div ref={chatBotBtnRef} onClick={handleBtn} className='fixed md:bottom-16 md:right-16 bottom-10 right-10 bg-blue-400 border-2 border-blue-500 cursor-pointer hover:scale-110 transition-transform duration-200 p-2 rounded-lg text-white'><BsRobot className='w-8 h-8 md:w-10 md:h-10 pointer-events-none' /></div> :
                <div ref={chatBotRef} className='md:w-[400px] text-xs md:text-base md:h-[400px] w-[300px] h-[300px] fixed scrollBar flex flex-col gap-4 md:bottom-16 md:right-16 bottom-12 right-12 chatBotAnim bg-white shadow-[0_0_10px] md:p-4 p-2 rounded-md shadow-slate-400'>
                    <div className='flex items-center gap-2'>
                        <BsRobot className='bg-slate-100 border border-blue-200 md:h-10 md:w-10 h-8 w-8 p-[0.4rem] text-blue-800 rounded-full' />
                        <h4 className='bg-slate-100 border border-blue-200 text-blue-800 w-fit md:p-2 p-1 px-2 md:px-3 cursor-default md:rounded-xl rounded-lg chatTextAppear'>👋 Hello there! Welcome to our e-commerce website support.</h4>
                    </div>
                    <div className='flex gap-5 flex-col'>
                        {messages.length !== 0 && messages.map((message, index) => {
                            return <div ref={scrollRef} key={index} className={`flex w-full flex-col gap-4 ${message.name === 'user' ? "items-end" : ""}`}>
                                {!isLoader && <><div className={`flex gap-2 ${message.name === 'user' ? "flex-row-reverse" : ""}`}>
                                    {message.name === 'user' ? <FaUserTie className='bg-slate-100 border border-blue-200 md:h-10 md:w-10 h-8 w-8 p-[0.4rem] text-blue-800 rounded-full' /> : <BsRobot className='bg-slate-100 border border-blue-200 md:h-10 md:w-10 h-8 w-8 p-[0.4rem] text-blue-800 rounded-full' />}
                                    <p className='bg-slate-100 flex items-center text-blue-800 border border-blue-200 w-fit md:p-2 md:px-3 p-1 px-2 cursor-pointer md:rounded-xl rounded-lg chatTextAppear'>{message.text}</p>
                                </div>
                                    <div className='flex gap-2 flex-col w-fit'>
                                        {message.options.length !== 0 && message.options.map((option, index) => {
                                            return <span key={index} onClick={() => handleNewMessages(option)} className={`cursor-pointer chatTextAppear md:px-3 border md:p-2 p-1 px-2 ${choosedOptions.find(e => e === option) ? 'bg-blue-400 text-white' : 'text-blue-800 bg-slate-100 border-blue-200'} rounded-lg md:rounded-xl`}>{option}</span>
                                        })}
                                    </div>
                                </>}
                            </div>
                        })}
                    </div>
                    {querySent && <p className='text-slate-700 chatTextAppear text-center'>Your Query has been registered!</p>}
                    {isInput && <form onSubmit={handleQuerySubmit} className='w-full flex gap-2'>
                        <input value={query} onChange={e => setQuery(e.target.value)} className='p-2 px-3 w-full searchAppear rounded-md bg-slate-100 border border-slate-400 focus:outline-blue-500 text-slate-700 placeholder-slate-400' placeholder='Write your query...' />
                        <button type='submit' className='bg-blue-600 hover:bg-blue-700 text-white px-3 flex items-center justify-center rounded-md'>{!isLoader ? <AiOutlineSend className='w-5 h-5' /> : <TailSpin width={20} height={20} />}</button>
                    </form>}
                    <div onClick={handleRestart} className='flex justify-center sticky bottom-0'><button className='bg-red-500 text-white px-3 p-1 rounded'>Restart Chat</button></div>
                </div>
            }
        </>
    )
}

export default ChatBot;