import React, { useEffect, useRef } from 'react';

const DialogBox = ({ setIsDialog, text }) => {
    const dialogRef = useRef(null);
    const onClose = () => {
        dialogRef.current.style.animation = 'dropHide 0.3s ease-in-out';
        setTimeout(() => {
            setIsDialog(false);
        }, 250);
    }

    useEffect(() => {
        setTimeout(() => {
            onClose();
        }, 3000);
    }, [])

    return (
        <div className='fixed top-16 left-0 z-10 w-screen min-h-screen flex justify-center'>
            <div ref={dialogRef} className='dropDownShow bg-white shadow-[0_0_12px] shadow-slate-400 gap-4 h-fit flex items-center justify-center rounded-lg p-4 px-6'>
                <h1 className='text-xl text-slate-700'>{text}</h1>
            </div>
        </div>
    )
}
export default DialogBox