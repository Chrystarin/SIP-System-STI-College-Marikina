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

    const {data} = props;

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table" className='CaseTableView'>
                <TableHead>
                    <TableRow>
                        <TableCell><h6>Name</h6></TableCell>
                        <TableCell align="right"><h6>ID</h6></TableCell>
                        <TableCell align="right"><h6>Registered Since</h6></TableCell>
                        <TableCell align="right"><h6>Active Cases</h6></TableCell>
                        <TableCell align="right"><h6>Total SIP</h6></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row:any) => (
                        <TableRow
                        key={row.studentId}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        className='CaseTableView__row'
                        
                        >
                            <TableCell onClick={()=>navigate(`/students/${row.studentId}`)} component="th" scope="row" >
                                <div className='NameHolder'>
                                    <Avatar className='NameHolder__Avatar'/>
                                    <p>{row.name.first} {row.name.last}</p>
                                </div>
                            </TableCell>
                            <TableCell align="right"><p>{row.studentId}</p></TableCell>
                            <TableCell align="right"><p>{row.createdAt}</p></TableCell>
                            <TableCell align="right"><p>{row.cases}</p></TableCell>
                            <TableCell align="right"><p>{row.sip}</p></TableCell>
                        </TableRow>
                    ))} 
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default CaseTableView