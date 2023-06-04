import React, { useEffect, useState } from 'react'

const NewProperty = ({ p, properties, setProperties }) => {
    const [props, setProps] = useState(p);
    const handleChange = (e) => {
        setProps({ ...props, [e.target.name]: e.target.value });
        e.target.name === "propValue" ? p[e.target.name] = e.target.value.split(',') : p[e.target.name] = e.target.value;
    }
    const handleDelete = (e) => {
        e.preventDefault();
        let index;
        for (let i = 0; i < properties.length; i++) {
            if (properties[i].propName === props.propName)
                index = i;
        }
        properties.splice(index);
        console.log(properties)
        setProperties(prev => [...prev]);
    }
    useEffect(()=>{
        setProps(p)
    }, [properties])
    return (
        <div className='flex gap-2 items-center my-2'>
            <input onChange={handleChange} className='inputSecondary text-slate-600 w-1/2' type="text" name="propName" id="" value={props.propName} />
            <input onChange={handleChange} className='inputSecondary text-slate-600 w-full' type="text" name="propValue" id="" value={props.propValue} />
            <button onClick={handleDelete} className='p-2 text-lg px-4 rounded-md text-white bg-red-500'>Remove</button>
        </div>
    )
}

export default NewProperty