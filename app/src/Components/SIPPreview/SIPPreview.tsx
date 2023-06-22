import React from 'react';
import { Avatar } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';


function SIPPreview(props:any) {
    const {data, student} = props;

    console.log(data)
    console.log(student)

    if (!data)
        return (
            <div className='SIP__Preview'>
                <div className='Student__Information'>
                    <div className='Student__Card paper'>
                        <Avatar className='Student__Card__Avatar'/>
                        <div className='Student__Card__Information'>
                            <h6 className='Student__Card__Information__Name'>{student.name.first} {student.name.last}</h6>
                            <ul>
                                <li className='TitleValue'>
                                    <h6 className='TitleValue__Title BodyText1'>Student ID:</h6>
                                    <h6 className='TitleValue__Value BodyText1'>{student.studentId}</h6>
                                </li>
                                <li className='TitleValue'>
                                    <h6 className='TitleValue__Title BodyText1'>Registered Since:</h6>
                                    <h6 className='TitleValue__Value BodyText1'>{ new Date(student.createdAt).toLocaleString('default', { month: 'long' }) + ' ' + new Date(student.createdAt).getDate() + ', ' + new Date(student.createdAt).getFullYear() }</h6>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* <ul className='Student__MoreInfo'>
                        <li>
                            <LocationOnIcon/>
                            <p>Saint Dominic Apitong St. Marikina Heights Marikina City</p>
                        </li>
                        <li>
                            <EmailIcon/>
                            <p>castillo.068902@marikina.sti.edu.ph</p>
                        </li>
                        <li>
                            <CallIcon/>
                            <p>0908-265-7587</p>
                        </li>
                    </ul> */}
                </div>
            </div>
        )
    else {
        return (
            <div className='SIP__Preview'>
                <ul className='SIP__Information'>
                    <li className='TitleValue'>
                        <h6 className='TitleValue__Title'>SIP ID:</h6>
                        <h6 className='TitleValue__Value'>{data.sipId}</h6>
                    </li>
                    <li className='TitleValue'>
                        <h6 className='TitleValue__Title'>School Year:</h6>
                        <h6 className='TitleValue__Value'>{data.schoolYear.start} - {data.schoolYear.end ?? (data.schoolYear.start+1)}</h6>
                    </li>
                    {/* <li className='TitleValue'>
                        <h6 className='TitleValue__Title'>Semester:</h6>
                        <h6 className='TitleValue__Value'> 2nd</h6>
                    </li> */}
                </ul>
                <div className='Student__Information'>
                    <div className='Student__Card paper'>
                        <Avatar className='Student__Card__Avatar'/>
                        <div className='Student__Card__Information'>
                            <h6 className='Student__Card__Information__Name'>{data.student.name.first} {data.student.name.last}</h6>
                            <ul>
                                <li className='TitleValue'>
                                    <h6 className='TitleValue__Title BodyText1'>Student ID:</h6>
                                    <h6 className='TitleValue__Value BodyText1'>{data.student.studentId}</h6>
                                </li>
                                <li className='TitleValue'>
                                    <h6 className='TitleValue__Title BodyText1'>Registered Since:</h6>
                                    <h6 className='TitleValue__Value BodyText1'>{ new Date(data.student.createdAt).toLocaleString('default', { month: 'long' }) + ' ' + new Date(data.student.createdAt).getDate() + ', ' + new Date(data.student.createdAt).getFullYear()   }</h6>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* <ul className='Student__MoreInfo'>
                        <li>
                            <LocationOnIcon/>
                            <p>Saint Dominic Apitong St. Marikina Heights Marikina City</p>
                        </li>
                        <li>
                            <EmailIcon/>
                            <p>castillo.068902@marikina.sti.edu.ph</p>
                        </li>
                        <li>
                            <CallIcon/>
                            <p>0908-265-7587</p>
                        </li>
                    </ul> */}
                </div>
            </div>
        )
    }
    
}

export default SIPPreview