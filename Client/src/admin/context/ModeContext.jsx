import CreateContext from "./createContext";

import React, { useState } from 'react'

const ModeContext = (props) => {
    const [mode, setMode] = useState(null);
    const [show, setShow] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const url = import.meta.env.VITE_URL || 'https://king-kart-server.vercel.app/api'
    return (
        <CreateContext.Provider value={{mode, setMode,isDeleted, setIsDeleted, show, setShow, url}}>
            {props.children}
        </CreateContext.Provider>
    );
}

export default ModeContext