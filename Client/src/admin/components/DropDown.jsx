import React, { useEffect, useRef, useState } from 'react';
import { BsChevronDown } from "react-icons/bs";
const DropDown = ({ name, p, properties, setFormDetails, formDetails, choosedCategories, setChoosedCategory, setProperties, setCategoryDetails, categoryDetails, category, dropInputCss, noSelectionText }) => {

    const [dropDownActive, setDropDownActive] = useState(false);
    const [dropDownValue, setDropDownValue] = useState("No Selection");
    const dropDownRef = useRef(null);
    const dropDownBoxRef = useRef(null);
    const dropDownArrowRef = useRef(null);
    const handleDropDown = (e) => {
        e.preventDefault();
        if (dropDownActive) {
            setDropDownActive(false)
            dropDownArrowRef.current.style.transform = "rotate(0Deg)";
        }
        else {
            setDropDownActive(true);
            dropDownArrowRef.current.style.transform = "rotate(180Deg)";
        }
    }
    
    const handleOptions = (e) => {
        e.preventDefault();
        
        setDropDownValue(e.target.value);
        name === "choose" && setProperties(prev => {
            const newProp = { ...prev };
            newProp[p.propName] = e.target.value;
            return newProp;
        });
        name === "product" && setChoosedCategory(e.target.value);
        name === "product" && setProperties({});
        name === "product" && setFormDetails({ ...formDetails, "category": e.target.id });
        name === "category" && setCategoryDetails({ ...categoryDetails, [e.target.name]: e.target.id });
        if (e.target === e.currentTarget) setDropDownActive(false);
    }
    
    properties && useEffect(() => {
        setDropDownValue(properties[p.propName] || "No Selection")
    }, [p.propName]);
    choosedCategories && useEffect(() => {
        setDropDownValue(choosedCategories || "No Category")
    }, [choosedCategories]);
    
    useEffect(()=>{
        categoryDetails && setDropDownValue(categoryDetails?.parentCategory?.categoryName || dropDownValue)
    }, [categoryDetails]);
    
    const handleClickOutside = (event) => {
        if (dropDownActive && dropDownRef.current && !dropDownRef.current.contains(event.target)) {
            dropDownBoxRef.current.style.animation = 'dropHide 0.3s ease-in-out';
            dropDownArrowRef.current.style.transform = "rotate(0Deg)";
            setTimeout(() => {
                setDropDownActive(false)
            }, 250);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [dropDownActive]);

    return (
        <>
            <div ref={dropDownRef} className={`${dropInputCss} relative`}>
                <button onClick={handleDropDown} className='border text-lg gap-2 p-2 my-2 bg-slate-100 border-slate-400 focus:outline-blue-500 rounded-md flex w-full justify-between items-center h-12 text-slate-700'>
                    {dropDownValue}
                    <div ref={dropDownArrowRef} className='transition-transform duration-50'><BsChevronDown /></div>
                </button>
                {dropDownActive && <div ref={dropDownBoxRef} id='dropDownMenu' className={`z-10 dropDownShow absolute w-full border mb-6 bg-slate-100 py-1 border-slate-400 focus:outline-blue-500 rounded-md flex-col flex text-slate-700`}>
                    <button name='parentCategory' onClick={handleOptions} className='py-1 text-left px-3 hover:bg-blue-500 hover:text-white transition-all duration-200' value={noSelectionText}>{noSelectionText}</button>
                    {category.length !== 0 && category.map((c, index) => {
                        return <button key={index} name='parentCategory' onClick={handleOptions} className='py-1 text-left px-3 hover:bg-blue-500 hover:text-white transition-all duration-200' id={c._id} value={c?.categoryName || c}>{c?.categoryName || c}</button>
                    })}
                </div>}
            </div>
        </>
    )
}

export default DropDown;