import React, {useState} from 'react';
import axios from './../Utils/Axios';

interface SIPProps {
// define your props here
}
  
const SIP: React.FC<SIPProps> = (props) => {

    const [sips, setSips] = useState('')

    const [form, setForm] = useState({
        studentId: '',
        sipCase: '',
        term: ''
    })

    const [sipForm, setSipForm] = useState({
        sipId: '', 
        studentId: '', 
        status: '', 
        schoolYearStart: '', 
        schoolYearEnd: ''
    })

    const [statusForm, setStatusForm] = useState({
        sipId: '', 
        status: ''
    })

    const addCase = async () => {
        try{
            await axios
            .post(`/sips`, {
                studentId: form.studentId,
                sipCase: form.sipCase,
                term: form.term
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

    const viewSIP = async () => {
        try{
            await axios
            .get(`/sips`, {
                params:{
                    sipId: sipForm.sipId, 
                    studentId: sipForm.studentId, 
                    status: sipForm.status, 
                    schoolYearStart: sipForm.schoolYearStart, 
                    schoolYearEnd: sipForm.schoolYearEnd
                }
            })
            .then((response: any) => {
                console.log(response);
                console.log(response.data[0].cases.LD.length>0 ? "true" : "False")
                setSips(response.data)
            });
        }
        catch (error: any){
            console.log(error);
            alert(error.message);
        }
    };

    const changeStatus = async () => {
        try{
            await axios
            .patch(`/sips`, {
                sipId: statusForm.sipId,
                status: statusForm.status
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
            <div>
                <h1>Add SIP</h1>
                Student ID: <input type="text" onChange={(e)=>setForm({...form, studentId: e.target.value})}/>
                Case: <input type="text" onChange={(e)=>setForm({...form, sipCase: e.target.value})} />
                Term: <input type="text" onChange={(e)=>setForm({...form, term: e.target.value})} />
                <button onClick={()=>addCase()}>Add Case</button>
            </div>
            <div>
                <h1>View SIP</h1>
                sipId: <input type="text" onChange={(e)=>setSipForm({...sipForm, sipId: e.target.value})} />
                studentId: <input type="text" onChange={(e)=>setSipForm({...sipForm, studentId: e.target.value})} />
                status: <input type="text" onChange={(e)=>setSipForm({...sipForm, status: e.target.value})} />
                schoolYearStart: <input type="text" onChange={(e)=>setSipForm({...sipForm, schoolYearStart: e.target.value})} />
                schoolYearEnd: <input type="text" onChange={(e)=>setSipForm({...sipForm, schoolYearEnd: e.target.value})} />
                <button onClick={()=>viewSIP()}>View SIP</button>
                <div>
                    {Array.isArray(sips) && sips.length > 0 && sips.map((sip: any) => {
                        return (
                            <div style={{ border: '1px solid' }} key={sip.sipId}>
                                <p>SIP ID: {sip.sipId}</p>
                                <p>Student: {sip.student}</p>
                                <p>School Year: {sip.schoolYear.start}</p>
                                <p>Status: {sip.status}</p>
                                <p>Cases: </p>
                                
                                {sip.cases.AEC.length > 0 ? "Excessive Tardiness/Absences" : ""}
                                {Array.isArray(sip.cases.AEC) && sip.cases.AEC.length > 0 && sip.cases.AEC.map((data: any) => {
                                    return (
                                        <div style={{ border: '1px solid' }} key={data._id}>
                                            <p>{data.issuedAt}</p>
                                            <p>{data.issuer}</p>
                                            <p>{data.term}</p>
                                        </div>
                                    );
                                })}

                                {sip.cases.DCP.length > 0 ? "Declining Class Performance" : ""}
                                {Array.isArray(sip.cases.DCP) && sip.cases.DCP.length > 0 && sip.cases.DCP.map((data: any) => {
                                    return (
                                        <div style={{ border: '1px solid' }} key={data._id}>
                                            <p>{data.issuedAt}</p>
                                            <p>{data.issuer}</p>
                                            <p>{data.term}</p>
                                        </div>
                                    );
                                })}

                                {sip.cases.UoaS.length > 0 ? "Unbecoming of an STIer" : ""}
                                {Array.isArray(sip.cases.UoaS) && sip.cases.UoaS.length > 0 && sip.cases.UoaS.map((data: any) => {
                                    return (
                                        <div style={{ border: '1px solid' }} key={data._id}>
                                            <p>{data.issuedAt}</p>
                                            <p>{data.issuer}</p>
                                            <p>{data.term}</p>
                                        </div>
                                    );
                                })}

                                {sip.cases.AEC.length > 0 ? "Assessment/Exam Concern" : ""} 
                                {Array.isArray(sip.cases.AEC) && sip.cases.AEC.length > 0 && sip.cases.AEC.map((data: any) => {
                                    return (
                                        <div style={{ border: '1px solid' }} key={data._id}>
                                            <p>{data.issuedAt}</p>
                                            <p>{data.issuer}</p>
                                            <p>{data.term}</p>
                                        </div>
                                    );
                                })}

                                {sip.cases.LD.length > 0 ? "Learning Difficulty" : ""}
                                {Array.isArray(sip.cases.LD) && sip.cases.LD.length > 0 && sip.cases.LD.map((data: any) => {
                                    return (
                                        <div style={{ border: '1px solid' }} key={data._id}>
                                            <p>{data.issuedAt}</p>
                                            <p>{data.issuer}</p>
                                            <p>{data.term}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div>
                <h1>Change SIP Status</h1>
                SIP ID: <input type="text" onChange={(e)=>setStatusForm({...statusForm, sipId: e.target.value})}/>
                Status: <input type="text" onChange={(e)=>setStatusForm({...statusForm, status: e.target.value})}/>
                <button onClick={()=>changeStatus()}>Update</button>
            </div>
        </div>
    );
};

export default SIP;