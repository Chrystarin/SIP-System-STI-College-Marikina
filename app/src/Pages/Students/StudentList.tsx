import React,{useState, useEffect} from 'react'
import Button from '@mui/material/Button/Button';
import SearchInput from '../../Components/SearchInput/SearchInput';
import CaseTableView from '../../Components/CaseTableView/CaseTableView';
import axios from './../../Utils/Axios';

function StudentList() {

    const [students, setStudents] = useState();

    const fetchStudents = async () => {
        try{
            await axios
            .get(`/students`)
            .then((response: any) => {
                console.log(response.data);
                setStudents(response.data)
            });
        }
        catch (error: any){
            console.log(error);
            alert(error.message);
        }
    }

    useEffect(() => {
        fetchStudents();
    }, [])

    if (!students) return <div>Loading...</div>

    return <>
        <div className=' ContentLayout1'>
            <h2 className='ContentLayout1__Title'>Students</h2>
            <div className='ContentLayout1__Tools'>
                <div className='ContentLayout1__Extended'>
                    <SearchInput/>
                </div>
                <div><Button variant='contained'>Add Student</Button></div>
            </div>
            <CaseTableView data={students}/>
        </div>
    </>
}

export default StudentList