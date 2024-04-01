import React from 'react'
import { Outlet } from 'react-router-dom';
import { Login } from '../Login';

const { useEffect } = require("react");
const { useState } = require("react");

const useAuth = () => {
    const [isAuthenticated, setisAuthenticated] = useState(false);
    useEffect(() => {
        if(localStorage.getItem("id") != null) {
            setisAuthenticated(true);
        }
    }, [])
    return isAuthenticated;
};


export const PretectedRoutes = () => {
    const auth = useAuth();
    console.log("auth..." + auth);
    return auth == true ? <Outlet /> : <Login />
};