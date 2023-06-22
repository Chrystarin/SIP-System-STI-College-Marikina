import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar } from '@mui/material';
import { useNavigate} from 'react-router-dom';

function StudentTableView(props:any) {
    const navigate = useNavigate();
    return (
        <div className='FindStudent__Results'>
            {/* {Array.isArray(props.students) && props.students.length > 0 && props.students.map((student: any) => {
                return (
                    <div
                        style={{border: '1px solid', cursor: 'pointer', margin: '5px', padding: '5px'}}
                        key={student.studentId}
                        onClick={() => {props.fetchStudent(student.studentId)}}
                    >
                        <p>{student.studentId}</p>
                        <p>{student.name.first} {student.name.last}</p>
                    </div>
                );
            })} */}
            <TableContainer component={Paper}>
                {/* {!props.students ? <div>Loading...</div> : props.students ? '' : */}
                <Table sx={{ minWidth: 650 }} aria-label="simple table" className='CaseTableView'>
                    <TableHead>
                        <TableRow>
                            <TableCell><h6>Name</h6></TableCell>
                            <TableCell align="right"><h6>ID</h6></TableCell>
                            <TableCell align="right"><h6>Registered Since</h6></TableCell>
                            <TableCell align="right"><h6>Last Updated</h6></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.students.map((student:any) => (
                            <TableRow
                                key={student.studentId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                className='CaseTableView__row'
                                onClick={()=>props.fetchStudent(student.studentId)}
                            >
                                <TableCell  component="th" scope="row" >
                                    <div className='NameHolder'>
                                        <Avatar className='NameHolder__Avatar'/>
                                        <p>{student.name.first} {student.name.last}</p>
                                    </div>
                                </TableCell>
                                <TableCell align="right"><p>{student.studentId}</p></TableCell>
                                <TableCell align="right"><p>{ new Date(student.updatedAt).toLocaleString('default', { month: 'long' }) + ' ' + new Date(student.updatedAt).getDate() + ', ' + new Date(student.updatedAt).getFullYear() }</p></TableCell>
                                <TableCell align="right"><p>{ new Date(student.createdAt).toLocaleString('default', { month: 'long' }) + ' ' + new Date(student.createdAt).getDate() + ', ' + new Date(student.createdAt).getFullYear() }</p></TableCell>
                            </TableRow>
                        ))} 
                    </TableBody>
                </Table>
            {/* } */}
            </TableContainer>
        </div>
    )
}

export default StudentTableView