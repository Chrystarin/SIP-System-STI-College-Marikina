import React, {useState} from 'react'
import { Form, useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import axios from './../../Utils/Axios';

function AddEmployee() { 
    const navigate = useNavigate();
    const [registerForm, setRegisterForm] = useState({
        employeeId: '',
        firstName: '',
        middleName: '',
        lastName: '',
        role: '',
        email: ''
    });

    async function register(e:any){
        e.preventDefault();
        console.log(registerForm)
        try{
            await axios
            .post(`/auth/register`,{
                employeeId : registerForm.employeeId,
                role : registerForm.role,
                name : {
                    first : registerForm.firstName,
                    middle : registerForm.middleName,
                    last : registerForm.lastName
                },
                email : registerForm.email
            })
            .then((response: any) => {
                console.log(response.data.user);
                alert(JSON.stringify(response.data.user.credentials));
                navigate("/employees");
            });
        }
        catch (error: any){
            console.log(error);
            alert(error.response.data.message);
        }
    };

    return (
        <form className='FormTemplate' onSubmit={register}>
            <h4 className='Form__Title'>CREATE NEW EMPLOYEE</h4>
            <div className='Form__Stepper'>
                <button>Details</button>
                <button>Summary</button>
            </div>
            <div className='Form__Section'>
                <h6 className='Section__Title'>Section Title</h6>
                <div className='Form_Questions wrapperForm_3'>
                    <TextField 
                        id="outlined-basic" 
                        label="First Name" 
                        variant="outlined"
                        required
                        onChange={(e)=>setRegisterForm({...registerForm, firstName:e.target.value})}
                    />
                    <TextField 
                        id="outlined-basic" 
                        label="Middle Name" 
                        variant="outlined"
                        onChange={(e)=>setRegisterForm({...registerForm, middleName:e.target.value})}
                    />
                    <TextField 
                        id="outlined-basic" 
                        label="Last Name" 
                        variant="outlined"
                        required
                        onChange={(e)=>setRegisterForm({...registerForm, lastName:e.target.value})}
                    />
                </div>
                <div className='Form_Questions wrapperForm_3'>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={registerForm.role}
                        label="Role"
                        required
                        onChange={(e)=>setRegisterForm({...registerForm, role: e.target.value})}
                    >
                        <MenuItem value={'moderator'}>Moderator</MenuItem>
                        <MenuItem value={'teacher'}>Teacher</MenuItem>
                    </Select>
                </FormControl>
                    <TextField 
                        id="outlined-basic" 
                        label="ID No." 
                        variant="outlined" 
                        type='text'
                        required
                        onChange={(e)=>setRegisterForm({...registerForm, employeeId:e.target.value})}
                    />
                    <TextField 
                        id="outlined-basic" 
                        label="Email" 
                        variant="outlined" 
                        type='email' 
                        required
                        onChange={(e)=>setRegisterForm({...registerForm, email:e.target.value})}
                    />
                </div>
            </div>
            <div className='Button__Container'>
                <Button variant='text'>cancel</Button>
                <Button variant='contained' type='submit'>Submit</Button>
            </div>
        </form>
    )
}

export default AddEmployee