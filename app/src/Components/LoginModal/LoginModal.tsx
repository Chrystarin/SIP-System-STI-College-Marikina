import React, { useState } from 'react';
import './LoginModal.scss';

import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

import { useAuth } from './../../Utils/AuthContext';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const { login } = useAuth();

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    async function submit(e:any){
        e.preventDefault();
        login(form.email, form.password)
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                
                <form onSubmit={submit}>
                    <div className="modal-header">
                        <h5>Login</h5>
                        <h6 className="close" onClick={onClose}>✖</h6>
                    </div>
                    
                    <div className="modal-body">
                        <TextField 
                            id="outlined-basic" 
                            label="Email" 
                            variant="standard"
                            type="email"
                            required
                            onChange={(e)=>setForm({...form, email:e.target.value})}
                        />
                        <TextField 
                            id="outlined-basic" 
                            label="Password" 
                            variant="standard"
                            type='password'
                            required
                            onChange={(e)=>setForm({...form, password:e.target.value})}
                        />

                        <Button variant='contained' type='submit'>Login</Button>
                    </div>
                    
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
