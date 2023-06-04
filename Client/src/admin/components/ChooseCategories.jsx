import React, { useEffect, useState } from 'react';
import DropDown from './DropDown';

const ChooseCategories = ({ propertiesToFill, name, properties, setProperties }) => {
    useEffect(()=>{
    }, [properties])
    return (
        <div className='flex gap-10 flex-wrap my-4'>
            {propertiesToFill && propertiesToFill?.map(p => {
                return <div className='flex items-center gap-4'>
                    <span className='p-2 text-lg px-4 h-fit bg-blue-400 text-white rounded-md'>{p.propName}</span>
                    <DropDown p={p} properties={properties} name="choose" setProperties={setProperties} noSelectionText="No selection" category={p.propValue} dropDownCss="w-[9.7%]" />
                </div>
            })}
        </div>
    );
}

export default ChooseCategories;