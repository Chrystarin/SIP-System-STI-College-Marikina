import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
    allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {

    //Gets locally stored user
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : '';

    return(
        // Checks if user exists, if yes proceeds to page, if not proceeds to login
        user
            ? allowedRoles 
                ? allowedRoles?.includes(user.role)
                    ? <Outlet/>
                    : <Navigate to="/unauthorized"/>
                : <Outlet/>   
            : <Navigate to="/"/>
    );
}

export default ProtectedRoute;