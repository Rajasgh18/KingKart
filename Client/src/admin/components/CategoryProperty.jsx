import React, { useEffect } from 'react';
import NewProperty from './NewProperty';

const CategoryProperty = ({ properties, setProperties }) => {
    const handleNewProperties = (e) => {
        e.preventDefault();
        setProperties(prev => [...prev, {}]);
    }
    return (
        <div className='my-4 flex flex-col'>
            <label htmlFor="categoryProperties" className='text-lg text-slate-600'>Properties</label>
            {properties.length !== 0 && properties.map(p => {
                return <NewProperty key={p?._id} setProperties={setProperties} properties={properties} p={p} />
            })}
            <button onClick={handleNewProperties} className='p-2 w-fit my-2 px-3 border-[2px] border-slate-300 rounded-md text-lg text-slate-600 bg-slate-200'>Add New Property</button>
        </div>
    )
}

export default CategoryProperty