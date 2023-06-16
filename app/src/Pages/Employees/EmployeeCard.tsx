import React from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from './../../Utils/Axios';
function EmployeeCard(props:any) {

    const {
        name,
        id,
        registerDate,
        cases,
        status
    } = props

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const resetPassword = async () => {
        try{
            await axios
            .patch(`/users/reset`,{
                employeeId : id
            })
            .then((response: any) => {
                console.log(response.data);
                alert("New password is: " + response.data.password);
            });
        }
        catch (error: any){
            console.log(error);
            alert(error.message);
        }
        handleClose();
    };

    const updateStatus = async () => {
        try{
            await axios
            .patch(`/users/updateStatus`,{
                employeeId : id,
                status : status === 'active' ? 'inactive' : 'active'
            })
            .then((response: any) => {
                console.log(response.data);
                alert("This user has been set to " + (status === 'active' ? 'inactive' : 'active'));
            });
        }
        catch (error: any){
            console.log(error);
            alert(error.message);
        }
        handleClose();
    };

    return (
        <div className='paper employeeCard active'>
            <div className='employeeCard__HeaderContainer'>
                { status === 'active'
                    ? <h6 className='BodyText1 Status'>Active</h6>
                    : <h6 className='BodyText1 Status'>Inactive</h6>
                }
                
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
                    <MenuItem onClick={resetPassword}>Reset Password</MenuItem>
                    <MenuItem onClick={updateStatus}>Set {status === 'active' ? 'inactive' : 'active'}</MenuItem>
                </Menu>
            </div>
            <a href={`/employees/${id}`} >
                <div className='employeeCard_Information'>
                    <Avatar className='employeeAvatar'/>
                    <h6>{name}</h6>
                    <p>ID:{id}</p>
                </div>
                <div className='employeeCard__Footer'>
                    {/* <div className='Footer__Info'>
                        <div>
                            <BusinessCenterIcon/>
                            <h6 className='BodyText1'>Case Closed</h6>
                        </div>
                        <p>{cases?.length}</p>
                    </div> */}
                    {/* <div className='Footer__Info'>
                        <div>
                            <CalendarMonthIcon/>
                            <h6 className='BodyText1 '>Registered On</h6>
                        </div>
                    </div>
                    <div className='Footer__Info'>
                        <p>{registerDate}</p>
                    </div> */}
                </div>
            </a>
            
        </div>
  )
}

export default EmployeeCard