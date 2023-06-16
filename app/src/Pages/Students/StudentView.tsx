import React, {useState, useEffect} from 'react';
import './StudentView.scss';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SIPPreview from '../../Components/SIPPreview/SIPPreview';
import StudentCases from '../../Components/SIPPreview/StudentCases';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import { useParams } from 'react-router-dom';
import axios from './../../Utils/Axios';

function StudentView() {

    const {id} = useParams();
    const [student, setStudent] = useState<any>();
    const [cases, setCases] = useState<any>();

    const fetchStudent = async () => {
        try{
            await axios
            .get(`/students`, {
                params:{
                    studentId : id
                }
            })
            .then((response: any) => {
                console.log(response.data[0])
                setStudent(response.data[0])
            });
        }
        catch (error: any){
            console.log(error);
            alert(error.message);
        }
    }

    const fetchCases = async () => {
        try{
            await axios
            .get(`/sips`, {
                params:{
                    studentId: id
                }
            })
            .then((response: any) => {
                console.log(response);
                setCases(response.data)
            });
        }
        catch (error: any){
            console.log(error);
            alert(error.message);
        }
    };

    useEffect(() => {
        fetchStudent();
        // fetchCases();
    }, [])

    if(!student) return <div>Loading...</div>

    return (
        <div className='ProfileTemplate StudentView'>
        <div className='SidePanel'>
            <div className='Sticky'>
            <Avatar className='ProfileImage' />
            <div className='UserInformation'>
                <h5 className='Name'>{student.name.first} {student.name.last}</h5>
                <p className='Title'>STUDENT</p>
                <ul>
                <li>
                    <h6>ID</h6>
                    <p>{student.studentId}</p>
                </li>
                <li>
                    <h6>Registered Since</h6>
                    <p>{student.createdAt}</p>
                </li>
                </ul>
                {/* <Button className='Updatebutton' variant='contained' fullWidth> Update Profile</Button> */}
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
                <div className='ContentNavigation__Footer' onClick={()=>{alert()}}>
                <p>View List</p>
                <NavigateNextIcon/>
                </div>
            </div>
            </div>
            <div className='StudentView__SIP'>
            <div>
                <Accordion>
                <div className='AccordionParent'>
                    <div className='Accordion__Button'>
                    <IconButton >
                        <MoreHorizIcon />
                    </IconButton>
                    </div>
                    
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    
                    >
                    <div className='Accordion__Summary'>
                        <h6 className='Accordion__Summary__Title'>SY: 2022 - 2023 | 2nd Semester | Prefinals</h6>
                        <p className='Accordion__Summary__Status Status__active'>Active</p>
                        
                    </div>
                    </AccordionSummary>
                </div>
                
                <AccordionDetails>
                    <div className='Accordion__Content'>
                    <h5 className='Accordion__Title'>STUDENT INTERVENTION FORM</h5>
                    <SIPPreview/>
                    <h5 className='Accordion__Title'>STUDENT CASES</h5>
                    <StudentCases/>
                    </div>
                </AccordionDetails>
                </Accordion>
                
                <Accordion>
                <div className='AccordionParent'>
                    <div className='Accordion__Button'>
                    <IconButton >
                        <MoreHorizIcon />
                    </IconButton>
                    </div>
                    
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    
                    >
                    <div className='Accordion__Summary'>
                        <h6 className='Accordion__Summary__Title'>SY: 2022 - 2023 | 2nd Semester | Prefinals</h6>
                        <p className='Accordion__Summary__Status '>Close on Oct 25, 2000</p>
                        
                    </div>
                    </AccordionSummary>
                </div>
                
                <AccordionDetails>
                    <div className='Accordion__Content'>
                    <h5 className='Accordion__Title'>STUDENT INTERVENTION FORM</h5>
                    <SIPPreview/>
                    <h5 className='Accordion__Title'>STUDENT CASES</h5>
                    <StudentCases/>
                    </div>
                </AccordionDetails>
                </Accordion>
                
            </div>
            </div>
        </div>
        </div>
    )
}

function ViewSIP(){
  return <>
    <h1>SIP</h1>
  </>
}





export default StudentView