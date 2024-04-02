import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState(Cookies.get('token') || '');

    const login = (tokenValue) => {
        setToken(tokenValue);
        Cookies.set('token', tokenValue, { expires: 1 }); // Expires in 1 day
        navigate('/home');
    };

    const logout = () => {
        setToken('');
        Cookies.remove('token');
        navigate('/admin');
    };

    const getToken = () => {
        return token;
    };

    const isValidToken = () => {
        return token !== null && typeof token === 'string' && token.trim() !== '';
    };


    return (
        <AuthContext.Provider value={{ login, logout, getToken, isValidToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
