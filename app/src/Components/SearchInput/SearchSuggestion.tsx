import React,{useEffect} from 'react'
import Avatar from '@mui/material/Avatar';
interface Data{
    StudentData:any;
    EmployeesData:any;
}
function SearchSuggestion(props:Data) {
    

    return (
        <div className='SearchSuggested'>
            {props.StudentData?.length > 0 ? 
                <>
                <h6 className='ResultTitle'>Students</h6>
                {props.StudentData?.map((student: any) => {
                    return <>
                        <ul>
                            <li>
                                <a href={'/students/'+ student.studentId}>
                                    <Avatar sizes='small'/>
                                    <div>
                                        <p>{student['name.first']} {student['name.middle']} {student['name.last']}</p>
                                        <p>ID: {student.studentId}</p>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </>
                })}
            </>:""}
            {props.EmployeesData?.length>0? <>
                <h6 className='ResultTitle'>Employees</h6>
                {props.EmployeesData?.map((employee: any) => {
                    return <>
                        <ul>
                            <li>
                                <a href={'/employees/'+ employee.employeeId}>
                                    <Avatar sizes='small'/>
                                    <div>
                                        <p>{employee['name.first']} {employee['name.middle']} {employee['name.last']}</p>
                                        <p>ID: {employee.employeeId}</p>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </>
                })}
            </>:""}
        </div>
    )
}

export default SearchSuggestion