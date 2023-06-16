import React,{useState} from 'react';
import './EmployeesList.scss'
import Button from '@mui/material/Button/Button';
import SearchInput from '../../Components/SearchInput/SearchInput';
import EmployeeCard from './EmployeeCard';

function EmployeesList() {
    const [stepper,setStepper] = useState("Moderators");
    return <>
        <div className='Employees ContentLayout1'>
            <h2 className='ContentLayout1__Title'>Employees</h2>
            <div className='ContentLayout1__Navigation'>
                <Button variant={stepper==="Moderators"?"contained":"text"} onClick={()=>{setStepper("Moderators")}}>Moderators</Button>
                <Button variant={stepper==="Teachers"?"contained":"text"} onClick={()=>{setStepper("Teachers")}}>Teachers</Button>
            </div>
            <div className='ContentLayout1__Tools'>
                <div className='ContentLayout1__Extended'>
                    <SearchInput/>
                </div>
                <div><Button variant='contained' href='/employees/add'>Add Employee</Button></div>
            </div>
            {stepper==="Moderators"?<>
                <div className='WrapperCard'>
                    <EmployeeCard/>
                    <EmployeeCard/>
                    <EmployeeCard/>
                    <EmployeeCard/>
                    <EmployeeCard/>
                    <EmployeeCard/>
                </div>
            </>:""}
            {stepper==="Teachers"?<>
                <div className='WrapperCard'>
                    <EmployeeCard/>
                    <EmployeeCard/>
                </div>
            </>:""}
        </div>
    </>
}

export default EmployeesList