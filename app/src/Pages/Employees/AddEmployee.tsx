import React, {useState,useEffect} from 'react'
import { Form, useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Avatar from '@mui/material/Avatar';
import axios from './../../Utils/Axios';

function AddEmployee() { 
    const navigate = useNavigate();
    const [stepper,setStepper] = useState(1);
    const [summaryData,setSummaryData] = useState<any>();
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
                // console.log(response.data.user)
                // console.log(typeof response.data.user)
                setSummaryData(response.data.user);
                setStepper(2)
                // navigate("/employees");
            });
        }
        catch (error: any){
            console.log(error);
            alert(error.response.data.message);
        }
    };
    useEffect(() => {
        console.log(summaryData)
    }, [summaryData]);
    return <>
        <div className='FormTemplate'>
            <h4 className='Form__Title'>CREATE NEW EMPLOYEE</h4>
            <div className='Form__Stepper'>
                <button className={stepper===1?"active":""}>Details</button>
                <button className={stepper===2?"active":""}>Summary</button>
            </div>

            {stepper === 1?
                <form  onSubmit={register}>
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
            :""}
        {stepper === 2?<>
            <div className='Form__Section'>
                <h6 className='Section__Title'>Account Summary</h6>
                <div className='profileInfo paper'>
                    <Avatar />
                    <div>
                        <h6>{summaryData.name.first} {summaryData.name.middle} {summaryData.name.last}</h6>
                        <ul>
                            <li>
                                <p>ID:</p>
                                <p>{summaryData.employeeId}</p>
                            </li>
                            <li>
                                <p>Role:</p>
                                <p>{summaryData.employeeId}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div  className='Form__Section AccountCredentials'>
                <h6 className='Section__Title'>Account Login Credential</h6>
                <div >
                    <p>Email:</p>
                    <p>{summaryData.credentials.email}</p>
                </div>
                <div>
                    <p>Password:</p>
                    <p>{summaryData.credentials.password}</p>
                </div>
            </div>
            <div className='Button__Container'>
                <Button variant='contained' onClick={()=>navigate('/employees')}>Done</Button>
            </div>
        </>:""}
        </div>
        
    
    </>
}

export default AddEmployee