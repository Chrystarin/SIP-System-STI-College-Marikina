import React,{useState} from 'react'
import Button from '@mui/material/Button/Button';
import SearchInput from '../../Components/SearchInput/SearchInput';
import CaseTableView from '../../Components/CaseTableView/CaseTableView';

function StudentList() {
    const [stepper,setStepper] = useState("Active");
    return <>
        <div className=' ContentLayout1'>
            <h2 className='ContentLayout1__Title'>Students</h2>
            <div className='ContentLayout1__Tools'>
                <div className='ContentLayout1__Extended'>
                    <SearchInput/>
                </div>
                <div><Button variant='contained'>Add Student</Button></div>
            </div>
            {stepper==="Active"?<>
            <CaseTableView/>
            </>:""}
            {stepper==="Closed"?<>
            <CaseTableView/>
            </>:""}
        </div>
    </>
}

export default StudentList