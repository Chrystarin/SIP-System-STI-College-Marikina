import React, { createContext, useState, useEffect, useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from './Axios';

interface AuthContextState {
    user: any;
    login: (email: string, password: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextState>({
    user: null,
    login: () => {},
    logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState<any>(null);

    const login = async (email: string, password: string) => {
        try{
            await axios
            .post(`/auth/login`,{
                "email" : email,
                "password" : password
            })
            .then((response: any) => {
                setUser(response.data.user);
                localStorage.setItem('user', JSON.stringify(response.data.user))
                navigate("/profile")
            });
        }
        catch (error: any){
            console.log(error);
            alert(error.message);
        }
    };

    const logout = async () => {
        await axios.post(`/auth/logout`)
        localStorage.clear();
        navigate("/");
    };

    useEffect(() => {
        // Check if user is already logged in on first mount
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}