import CreateContext from "./createContext";

import React, { useState } from 'react'

const ModeContext = (props) => {
    const [mode, setMode] = useState('light');
    return (
        <CreateContext.Provider value={{mode, setMode}}>
            {props.children}
        </CreateContext.Provider>
    );
}

export default ModeContext