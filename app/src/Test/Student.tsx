import React, {useState} from 'react';
import axios from './../Utils/Axios';

interface StudentProps {
    // define your props here
  }
  
  const Student: React.FC<StudentProps> = (props) => {
    const [studentId, setStudentId] = useState('');
    const [students, setStudents] = useState('');
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
        <div>
            <div>
                <h1>Add Student</h1>
                Student Id: <input type="text" onChange={(e)=>setStudentForm({...studentForm, studentId:e.target.value})}/>
                First Name: <input type="text" onChange={(e)=>setStudentForm({...studentForm, firstName:e.target.value})}/>
                Last Name: <input type="text" onChange={(e)=>setStudentForm({...studentForm, lastName:e.target.value})}/>
                <button onClick={addStudent}>Add Student</button>
            </div>
        </div>
    );
  };

export default Student;