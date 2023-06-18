import React, {useState} from 'react';

import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import axios from './../Utils/Axios';

interface SIPProps {
// define your props here
}
  
const SIP: React.FC<SIPProps> = (props) => {

    const [sips, setSips] = useState('')

    const [form, setForm] = useState({
        studentId: '',
        sipCase: '',
        term: ''
    })

    const [sipForm, setSipForm] = useState({
        sipId: '', 
        studentId: '', 
        status: '', 
        schoolYearStart: '', 
        schoolYearEnd: ''
    })

    const [statusForm, setStatusForm] = useState({
        sipId: '', 
        status: ''
    })

    async function addCase(e:any){
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

    const viewSIP = async () => {
        try{
            await axios
            .get(`/sips`, {
                params:{
                    sipId: sipForm.sipId, 
                    studentId: sipForm.studentId, 
                    status: sipForm.status, 
                    schoolYearStart: sipForm.schoolYearStart, 
                    schoolYearEnd: sipForm.schoolYearEnd
                }
            })
            .then((response: any) => {
                console.log(response);
                console.log(response.data[0].cases.LD.length>0 ? "true" : "False")
                setSips(response.data)
            });
        }
        catch (error: any){
            console.log(error);
            alert(error.message);
        }
    };

    const changeStatus = async () => {
        try{
            await axios
            .patch(`/sips`, {
                sipId: statusForm.sipId,
                status: statusForm.status
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
        <div className=' ContentLayout1'>
            <form onSubmit={addCase}>
                <div className=' ContentLayout1'>
                <h2 className='ContentLayout1__Title'>Add Case</h2>
                <TextField 
                    id="outlined-basic" 
                    label="Student ID" 
                    variant="outlined"
                    required
                    fullWidth
                    onChange={(e)=>setForm({...form, studentId:e.target.value})}
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
            <hr/>
            <div>
                <h2 className='ContentLayout1__Title'>View SIP</h2>
                sipId: <input type="text" onChange={(e)=>setSipForm({...sipForm, sipId: e.target.value})} />
                studentId: <input type="text" onChange={(e)=>setSipForm({...sipForm, studentId: e.target.value})} />
                status: <input type="text" onChange={(e)=>setSipForm({...sipForm, status: e.target.value})} />
                schoolYearStart: <input type="text" onChange={(e)=>setSipForm({...sipForm, schoolYearStart: e.target.value})} />
                schoolYearEnd: <input type="text" onChange={(e)=>setSipForm({...sipForm, schoolYearEnd: e.target.value})} />
                <button onClick={()=>viewSIP()}>View SIP</button>
                <div>
                    {Array.isArray(sips) && sips.length > 0 && sips.map((sip: any) => {
                        return (
                            <div style={{ border: '5px solid', margin: '15px', padding: '15px' }} key={sip.sipId}>
                                <h4>SIP ID: {sip.sipId}</h4>
                                <p>Student: {sip.student.name.first}</p>
                                <p>School Year: {sip.schoolYear.start}</p>
                                <p>Status: {sip.status}</p>
                                

                                <hr  style={{ border: '2px solid' }}/>
                                <h5>CASES</h5>

                                <div style={{ margin: '10px' }}>
                                    {sip.cases.AEC.length > 0 ? <h6>Excessive Tardiness/Absences</h6> : ""}
                                    {Array.isArray(sip.cases.AEC) && sip.cases.AEC.length > 0 && sip.cases.AEC.map((data: any) => {
                                        return (
                                            <div style={{ border: '.5px dotted' }} key={data._id}>
                                                <p>{data.issuedAt}</p>
                                                <p>{data.issuer.name.first}</p>
                                                <p>{data.term}</p>
                                            </div>
                                        );
                                    })}

                                    {sip.cases.DCP.length > 0 ? <h6>Declining Class Performance</h6> : ""}
                                    {Array.isArray(sip.cases.DCP) && sip.cases.DCP.length > 0 && sip.cases.DCP.map((data: any) => {
                                        return (
                                            <div style={{ border: '.5px dotted' }} key={data._id}>
                                                <p>{data.issuedAt}</p>
                                                <p>{data.issuer.name.first}</p>
                                                <p>{data.term}</p>
                                            </div>
                                        );
                                    })}

                                    {sip.cases.UoaS.length > 0 ? <h6>Unbecoming of an STIer</h6> : ""}
                                    {Array.isArray(sip.cases.UoaS) && sip.cases.UoaS.length > 0 && sip.cases.UoaS.map((data: any) => {
                                        return (
                                            <div style={{ border: '.5px dotted' }} key={data._id}>
                                                <p>{data.issuedAt}</p>
                                                <p>{data.issuer.name.first}</p>
                                                <p>{data.term}</p>
                                            </div>
                                        );
                                    })}

                                    {sip.cases.AEC.length > 0 ? <h6>Assessment/Exam Concern</h6> : ""} 
                                    {Array.isArray(sip.cases.AEC) && sip.cases.AEC.length > 0 && sip.cases.AEC.map((data: any) => {
                                        return (
                                            <div style={{ border: '.5px dotted' }} key={data._id}>
                                                <p>{data.issuedAt}</p>
                                                <p>{data.issuer.name.first}</p>
                                                <p>{data.term}</p>
                                            </div>
                                        );
                                    })}

                                    {sip.cases.LD.length > 0 ? <h6>Learning Difficulty</h6> : ""}
                                    {Array.isArray(sip.cases.LD) && sip.cases.LD.length > 0 && sip.cases.LD.map((data: any) => {
                                        return (
                                            <div style={{ border: '.5px dotted' }} key={data._id}>
                                                <p>{data.issuedAt}</p>
                                                <p>{data.issuer.name.first}</p>
                                                <p>{data.term}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                                
                            </div>
                        );
                    })}
                </div>
            </div>
            <hr/>
            <div>
                <h2 className='ContentLayout1__Title'>Change SIP Status</h2>
                SIP ID: <input type="text" onChange={(e)=>setStatusForm({...statusForm, sipId: e.target.value})}/>
                Status: <input type="text" onChange={(e)=>setStatusForm({...statusForm, status: e.target.value})}/>
                <button onClick={()=>changeStatus()}>Update</button>
            </div>
        </div>
    );
};

export default SIP;