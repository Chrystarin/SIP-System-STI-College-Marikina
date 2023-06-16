import React from 'react'
import Logo from '../Images/Resources/Branding/Logo.png';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import NewCase from '../Images/Resources/WebsiteResources/Case.png';
import { Button } from '@mui/material';

type  SideNavigationProps ={
    Active : string
}
const SideNavigation = (props:SideNavigationProps)=> {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : '';
    return <>
        <div className='SideNavigation'>
            <div className='Sticky'>
            <img  id='Logo' src={Logo} alt="" />
            <ul className='NavigationButtons'>
                { user.role === 'teacher' ? '' :
                    <li>
                        <a href="/employees" className={props.Active==="Employees"?"active":""}>
                            <PeopleAltIcon/>  
                            <p>Employees</p>
                        </a>
                    </li>
                }
                
                <li>
                    <a href="/cases" className={props.Active==="Cases"?"active":""}>
                        <WorkIcon/>  
                        <p>Cases</p>
                    </a>
                </li>
                <li>
                    <a href="/students" className={props.Active==="Students"?"active":""}>
                        <SchoolIcon/>  
                        <p>Students</p>
                    </a>
                </li>
            </ul>
            <div className='SideNavigation__NewCase'>
                <img src={NewCase} alt="" />
                <p>Only STI College Marikina Students can be added a new case</p>
                <Button variant='contained' href='/case/add'>Add Case</Button>
            </div>
            </div>
        </div>
    </>
}

export default SideNavigation