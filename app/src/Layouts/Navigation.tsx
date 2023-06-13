import React from 'react';
import Logo from './../Images/Resources/Branding/Logo.png';
import { Button } from '@mui/material';
function Navigation() {
    return <>
        <nav className='Navigation'>
            <div className='MainContainer'>
                <div className='LogoContainer'>
                    <a href="/">
                        <img className='Logo' src={Logo} alt="" />
                    </a>
                </div>
                <ul className='NavButtons'>
                    <li><a href=""><p className='BodyText2'>About</p></a></li>
                    <li><Button variant='contained'>Login</Button></li>
                </ul>
            </div>
        </nav>
    </>
}

export default Navigation