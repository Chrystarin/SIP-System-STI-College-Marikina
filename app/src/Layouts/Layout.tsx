import React,{useState} from 'react';
import { Outlet } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import SideNavigation from './SideNavigation';
import Avatar from '@mui/material/Avatar';
import SearchInput from '../Components/SearchInput/SearchInput';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from './../Utils/AuthContext';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
interface LayoutProps {
    // define your props here
    active :string
}
const Layout: React.FC<LayoutProps> = (props) => {


    const [openYearNTerm, setOpenYearNTerm] = React.useState(false);
    const handleOpenYearNTerm = () => setOpenYearNTerm(true);
    const handleCloseYearNTerm = () => setOpenYearNTerm(false);


    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const { logout } = useAuth();
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : '';
    return (
        <div className='Layout'>
            <SideNavigation Active={props.active}/>
            <div className='Content'>
                <div className='Header'>
                    <div className='SearchInputHolder'>
                        <SearchInput/>
                    </div>
                    <div className='SchoolYear'>
                        <p>SY: 2022-2023 </p>
                        <IconButton aria-label="delete" size="small" onClick={()=>setOpenYearNTerm(true)}>
                            <EditIcon fontSize="inherit" />
                        </IconButton>
                        <Modal
                            open={openYearNTerm}
                            onClose={handleCloseYearNTerm}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <div className='paper SchoolYearModal' >
                                <h6 className='SchoolYearModal__Title'>School Year</h6>
                                <div className='SchoolYearModal__Container'>
                                    <h4>2022-2023</h4>
                                    <p>Active</p> 
                                </div>
                                <div>
                                    <Button  variant='contained' onClick={handleCloseYearNTerm}>End</Button>
                                </div>
                            </div>
                        </Modal>
                    </div>
                    <div>
                        <div>
                            
                        </div>
                        <IconButton className='ProfileDropdownButton' aria-label="delete" onClick={handleClick}>
                            <Avatar />
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                        >
                            <div className='ProfileDropdown'>
                                <div className='ProfileDropdown__Info'>
                                    <h6>{user.name.first} {user.name.last}</h6>
                                    <p>{(user.role).toUpperCase()}</p>
                                </div>
                                <ul className='ProfileDropdown__Navigation'>
                                    <a href="/profile">
                                        <li>
                                            <AccountCircleIcon/>
                                            <p>Profile</p>
                                        </li>
                                    </a>
                                    
                                    <li onClick={()=>logout()}>
                                        <LogoutIcon/>
                                        <p>Logout</p>
                                    </li>
                                </ul>
                            </div>
                        </Menu>
                    </div>
                </div>
                <Outlet/>
            </div>
        </div>
    );
};

export default Layout;