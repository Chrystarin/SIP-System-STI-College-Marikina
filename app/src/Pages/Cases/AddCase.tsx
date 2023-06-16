import React,{useEffect, useState} from 'react';
import './AddCase.scss'

import TextField from '@mui/material/TextField';
import CaseTableView from '../../Components/CaseTableView/CaseTableView';
import SearchInput from '../../Components/SearchInput/SearchInput';
import SIPPreview from '../../Components/SIPPreview/SIPPreview';
import StudentCases from '../../Components/SIPPreview/StudentCases';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button } from '@mui/material';
function AddCase() {
    const [stepper,setStepper] = useState(1);
    const [student, setStudent] = useState("qewq");
    const [addCase, setAddCase] = useState({
        type:"",
        term:"",
        semester:""
    });

    // useEffect(() => {
    //     // Only if theres a selected student will proceed to part 2
    //     if(student!==""){
    //         setStepper(2)
    //     }
    // },[student]);
    return (
        <form className='FormTemplate'>
            <h4 className='Form__Title'>ADD NEW CASE</h4>
            <div className='Form__Stepper'>
                <button className={stepper === 1 || stepper === 1.1? "active":""}>Find Student</button>
                <button className={stepper === 2? "active":""}>Add Case</button>
                <button className={stepper === 3? "active":""}>SIP Form</button>
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
                    <div className='FindStudent__Results'>
                        {/* <CaseTableView/> */}
                    </div>
                </div>
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
                        <FormControl fullWidth sx={{  minWidth: 200 }}>
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
                        <Button variant="contained">Add</Button>
                    </div>
                </div>
                <div className='Button__Container'>
                    <Button variant='text'>Back</Button>
                    <Button variant='contained'>Submit</Button>
                </div>
            </>:""}
            
            
        </form>
    )
}

export default AddCase