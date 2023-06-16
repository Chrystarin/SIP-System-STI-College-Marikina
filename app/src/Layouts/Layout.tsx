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
interface LayoutProps {
    // define your props here
    active :string
}
const Layout: React.FC<LayoutProps> = (props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div className='Layout'>
            <SideNavigation Active={props.active}/>
            <div className='Content'>
                <div className='Header'>
                    <div className='SearchInputHolder'>
                        <SearchInput/>
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
                                    <h6>Dianne Chrystalin Brandez</h6>
                                    <p>Teacher</p>
                                </div>
                                <ul className='ProfileDropdown__Navigation'>
                                    <a href="/profile">
                                        <li>
                                            <AccountCircleIcon/>
                                            <p>Profile</p>
                                        </li>
                                    </a>
                                    
                                    <li>
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