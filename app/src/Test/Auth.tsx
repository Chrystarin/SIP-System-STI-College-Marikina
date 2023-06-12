import React, { useState } from 'react';
import axios from '../Utils/Axios';

interface AuthProps {
    // define your props here
  }
  
  const Auth: React.FC<AuthProps> = (props) => {
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

    const login = async () => {
        console.log(loginForm)
        try{
            await axios
            .post(`/auth/login`,{
                "email" : loginForm.email,
                "password" : loginForm.password
            })
            .then((response: any) => {
                console.log(response.data.message);
                alert(response.data.message);
            });
        }
        catch (error: any){
            console.log(error.message);
            alert(error.message);
        }
    };

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
                <button onClick={login}>Login</button>
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