import React from 'react';
import { Avatar } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';


function SIPPreview() {
    return (
        <div className='SIP__Preview'>
            <ul className='SIP__Information'>
                <li className='TitleValue'>
                    <h6 className='TitleValue__Title'>SIP ID:</h6>
                    <h6 className='TitleValue__Value'> #20232</h6>
                </li>
                <li className='TitleValue'>
                    <h6 className='TitleValue__Title'>School Year:</h6>
                    <h6 className='TitleValue__Value'>2022 - 2023</h6>
                </li>
                <li className='TitleValue'>
                    <h6 className='TitleValue__Title'>Semester:</h6>
                    <h6 className='TitleValue__Value'> 2nd</h6>
                </li>
            </ul>
            <div className='Student__Information'>
                <div className='Student__Card paper'>
                    <Avatar className='Student__Card__Avatar'/>
                    <div className='Student__Card__Information'>
                        <h6 className='Student__Card__Information__Name'>Dianne Chrystalin Brandez</h6>
                        <ul>
                            <li className='TitleValue'>
                                <h6 className='TitleValue__Title BodyText1'>Student ID:</h6>
                                <h6 className='TitleValue__Value BodyText1'>0200005232</h6>
                            </li>
                            <li className='TitleValue'>
                                <h6 className='TitleValue__Title BodyText1'>Section:</h6>
                                <h6 className='TitleValue__Value BodyText1'>CS801P</h6>
                            </li>
                            <li className='TitleValue'>
                                <h6 className='TitleValue__Title BodyText1'>Year Level:</h6>
                                <h6 className='TitleValue__Value BodyText1'> 4th Year</h6>
                            </li>
                        </ul>
                    </div>
                </div>
                <ul className='Student__MoreInfo'>
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
                </ul>
            </div>
        </div>
    )
}

export default SIPPreview