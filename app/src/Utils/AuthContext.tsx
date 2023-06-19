import React, { createContext, useState, useEffect, useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from './Axios';

interface AuthContextState {
    user: any;
    login: (email: string, password: string) => void;
    logout: () => void;
    isAuth: (id: any) => boolean;
}

export const AuthContext = createContext<AuthContextState>({
    user: null,
    login: () => {},
    logout: () => {},
    isAuth: () => false,
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
            alert(error.response.data.message);
        }
    };

    const logout = async () => {
        await axios.post(`/auth/logout`)
        localStorage.clear();
        navigate("/");
    };

    const isAuth = (id:any) => {
		if (!user) {
			// User is not logged in, so they are not authorized
			return false;
		}

		if (user.employeeId !== id) {
			// User is logged in, but they are not authorized
			return false;
		}

		// User is logged in and authorized
		return true;
	};

    useEffect(() => {
        // Check if user is already logged in on first mount
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}