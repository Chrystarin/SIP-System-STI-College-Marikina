import React, { useState, useContext } from 'react';
import axios from '../Utils/Axios';
import { useAuth } from './../Utils/AuthContext';

interface AuthProps {
    // define your props here
  }
  
const Auth: React.FC<AuthProps> = (props) => {

    const { login, logout } = useAuth();

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });

    const [registerForm, setRegisterForm] = useState({
        employeeId: '',
        role: '',
        firstName: '',
        lastName: '',
        email: ''
    });

    const register = async () => {
        console.log(registerForm)
        try{
            await axios
            .post(`/auth/register`,{
                employeeId : registerForm.employeeId,
                role : registerForm.role,
                name : {
                    first : registerForm.firstName,
                    last : registerForm.lastName
                },
                email : registerForm.email
            })
            .then((response: any) => {
                console.log(response);
                alert(response.data.message);
            });
        }
        catch (error: any){
            console.log(error);
            alert(error.message);
        }
    };

    return (
        <div>
            <div className="login">
                <h1>Login</h1>
                Email: <input type="email" onChange={(e)=>setLoginForm({...loginForm, email:e.target.value})} />
                Password: <input type="password" onChange={(e)=>setLoginForm({...loginForm, password:e.target.value})} />
                <button onClick={()=>login(loginForm.email,loginForm.password)}>Login</button>
            </div>
            <hr/>
            <div className="logout">
                <h1>Logout</h1>
                <button onClick={()=>logout()}>Logout</button>
            </div>
            <hr/>
            <div className="register">
                <h1>Register</h1>
                Employee ID: <input type="text" onChange={(e)=>setRegisterForm({...registerForm, employeeId:e.target.value})} />
                Role: <input type="text" onChange={(e)=>setRegisterForm({...registerForm, role:e.target.value})} />
                First Name: <input type="text" onChange={(e)=>setRegisterForm({...registerForm, firstName:e.target.value})} />
                Last Name: <input type="text" onChange={(e)=>setRegisterForm({...registerForm, lastName:e.target.value})} />
                Email: <input type="email" onChange={(e)=>setRegisterForm({...registerForm, email:e.target.value})} />
                <button onClick={register}>Register</button>
            </div>

        </div>
        
    );
};

export default Auth;