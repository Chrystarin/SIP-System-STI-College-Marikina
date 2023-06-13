import React from 'react'
import Logo from '../Images/Resources/Branding/Logo.png';
import SchoolIcon from '@mui/icons-material/School';
function SideNavigation() {
    return <>
        <div className='SideNavigation'>
            <img id='Logo' src={Logo} alt="" />
            <ul className='NavigationButtons'>
                <li>
                    <SchoolIcon/>  
                    <h6>Moderator</h6>
                </li>
                <li>wew</li>
                <li>wew</li>
            </ul>
        </div>
    </>
}

export default SideNavigation