import React, { createContext, useState } from 'react'
import axios from 'axios';

export const UserContext = createContext();

export const UserState = (props) => {
    const [user, setUser] = useState({});
    const [changes, setChanges] = useState(0);
    const url = "http://localhost:5000/api";
    const userId = localStorage.getItem('userId');

    const getUser = async () => {
        const res = await axios.get(`${url}/user/${userId}`);
        setUser(res.data);
    }
    return (
        <UserContext.Provider value={{ user, getUser, setUser, changes, setChanges, userId, url }}>
            {props.children}
        </UserContext.Provider>
    );
}