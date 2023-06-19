import React from 'react';
import './CaseTableView.scss'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar } from '@mui/material';
import { useNavigate} from 'react-router-dom';
    
function CaseTableView(props:any) {
    const navigate = useNavigate();

    let {students, cases, data} = props;

    const tableData = [
        {id:"0904232", name:"Harold James H. Castillo",section:"CS801P", cases:"45",sip :"5"},
        {id:"0904232", name:"Dianne Chrystalin B. Castillo",section:"CS801P", cases:"45",sip :"5"},
        {id:"0904232", name:"Jon Angelo Llagas",section:"CS801P", cases:"45",sip :"5"},
        {id:"0904232", name:"Gian Carlo Dela Cruz",section:"CS801P", cases:"45",sip :"5"}
    ]

    if (!data){
        data = tableData;
    }

    return (
        <TableContainer component={Paper}>
            {!students ? '' :
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
                        {students.map((row:any) => (
                            <TableRow
                                key={row.studentId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                className='CaseTableView__row'
                                onClick={()=>navigate(`/students/${row.studentId}`)}
                            >
                                <TableCell  component="th" scope="row" >
                                    <div className='NameHolder'>
                                        <Avatar className='NameHolder__Avatar'/>
                                        <p>{row.name.first} {row.name.last}</p>
                                    </div>
                                </TableCell>
                                <TableCell align="right"><p>{row.studentId}</p></TableCell>
                                <TableCell align="right"><p>{row.updatedAt}</p></TableCell>
                                <TableCell align="right"><p>{row.createdAt}</p></TableCell>
                            </TableRow>
                        ))} 
                    </TableBody>
                </Table>
        }
        {!cases ? '' :
                <Table sx={{ minWidth: 650 }} aria-label="simple table" className='CaseTableView'>
                    <TableHead>
                        <TableRow>
                            <TableCell ><h6>SIP ID</h6></TableCell>
                            <TableCell align="right"><h6>Student</h6></TableCell>
                            <TableCell align="right"><h6>Created On</h6></TableCell>
                            <TableCell align="right"><h6>Status</h6></TableCell>
                            <TableCell align="right"><h6>Active Cases</h6></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cases.map((row:any) => (
                            <TableRow
                                key={row.sipId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                className='CaseTableView__row'
                                onClick={()=>navigate(`/sip/${row.sipId}`)}
                            >
                                <TableCell align="right"><p>{row.sipId}</p></TableCell>
                                <TableCell component="th" scope="row" >
                                    <p>{row.student.name.first} {row.student.name.last}</p>
                                </TableCell>
                                <TableCell align="right"><p>{row.createdAt}</p></TableCell>
                                <TableCell align="right"><p>{(row.status).toUpperCase()}</p></TableCell>
                                <TableCell align="right">
                                    <p>
                                        {row.cases.AEC.length + row.cases.DCP.length + 
                                        row.cases.ETA.length + row.cases.LD.length + 
                                        row.cases.UoaS.length}
                                    </p>
                                </TableCell>
                            </TableRow>
                        ))} 
                    </TableBody>
                </Table>
        }
        
        </TableContainer>
    )
}

export default CaseTableView