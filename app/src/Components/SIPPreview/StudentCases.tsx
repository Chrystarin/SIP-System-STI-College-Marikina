import React from 'react'
import { Avatar } from '@mui/material'
function StudentCases(props:any) {

    const {cases} = props;

    return (
        <div className='SIP__Preview'>
            {(!cases.AEC.length) ? "" : 
                <div className='StudentCase'>
                    <h6>Excessive Tardiness / Absences</h6>
                    <table>
                        <tr>
                            <th><p>Issued By</p></th>
                            <th><p>Date Issued</p> </th>
                            <th><p>Term</p> </th>
                        </tr>
                        {Array.isArray(cases.AEC) && cases.AEC.length > 0 && cases.AEC.map((data: any) => {
                            return (
                                <tr>
                                    <td className='TDName'>
                                        <Avatar className='TDName__Avatar'/>
                                        <p>{data.issuer.name.first} {data.issuer.name.last}</p>
                                    </td>
                                    <td><p>{data.issuedAt}</p></td>
                                    <td><p>{data.term}</p></td>
                                </tr>
                            );
                        })}  
                    </table>
                </div>
            }

            {(!cases.DCP.length) ? "" : 
                <div className='StudentCase'>
                    <h6>Declining Class Performance</h6>
                    <table>
                        <tr>
                            <th><p>Issued By</p></th>
                            <th><p>Date Issued</p> </th>
                            <th><p>Term</p> </th>
                        </tr>
                        {Array.isArray(cases.DCP) && cases.DCP.length > 0 && cases.DCP.map((data: any) => {
                            return (
                                <tr>
                                    <td className='TDName'>
                                        <Avatar className='TDName__Avatar'/>
                                        <p>{data.issuer.name.first} {data.issuer.name.last}</p>
                                    </td>
                                    <td><p>{data.issuedAt}</p></td>
                                    <td><p>{data.term}</p></td>
                                </tr>
                            );
                        })}  
                    </table>
                </div>
            }

            {(!cases.UoaS.length) ? "" : 
                <div className='StudentCase'>
                    <h6>Unbecoming of an STIer</h6>
                    <table>
                        <tr>
                            <th><p>Issued By</p></th>
                            <th><p>Date Issued</p> </th>
                            <th><p>Term</p> </th>
                        </tr>
                        {Array.isArray(cases.UoaS) && cases.UoaS.length > 0 && cases.UoaS.map((data: any) => {
                            return (
                                <tr>
                                    <td className='TDName'>
                                        <Avatar className='TDName__Avatar'/>
                                        <p>{data.issuer.name.first} {data.issuer.name.last}</p>
                                    </td>
                                    <td><p>{data.issuedAt}</p></td>
                                    <td><p>{data.term}</p></td>
                                </tr>
                            );
                        })}  
                    </table>
                </div>
            }

            {(!cases.AEC.length) ? "" : 
                <div className='StudentCase'>
                    <h6>Assessment/Exam Concern</h6>
                    <table>
                        <tr>
                            <th><p>Issued By</p></th>
                            <th><p>Date Issued</p> </th>
                            <th><p>Term</p> </th>
                        </tr>
                        {Array.isArray(cases.AEC) && cases.AEC.length > 0 && cases.AEC.map((data: any) => {
                            return (
                                <tr>
                                    <td className='TDName'>
                                        <Avatar className='TDName__Avatar'/>
                                        <p>{data.issuer.name.first} {data.issuer.name.last}</p>
                                    </td>
                                    <td><p>{data.issuedAt}</p></td>
                                    <td><p>{data.term}</p></td>
                                </tr>
                            );
                        })}  
                    </table>
                </div>
            }

            {(!cases.LD.length) ? "" : 
                <div className='StudentCase'>
                    <h6>Learning Difficulty</h6>
                    <table>
                        <tr>
                            <th><p>Issued By</p></th>
                            <th><p>Date Issued</p> </th>
                            <th><p>Term</p> </th>
                        </tr>
                        {Array.isArray(cases.LD) && cases.LD.length > 0 && cases.LD.map((data: any) => {
                            return (
                                <tr>
                                    <td className='TDName'>
                                        <Avatar className='TDName__Avatar'/>
                                        <p>{data.issuer.name.first} {data.issuer.name.last}</p>
                                    </td>
                                    <td><p>{data.issuedAt}</p></td>
                                    <td><p>{data.term}</p></td>
                                </tr>
                            );
                        })}
                    </table>
                </div>
            }
        </div>
    )
}

export default StudentCases