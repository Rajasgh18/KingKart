import React, { useEffect, useRef, useState } from 'react';
import { BsRobot } from 'react-icons/bs';

const ChatBot = () => {
    const chatBotRef = useRef();
    const chatBotBtnRef = useRef();
    const [isClicked, setIsClicked] = useState(false);
    const [messages, setMessages] = useState([{ text: "Hello, what help would you like!", options: ["hello", "world"] }]);
    const [userOptions, setUserOptions] = useState([]);

    const handleBtn = () => {
        setIsClicked(true);
    }

    const handleClickOutside = (e) => {
        if (chatBotRef.current && !chatBotRef.current.contains(e.target)) {
            chatBotRef.current.style.animation = 'chatDisappear 0.3s ease-in-out';
            setTimeout(() => {
                setIsClicked(false);
            }, 250);
        } else {
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
        setUserOptions(prev => [...prev, e]);
        setMessages(prev => [...prev, {text:"welcom", options: ["hello", "nothing"]}])
    }

    return (
        <>
            {!isClicked ? <div ref={chatBotBtnRef} onClick={handleBtn} className='fixed bottom-16 right-16 bg-blue-400 border-2 border-blue-500 cursor-pointer hover:scale-110 transition-transform duration-200 p-2 rounded-lg text-white'><BsRobot className='w-10 h-10 pointer-events-none' /></div> :
                <div ref={chatBotRef} className='w-[30%] h-[60%] fixed scrollBar flex flex-col gap-4 bottom-16 right-16 chatBotAnim bg-white shadow-[0_0_10px] p-4 rounded-md shadow-slate-400'>
                    <div className='flex items-center gap-2'>
                        <BsRobot className='bg-slate-100 border border-blue-200 h-10 w-10 p-[0.4rem] text-blue-800 rounded-full' />
                        <h4 className='bg-slate-100 border border-blue-200 text-blue-800 w-fit p-2 px-3 cursor-default rounded-xl chatTextAppear'>Welcome to help & support</h4>
                    </div>
                    <div className='flex gap-4 flex-col'>
                        {messages.length !== 0 && messages.map((message, index) => {
                            return <div key={index} className='flex w-full flex-col gap-2'>
                                <div className='flex gap-2'>
                                    <BsRobot className='bg-slate-100 border border-blue-200 h-10 w-10 p-[0.4rem] text-blue-800 rounded-full' />
                                    <p className='bg-slate-100 text-blue-800 border border-blue-200 w-fit p-2 px-3 cursor-pointer rounded-xl chatTextAppear'>{message.text}</p>
                                </div>
                                <div className='flex gap-2 flex-shrink-0 w-full'>
                                    {message.options.length !== 0 && message.options.map((option, index) => {
                                        return <span key={index} onClick={()=> handleNewMessages(option)} className={`bg-slate-100 cursor-pointer text-blue-800 px-3 border border-blue-200 p-2 rounded-xl`}>{option}</span>
                                    })}
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            }
        </>
    )
}

export default ChatBot;