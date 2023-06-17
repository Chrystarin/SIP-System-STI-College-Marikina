import React, {useState} from 'react';
import Logo from './../Images/Resources/Branding/Logo.png';
import LoginModal from './../Components/LoginModal/LoginModal';
import { Button } from '@mui/material';

function Navigation() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    return <>
        <nav className='Navigation'>
            <div className='MainContainer'>
                <div className='LogoContainer'>
                    <a href="/">
                        <img className='Logo' src={Logo} alt="" />
                    </a>
                </div>
                <ul className='NavButtons'>
                    <li><Button variant='contained' onClick={handleOpenModal}>Login</Button></li>
                </ul>
            </div>
        </nav>
        <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
}

export default Navigation