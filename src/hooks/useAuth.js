import { useState } from 'react';
import axios from 'axios';

export const useAuth = () => {
    const [userSession, setUserSession] = useState(null);

    const isLoggedIn = () => {
        return userSession && !Date.now() - userSession.expiresAt < 0;
    };

    const login = (credentials) => {
        axios
            .post('/api/v1/users/login', credentials)
            .then((response) => {
                setUserSession(response.data.token);
                localStorage.setItem('token', response.data.token); // Store token in localStorage
            })
            .catch((error) => {
                console.error('Login error:', error);
            });
    };

    const logout = () => {
        setUserSession(null);
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    return { isLoggedIn, login, logout };
};
