import React from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
function EmployeeCard() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div className='paper employeeCard active'>
            <div className='employeeCard__HeaderContainer'>
                <h6 className='BodyText1 Status'>Active</h6>
                <IconButton onClick={handleClick}>
                    <MoreHorizIcon />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={handleClose}>Update</MenuItem>
                    <MenuItem onClick={handleClose}>Set Inactive</MenuItem>
                    <MenuItem onClick={handleClose}>View List</MenuItem>
                </Menu>
            </div>
            <a href='/profile' >
                <div className='employeeCard_Information'>
                    <Avatar className='employeeAvatar'/>
                    <h6>Harold James H. Castillo</h6>
                    <p>ID:300452342</p>
                </div>
                <div className='employeeCard__Footer'>
                    <div className='Footer__Info'>
                        <div>
                            <BusinessCenterIcon/>
                            <h6 className='BodyText1'>Case Closed</h6>
                        </div>
                        <p>300</p>
                    </div>
                    <div className='Footer__Info'>
                        <div>
                            <CalendarMonthIcon/>
                            <h6 className='BodyText1 '>Registered On</h6>
                        </div>
                        <p>300</p>
                    </div>
                </div>
            </a>
            
        </div>
  )
}

export default EmployeeCard