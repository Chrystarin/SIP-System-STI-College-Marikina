import React, {useState} from 'react';
import axios from './../Utils/Axios';

interface SIPProps {
// define your props here
}
  
const SIP: React.FC<SIPProps> = (props) => {
    const [form, setForm] = useState({
        studentId: '',
        sipCase: '',
        quarter: ''
    })

    const addCase = async () => {
        try{
            await axios
            .post(`/sips`, {
                studentId: '',
                sipCase: '',
                quarter: ''
            })
            .then((response: any) => {
                console.log(response);
                alert(response.data.message);
            });
        }
        catch (error: any){
            console.log(error);
            alert(error.message);
        }
    };

    return (
        <div>
            <h1>Add SIP</h1>
            Student ID: <input type="text" onChange={(e)=>setForm({...form, studentId: e.target.value})}/>
            Case: <input type="text" onChange={(e)=>setForm({...form, sipCase: e.target.value})} />
            Quarter: <input type="text" onChange={(e)=>setForm({...form, quarter: e.target.value})} />
            <button onClick={()=>addCase()}>Add Case</button>
        </div>
    );
};

export default SIP;