import React, {useState} from 'react';

import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

import axios from './../../Utils/Axios';

interface StudentProps {
    setStepper: (stepper: number) => void;
}
  
function AddStudent(props:StudentProps){

const [studentForm, setStudentForm] = useState({
    studentId: '',
    firstName: '',
    middleName: '',
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
                middle : studentForm.middleName,
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
        alert(error.response.data.message);
    }
};

return (
    <form onSubmit={addStudent}>
        <div className='wrapperForm_3'>
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
                    label="Middle Name" 
                    variant="outlined"
                    fullWidth
                    onChange={(e)=>setStudentForm({...studentForm, middleName:e.target.value})}
                />
                <TextField 
                    id="outlined-basic" 
                    label="Last Name" 
                    variant="outlined"
                    required
                    fullWidth
                    onChange={(e)=>setStudentForm({...studentForm, lastName:e.target.value})}
                />
        </div>
        <div className='Button__Container'>
            <Button variant='text' onClick={()=>props.setStepper(1)}>Cancel</Button>
            <Button variant='contained' type='submit'>Add Student</Button>
        </div>
    </form>
);
};

export default AddStudent;