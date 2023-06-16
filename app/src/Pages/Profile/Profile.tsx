import React,{useState} from 'react'
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CaseTableView from '../../Components/CaseTableView/CaseTableView';
function Profile() {
  const [stepper, setStepper] = useState(1);
  return (
    <div className='ProfileTemplate'>
      <div className='SidePanel'>
        <div className='Sticky'>
          <Avatar className='ProfileImage' />
          <div className='UserInformation'>
            <h5 className='Name'>Harold James H. Castillo</h5>
            <p className='Title'>TEACHER</p>
            <ul>
              <li>
                <h6>Major</h6>
                <p>Science, Math, and English</p>
              </li>
              <li>
                <h6>Major</h6>
                <p>Science, Math, and English</p>
              </li>
              <li>
                <h6>Major</h6>
                <p>Science, Math, and English</p>
              </li>
            </ul>
            <Button className='Updatebutton' variant='contained' fullWidth> Update Profile</Button>
          </div>
        </div>
      </div>
      <div className='Profile__Content'>
        <div className='ContentNavigation'>
          <div className='paper ContentNavigation__Container active'>
            <div className='ContentNavigation__Information'>
              <h6>SIP Cases</h6>
              <h1>400</h1>
            </div>
            <div className='ContentNavigation__Footer' onClick={()=>{setStepper(1)}}>
              <p>View List</p>
              <NavigateNextIcon/>

            </div>
          </div>
          <div className='paper ContentNavigation__Container '>
            <div className='ContentNavigation__Information'>
              <h6>SIP Cases</h6>
              <h1>400</h1>
            </div>
            <div className='ContentNavigation__Footer' onClick={()=>{setStepper(2)}}>
              <p>View List</p>
              <NavigateNextIcon/>
            </div>
          </div>
        </div>
        <div className=' ContentNavigation__Table'>
          {stepper===1?<CaseTableView/>:""}
          {stepper===2?<CaseTableView/>:""}
        </div>
      </div>
    </div>
  )
}





export default Profile