import React, {useState} from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from './../../Utils/Axios';
import SnackbarComponent from '../../Components/Snackbar/SnackbarComponent';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
function EmployeeCard(props:any) {

    const [openSnackBar, setOpenSnackBar] = React.useState({
        open:false,
        type:"",
        note:""
    });
    const {
        name,
        id,
        registerDate,
        cases,
        status
    } = props
    
    const [anchorElMoreInfo, setAnchorElMoreInfo] = React.useState<null | HTMLElement>(null);
    const openMoreInfo = Boolean(anchorElMoreInfo);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElMoreInfo(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorElMoreInfo(null);
    };

    const [openPassword, setOpenPassword] = React.useState(false);
    const handleOpenPassword = () => setOpenPassword(true);
    const handleClosePassword = () => setOpenPassword(false);
    const [passwordVal, setPasswordVal] = useState<any>();
    const resetPassword = async () => {
        try{
            await axios
            .patch(`/users/reset`,{
                employeeId : id
            })
            .then((response: any) => {
                console.log(response.data);
                setPasswordVal(response.data.password);
                handleOpenPassword();
            });
        }
        catch (error: any){
            console.log(error);
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
                setOpenSnackBar(openSnackBar => ({
                    ...openSnackBar,
                    open:true,
                    type:'success',
                    note: "This user has been set to " + (status === 'active' ? 'inactive' : 'active'),
                }));
                
            });
        }
        catch (error: any){
            console.log(error);
            alert(error.response.data.message);
        }
        handleClose();
    };

    return (
        <div className={status === 'active'?"paper employeeCard active":"paper employeeCard"} >
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
                    anchorEl={anchorElMoreInfo}
                    open={openMoreInfo}
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
                    
                </div>
            </a>
        <SnackbarComponent open={openSnackBar} setter={setOpenSnackBar}/>
        <Modal
            open={openPassword}
            onClose={handleClosePassword}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className='paper PasswordModal'>
                <div>
                    <h5>Password Reset</h5>
                </div>
                <div className='PasswordModal__Body'>
                    <h3>{passwordVal}</h3>
                    <p className='BodyText1'>NEW PASSWORD</p>
                </div>
                <div className='PasswordModal__Buttons'>
                    <Button variant='text' onClick={handleClosePassword}>Close</Button>
                    <Button variant='contained' onClick={() => {navigator.clipboard.writeText(passwordVal)}}>Copy</Button>
                </div>
            </div>
        </Modal>
    </div>
  )
}

export default EmployeeCard