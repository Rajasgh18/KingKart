import CreateContext from "./createContext";

import React, { useState } from 'react'

const ModeContext = (props) => {
    const [mode, setMode] = useState('light');
    const [show, setShow] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const url = 'http://localhost:5000/api'
    return (
        <CreateContext.Provider value={{mode, setMode,isDeleted, setIsDeleted, show, setShow, url}}>
            {props.children}
        </CreateContext.Provider>
    );
}

export default ModeContext