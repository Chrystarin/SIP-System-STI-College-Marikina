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

    const viewStudents = async () => {
        try{
            await axios
            .get(`/students`, {
                params:{
                    studentId : !studentId ? null : studentId
                }
            })
            .then((response: any) => {
                console.log(response.data);
                setStudents(response.data)
            });
        }
        catch (error: any){
            console.log(error);
            alert(error.message);
        }
    }

    return (
        <div>
            <div>
                <h1>Add Student</h1>
                Student Id: <input type="text" onChange={(e)=>setStudentForm({...studentForm, studentId:e.target.value})}/>
                First Name: <input type="text" onChange={(e)=>setStudentForm({...studentForm, firstName:e.target.value})}/>
                Last Name: <input type="text" onChange={(e)=>setStudentForm({...studentForm, lastName:e.target.value})}/>
                <button onClick={addStudent}>Add Student</button>
            </div>
            <div>
                <h1>View Students</h1>
                Student Id: <input type="text" onChange={(e)=>setStudentId(e.target.value)}/>
                <button onClick={viewStudents}>Search</button>

                {Array.isArray(students) && students.length > 0 && students.map((student: any) => {
                    return (
                        <div style={{ border: '1px solid' }} key={student.id}>
                            <p>Student ID: {student.studentId}</p>
                            <p>Name: {student.name.first} {student.name.last}</p>
                        </div>
                    );
                })}

            </div>
        </div>
    );
  };

export default Student;