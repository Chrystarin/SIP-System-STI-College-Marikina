import React,{useState, useEffect} from 'react';
import './EmployeesList.scss'
import Button from '@mui/material/Button/Button';
import SearchInput from '../../Components/SearchInput/SearchInput';
import EmployeeCard from './EmployeeCard';
import axios from './../../Utils/Axios';


function EmployeesList() {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : '';
    const [stepper,setStepper] = useState("Teachers");
    
    const [moderators, setModerators] = useState<any>();
    const [teachers, setTeachers] = useState<any>();

    const fetchModerators = async () => {
        try{
            await axios
            .get(`/users`, {
                params:{
                    role: 'moderator'
                }
            })
            .then((response: any) => {
                setModerators(response.data)
            });
        }
        catch (error: any){
            console.log(error);
            alert(error.response.data.message);
        }
    }

    const fetchTeachers = async () => {
        try{
            await axios
            .get(`/users`, {
                params:{
                    role: 'teacher'
                }
            })
            .then((response: any) => {
                setTeachers(response.data)
            });
        }
        catch (error: any){
            console.log(error);
            alert(error.response.data.message);
        }
    }

    useEffect(() => {
        fetchModerators();
        fetchTeachers();
    }, [teachers, moderators])

    if (!moderators || !teachers) return <div>Loading...</div>

    return <>
        <div className='Employees ContentLayout1'>
            <h2 className='ContentLayout1__Title'>Employees</h2>
            <div className='ContentLayout1__Navigation'>
                <Button variant={stepper==="Teachers"?"contained":"text"} onClick={()=>{setStepper("Teachers")}}>Teachers</Button>
                <Button variant={stepper==="Moderators"?"contained":"text"} onClick={()=>{setStepper("Moderators")}}>Moderators</Button>
            </div>
            <div className='ContentLayout1__Tools'>
                <div className='ContentLayout1__Extended'>
                    <SearchInput/>
                </div>
                { user.role === 'admin' 
                    ? <div><Button variant='contained' href='/employees/add'>Add Employee</Button></div> 
                :''}
                
            </div>
            {stepper==="Moderators"?<>
                <div className='WrapperCard'>
                    {Array.isArray(moderators) && moderators.length > 0 && moderators.map((moderator: any) => {
                        return (
                            <EmployeeCard
                                key={moderator.employeeId}
                                name={moderator.name.first + " " + moderator.name.last} 
                                id={moderator.employeeId}
                                registerDate={moderator.createdAt}
                                status={moderator.status}
                            />
                        );
                    })}
                </div>
            </>:""}
            {stepper==="Teachers"?<>
                <div className='WrapperCard'>
                    {Array.isArray(teachers) && teachers.length > 0 && teachers.map((teacher: any) => {
                        return (
                            <EmployeeCard
                                key={teacher.employeeId}
                                name={teacher.name.first + " " + teacher.name.last} 
                                id={teacher.employeeId}
                                registerDate={teacher.createdAt}
                                status={teacher.status}
                            />
                        );
                    })}
                </div>
            </>:""}
        </div>
    </>
}

export default EmployeesList