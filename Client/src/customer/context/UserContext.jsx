import React, { createContext, useState } from 'react'
import axios from 'axios';

export const UserContext = createContext();

export const UserState = (props) => {
    const [user, setUser] = useState();
    const url = "http://localhost:5000/api";

    const getUser = async()=>{
        const res = await axios.post(`${url}/user/login`, {username: "rajasgh18@gmail.com", password: "12345"});
        setUser(res.data.user);
    }
    return (
        <UserContext.Provider value={{user, getUser, setUser}}>
            {props.children}
        </UserContext.Provider>
    );
}