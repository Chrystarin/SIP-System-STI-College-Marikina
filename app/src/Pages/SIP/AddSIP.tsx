import React,{useEffect, useState} from 'react';
import './AddCase.scss'
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import CaseTableView from '../../Components/TableView/CaseTableView';
import SearchInput from '../../Components/SearchInput/SearchInput';
import SIPPreview from '../../Components/SIPPreview/SIPPreview';
import StudentCases from '../../Components/SIPPreview/StudentCases';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SIPForm from '../../Components/SIPPreview/SIPForm';
import { Button } from '@mui/material';
import StudentTableView from '../../Components/TableView/StudentTableView';
import AddStudent from '../../Components/AddStudent/AddStudent';
import axios from '../../Utils/Axios';

function AddCase() {
    const navigate = useNavigate();
    const [stepper,setStepper] = useState<any>(1);
    const [student, setStudent] = useState<any>();
    const [students, setStudents] = useState([]);
    const [sip, setSip] = useState<any>();
    const [form, setForm] = useState({
        studentId: '',
        sipCase: '',
        term: ''
    })

    const [addCase, setAddCase] = useState({
        type:"",
        term:"",
        semester:""
    });

    const fetchStudents = async () => {
        try{
            await axios
            .get(`/students`)
            .then((response: any) => {
                console.log(response.data);
                setStudents(response.data);
                
            });
        }
        catch (error: any){
            console.log(error);
            alert(error.message);
        }
    }

    const fetchStudent = async (id:any) => {
        try{
            await axios
            .get(`/students`, {
                params:{
                    studentId : id
                }
            })
            .then((response: any) => {
                console.log(response.data[0])
                setStudent(response.data[0])
                setStepper(2);
            });
        }
        catch (error: any){
            console.log(error);
            alert(error.message);
        }
    }

    const fetchSip = async (id:any) => {
        try{
            await axios
            .get(`/sips`, {
                params:{
                    studentId: id, 
                    status: 'pending'
                }
            })
            .then((response: any) => {
                console.log(response.data);
                setSip(response.data);
            });
        }
        catch (error: any){
            console.log(error);
            alert(error.message);
        }
    };

    async function SubmitCase(e:any){
        try{
            await axios
            .post(`/sips`, {
                studentId: form.studentId,
                sipCase: form.sipCase,
                term: form.term
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

    useEffect(() => {
        fetchStudents();
    }, [])

    if (!students) return <div>Loading...</div>

    return (
        <form className='FormTemplate'>
            <h4 className='Form__Title'>ADD NEW CASE</h4>
            <div className='Form__Stepper'>
                <button className={stepper === 1 || stepper === 1.1? "active":""}>Find Student</button>
                <button className={stepper === 2? "active":""}>Add Case</button>
            </div>

            {stepper===1?<>
                <div className='Form__Section'>
                    <h6 className='Section__Title'>Find Student</h6>
                    <div className='FindStudent'>
                        <SearchInput/>
                        <div className='FindStudentFooter'>
                            <p>Can't find? </p> <h6 onClick={()=> setStepper(1.1)}>Add new Student.</h6>
                        </div>
                    </div>
                    {/* <div className='FindStudent__Results'>
                        <CaseTableView students={students}/>
                    </div> */}

                    {/* <div className='FindStudent__Results'>
                        {Array.isArray(students) && students.length > 0 && students.map((student: any) => {
                            return (
                                <div
                                    style={{border: '1px solid', cursor: 'pointer', margin: '5px', padding: '5px'}}
                                    key={student.studentId}
                                    onClick={() => {fetchStudent(student.studentId)}}
                                >
                                    <p>{student.studentId}</p>
                                    <p>{student.name.first} {student.name.last}</p>
                                </div>
                            );
                        })}
                    </div> */}
                    <div className='FindStudent__Results'>
                        <StudentTableView students={students} fetchStudent={fetchStudent}/>
                    </div>
                </div>
            </>:""}
            {stepper===1.1?<>
                <div className='Form__Section'>
                    <h6 className='Section__Title'>Find Student</h6>
                    <AddStudent setStepper={setStepper}/>
                </div>
                {/* <div className='FindStudent'>
                    <div className='FindStudentFooter'>
                        <p>Student already exists? </p> <h6 onClick={()=> setStepper(1)}>Find student here.</h6>
                    </div>
                </div> */}
                {/* <AddStudent setStepper={setStepper} fetchStudent={fetchStudent}/> */}
                {/* <AddStudent/> */}
            </>:""}
            {stepper===2?<>
                <div className='Form__Section '>
                    <h6 className='Section__Title'>STUDENT INTERVENTION FORM</h6>
                    {/* <SIPPreview/> */}
                </div>
                <div className='Form__Section '>
                    <h6 className='Section__Title'>STUDENT CASES</h6>
                    <p className='Form__SubTitle'>2 Active Cases</p>
                    {/* <StudentCases/> */}
                    <div className='AddCase'>
                        {/* <FormControl fullWidth sx={{  minWidth: 200 }}>
                            <InputLabel id="demo-simple-select-label">Case Type</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={addCase.type}
                            label="Case Type"
                            onChange={(event: SelectChangeEvent) => {
                                setAddCase({
                                    ...addCase, 
                                    type: event.target.value as string, 
                                });
                            }}
                            >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{  minWidth: 200 }}>
                            <InputLabel id="demo-simple-select-label">Term</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={addCase.term}
                            label="Term"
                            onChange={(event: SelectChangeEvent) => {
                                setAddCase({
                                    ...addCase, 
                                    term: event.target.value as string, 
                                });
                            }}
                            >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{  minWidth: 200 }}>
                            <InputLabel id="demo-simple-select-label">Semester</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={addCase.semester}
                            label="Semester"
                            onChange={(event: SelectChangeEvent) => {
                                setAddCase({
                                    ...addCase, 
                                    semester: event.target.value as string, 
                                });
                            }}
                            >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="contained">Add</Button> */}
                        
                        <form onSubmit={SubmitCase}>
                            <div className=' ContentLayout1'>
                            <p>{JSON.stringify(student)}</p>
                            <h2 className='ContentLayout1__Title'>Add Case</h2>
                            <TextField 
                                id="outlined-basic" 
                                label="Student ID" 
                                variant="outlined"
                                required
                                value={student?.studentId}
                                fullWidth
                                disabled
                            />
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Case</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={form.sipCase}
                                    label="Case"
                                    required
                                    onChange={(e)=>setForm({...form, sipCase: e.target.value})}
                                >
                                    <MenuItem value={'Excessive Tardiness/Absences'}>Excessive Tardiness/Absences</MenuItem>
                                    <MenuItem value={'Declining Class Performance'}>Declining Class Performance</MenuItem>
                                    <MenuItem value={'Unbecoming of an STIer'}>Unbecoming of an STIer</MenuItem>
                                    <MenuItem value={'Assessment/Exam Concern'}>Assessment/Exam Concern</MenuItem>
                                    <MenuItem value={'Learning Difficulty'}>Learning Difficulty'</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Term</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={form.term}
                                    label="Term"
                                    required
                                    onChange={(e)=>setForm({...form, term: e.target.value})}
                                >
                                    <MenuItem value={'Senior High School - Quarter 1'}>Senior High School - Quarter 1</MenuItem>
                                    <MenuItem value={'Senior High School - Quarter 2'}>Senior High School - Quarter 2</MenuItem>
                                    <MenuItem value={'Senior High School - Quarter 3'}>Senior High School - Quarter 3</MenuItem>
                                    <MenuItem value={'Senior High School - Quarter 4'}>Senior High School - Quarter 4</MenuItem>
                                    <MenuItem value={'Tertiary - Semester 1 - Prelims'}>Tertiary - Semester 1 - Prelims</MenuItem>
                                    <MenuItem value={'Tertiary - Semester 1 - Midterms'}>Tertiary - Semester 1 - Midterms</MenuItem>
                                    <MenuItem value={'Tertiary - Semester 1 - Pre-Finals'}>Tertiary - Semester 1 - Pre-Finals</MenuItem>
                                    <MenuItem value={'Tertiary - Semester 1 - Finals'}>Tertiary - Semester 1 - Finals</MenuItem>
                                    <MenuItem value={'Tertiary - Semester 2 - Prelims'}>Tertiary - Semester 2 - Prelims</MenuItem>
                                    <MenuItem value={'Tertiary - Semester 2 - Midterms'}>Tertiary - Semester 2 - Midterms</MenuItem>
                                    <MenuItem value={'Tertiary - Semester 2 - Pre-Finals'}>Tertiary - Semester 2 - Pre-Finals</MenuItem>
                                    <MenuItem value={'Tertiary - Semester 2 - Finals'}>Tertiary - Semester 2 - Finals</MenuItem>
                                    <MenuItem value={'Tertiary - Summer'}>Tertiary - Summer</MenuItem>
                                </Select>
                            </FormControl>
                                <Button variant='contained' type='submit'>Submit</Button>
                                {/* <button onClick={()=>addCase()}>Add Case</button> */}
                            </div>
                        </form>
                    </div>
                </div>
                <div className='Button__Container'>
                    <Button variant='text'>Back</Button>
                    <Button variant='contained' onClick={()=> {fetchSip(student.studentId);setStepper(3)}}>Submit</Button>
                </div>
            </>:""}
            
        </form>
    )
}

export default AddCase  