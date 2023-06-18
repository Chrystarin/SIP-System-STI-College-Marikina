import React, {useState} from 'react';

import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

import axios from './../../Utils/Axios';

interface StudentProps {
    // define your props here
  }
  
  const AddStudent: React.FC<StudentProps> = (props) => {

    const [studentForm, setStudentForm] = useState({
        studentId: '',
        firstName: '',
        lastName: '',
    });
    

    const addStudent = async () => {
        console.log(studentForm)
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

export default AddStudent;