import React from 'react'
import './SIPForm.scss'
function SIPForm(props: any) {
    const {sip} = props;
    return (
        <div className='SIPForm'>
            <h5 className='SIPForm__Title'>SIP {"("}STUDENT INTERVENTION PROGRAM{")"} Consultation Form</h5>
            <div className='SIPForm__Header'>
                <div className='SIPForm__ROLE'>
                    <h6>PARENT</h6>
                    <h6>GUARDIAN</h6>
                    <h6>STUDENT</h6>
                    <h6>TEACHER</h6>
                </div>
                <div className='SIPForm__Information'>
                    <div className='wrapper__WValue'>
                        <h6>SIP #</h6>
                        <p className='Underline SIPValue'>{sip.sipId}</p>
                    </div>
                    <div className='wrapper__TITLE1'>
                        <div className='wrapper__WValue'>
                            <h6>PROGRAM</h6>
                            <p className='Underline'></p>
                        </div>
                        <div className='wrapper__WValue'>
                            <h6>Section</h6>
                            <p className='Underline'></p>
                        </div>
                        <div className='wrapper__WValue'>
                            <h6>YEAR LEVEL</h6>
                            <p className='Underline'></p>
                        </div>
                    </div>
                    <div className='wrapper__WValue'>
                        <h6>STUDENT NAME</h6>
                        <p className='Underline'>{sip.student.name.first} {sip.student.name.last}</p>
                    </div>
                    <div className='wrapper__WValue'>
                        <h6>Address</h6>
                        <p className='Underline'></p>
                    </div>
                    <div className='wrapper__TITLE2'>
                        <div className='wrapper__WValue'>
                            <h6>TEL. NO</h6>
                            <p className='Underline'></p>
                        </div>
                        <div className='wrapper__WValue'>
                            <h6>MOBILE NO.</h6>
                            <p className='Underline'></p>
                        </div>
                        <div className='wrapper__WValue'>
                            <h6>EMAIL</h6>
                            <p className='Underline'></p>
                        </div>
                        
                    </div>
                </div>
                
            </div>
            <div className='SIPForm__Body'>
                <div className='SIPForm__Purpose'>
                    <h6>PURPOSE OF VISIT/CONSULTATION</h6>
                    <div>

                    </div>
                    <h6>DETAILS OF CONSULTATION</h6>
                    <div>
                        {(!sip.cases.ETA.length) ? "" : 
                            <p>
                                Excessive Tardiness / Absences {"["} Issued by:{" "} 
                                    {Array.isArray(sip.cases.ETA) && sip.cases.ETA.length > 0 && sip.cases.ETA.map((data: any) => {
                                        return (
                                            <> | {data.issuer.name.first} {data.issuer.name.last} </>
                                        );
                                    })}
                                {"]"}
                            </p>
                        }
                        {(!sip.cases.DCP.length) ? "" : 
                            <p>
                                Declining Class Performance {"["} Issued by:{" "} 
                                    {Array.isArray(sip.cases.DCP) && sip.cases.DCP.length > 0 && sip.cases.DCP.map((data: any) => {
                                        return (
                                            <> | {data.issuer.name.first} {data.issuer.name.last} </>
                                        );
                                    })}
                                {"]"}
                            </p>
                        }
                        {(!sip.cases.UoaS.length) ? "" : 
                            <p>
                                Unbecoming of an STIer {"["} Issued by:{" "} 
                                    {Array.isArray(sip.cases.UoaS) && sip.cases.UoaS.length > 0 && sip.cases.UoaS.map((data: any) => {
                                        return (
                                            <> | {data.issuer.name.first} {data.issuer.name.last} </>
                                        );
                                    })}
                                {"]"}
                            </p>
                        }
                        {(!sip.cases.AEC.length) ? "" : 
                            <p>
                                Assessment/Exam Concern {"["} Issued by:{" "} 
                                    {Array.isArray(sip.cases.AEC) && sip.cases.AEC.length > 0 && sip.cases.AEC.map((data: any) => {
                                        return (
                                            <> | {data.issuer.name.first} {data.issuer.name.last} </>
                                        );
                                    })}
                                {"]"}
                            </p>
                        }
                        {(!sip.cases.LD.length) ? "" : 
                            <p>
                                Learning Difficulty {"["} Issued by:{" "} 
                                    {Array.isArray(sip.cases.LD) && sip.cases.LD.length > 0 && sip.cases.LD.map((data: any) => {
                                        return (
                                            <> | {data.issuer.name.first} {data.issuer.name.last} </>
                                        );
                                    })}
                                {"]"}
                            </p>
                        }
                    </div>
                    <h6>ACTION TAKEN</h6>
                    <div>

                    </div>
                    <h6>RECOMMENDATION</h6>
                    <div>

                    </div>
                </div>
                <div className='SIPForm__Signature'>
                    <h6>SIGNATURE OF COUNSELEE</h6>
                    <h6>SIGNATURE OF PARENT/GUARDIAN</h6>
                    <h6>SIGNATURE OF COUNSELOR</h6>
                </div>
            </div>
            <div className='SIPForm__Footer'>
                <div>
                    <h6>Endorsed By</h6>
                    <p>&nbsp;</p>
                    <span>Program Head</span>
                </div>
                <div>
                    <h6>Date</h6>
                    <p>&nbsp;</p>

                </div>
                <div>
                    <h6>Noted By</h6>
                    <p>Frederick Yulo</p>
                    <span>Dean/SHS Principal</span>
                </div>
                <div>
                    <h6>Date</h6>
                    <p>&nbsp;</p>
                </div>
            </div>
        </div>
    )
}

export default SIPForm