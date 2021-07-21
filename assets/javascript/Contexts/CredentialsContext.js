import React, {createContext, useState, useEffect} from 'react';
import {login as flogin} from './Actions/security';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';

export const CredentialsContext = createContext();

export default function CredentialsProvider({children}) {
    const [token, setToken] = useState();
    const [profil, setProfil] = useState();

    useEffect(() => {
        const token = localStorage.getItem('jwt_token');
        setToken(token);
        setProfil(token && jwtDecode(token));
    }, []);

    const login = function (username, password) {
        flogin(username, password).then(data => {
            if(data.token !== undefined){
                localStorage.setItem('jwt_token',data.token);
                setToken(data.token);
                setProfil(jwtDecode(data.token));
                toast.success(`👍 Vous êtes désormais connecté !`);
            }else{
                toast.error(`🚫 ${data.message}`);
            }
        });
    };

    const logout = function () {
        localStorage.removeItem('jwt_token');
        setToken(null);
        toast.success(`👍 Vous êtes désormais déconnecté !`);
    };

    return (
        <CredentialsContext.Provider value={{token, profil, login, logout}}>
            {children}
        </CredentialsContext.Provider>
    );
}
