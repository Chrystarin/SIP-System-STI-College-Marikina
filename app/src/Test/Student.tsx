import React, {useState} from 'react';

import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

import axios from './../Utils/Axios';
import { useNavigate } from 'react-router-dom';

interface StudentProps {
    // define your props here
  }
  
  const Student: React.FC<StudentProps> = (props) => {
    const navigate = useNavigate();
    const [studentId, setStudentId] = useState('');
    const [students, setStudents] = useState('');
    const [studentForm, setStudentForm] = useState({
        studentId: '',
        firstName: '',
        lastName: '',
    });
    

    const addStudent = async (e:any) => {
        e.preventDefault();
        try{
            await axios
            .post(`/students`,{
                studentId : studentForm.studentId,
                name : {
                    first : studentForm.firstName,
                    last : studentForm.lastName
                }
            })
            .then((response: any) => {
                alert(response.data.message);
                navigate("/students");
            });
        }
        catch (error: any){
            console.log(error);
            alert(error.response.data.message);
        }
    };

    return (
        <form onSubmit={addStudent}>
            <div className=' ContentLayout1'>
                    <h2 className='ContentLayout1__Title'>Add Student</h2>
                    <TextField 
                        id="outlined-basic" 
                        label="Student ID" 
                        variant="outlined"
                        required
                        fullWidth
                        onChange={(e)=>setStudentForm({...studentForm, studentId:e.target.value})}
                    />
                    <TextField 
                        id="outlined-basic" 
                        label="First Name" 
                        variant="outlined"
                        required
                        fullWidth
                        onChange={(e)=>setStudentForm({...studentForm, firstName:e.target.value})}
                    />
                    <TextField 
                        id="outlined-basic" 
                        label="Last Name" 
                        variant="outlined"
                        required
                        fullWidth
                        onChange={(e)=>setStudentForm({...studentForm, lastName:e.target.value})}
                    />
                    <Button variant='contained' type='submit'>Add Student</Button>
            </div>
        </form>
    );
  };

export default Student;