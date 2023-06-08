import React, { createContext, useState } from 'react'

export const UserContext = createContext();

export const UserState = (props) => {
    const [user, setUser] = useState();
    return (
        <UserContext.Provider value={{}}>
            {props.children}
        </UserContext.Provider>
    );
}