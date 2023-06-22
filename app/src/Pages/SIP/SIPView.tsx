import React,{useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import CaseTableView from '../../Components/TableView/CaseTableView';
import SearchInput from '../../Components/SearchInput/SearchInput';
import SIPPreview from '../../Components/SIPPreview/SIPPreview';
import StudentCases from '../../Components/SIPPreview/StudentCases';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SIPForm from '../../Components/SIPPreview/SIPForm';
import { Button } from '@mui/material';
import StudentTableView from '../../Components/TableView/StudentTableView';
import AddStudent from '../../Components/AddStudent/AddStudent';
import axios from '../../Utils/Axios';

function AddCase() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [sip, setSip] = useState<any>();
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : '';

    const fetchSip = async () => {
        try{
            await axios
            .get(`/sips`, {
                params:{
                    sipId: id
                }
            })
            .then((response: any) => {
                console.log(response.data[0]);
                setSip(response.data[0]);
            });
        }
        catch (error: any){
            console.log(error);
            alert(error.response.data.message);
        }
    };

    const updateStatus = async (status:any) => {
        try{
            await axios
            .patch(`/sips`, {
                sipId: sip.sipId,
                status: status
            })
            .then((response: any) => {
                console.log(response);
                alert(response.data.message);
                navigate('/sip');
            });
        }
        catch (error: any){
            console.log(error);
            alert(error.response.data.message);
        }
    };

    useEffect(() => {
        fetchSip();
    }, [])

    if (!sip) return <div>Loading...</div>

    return (
        <form className='FormTemplate'>
            <h4 className='Form__Title'>SIP VIEW</h4>
                <div className='Form__Section SIP'>
                    <SIPForm sip={sip}/>
                </div>
                <div className='Button__Container'>
                    <Button variant='contained' onClick={()=>{}}>Download</Button>
                    {sip.status==='pending' && (user.role === 'admin' || user.role === 'moderator')
                        ? 
                            <>
                                <Button variant='contained' onClick={()=>{updateStatus('resolved')}}>Resolved</Button>
                                <Button variant='contained' onClick={()=>{updateStatus('no response')}}>No Response</Button>
                            </>
                        :
                            ''
                    }
                    
                </div>
        </form>
    )
}

export default AddCase  