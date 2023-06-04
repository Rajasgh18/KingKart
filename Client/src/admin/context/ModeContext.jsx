import CreateContext from "./createContext";

import React, { useState } from 'react'

const ModeContext = (props) => {
    const [mode, setMode] = useState('light');
    const [show, setShow] = useState(false);
    return (
        <CreateContext.Provider value={{mode, setMode, show, setShow}}>
            {props.children}
        </CreateContext.Provider>
    );
}

export default ModeContext