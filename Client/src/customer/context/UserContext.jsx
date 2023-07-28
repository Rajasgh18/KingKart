import React, { createContext, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserState = (props) => {
    const [user, setUser] = useState({});
    const [changes, setChanges] = useState(0);
    const url = import.meta.env.VITE_URL || 'https://king-kart-server.vercel.app/api';
    const userId = localStorage.getItem('userId');
    const Navigate = useNavigate();
    const [selectedProducts, setSelectedProducts] = useState([]);

    const getUser = async () => {
        if (userId) {
            const res = await axios.get(`${url}/user/${userId}`);
            setUser(res.data);
        }
    }
    return (
        <UserContext.Provider value={{ user, getUser, setUser, changes, setChanges, userId, url, Navigate, selectedProducts, setSelectedProducts }}>
            {props.children}
        </UserContext.Provider>
    );
}