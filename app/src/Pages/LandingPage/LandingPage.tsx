import React from 'react'
import './LandingPage.scss';
import Navigation from '../../Layouts/Navigation';
import { Button } from '@mui/material';

import Placeholder from './../../Images/placeholder.png';
import HeaderImage from './../../Images/header.png';
import SectionImage1 from './../../Images/section1.png';
import SectionImage2 from './../../Images/section2.png';
import SectionImage3 from './../../Images/section3.png';
import Brandez from './../../Images/brandez.jpg';
import Castillo from './../../Images/castillo.jpg';
import Llagas from './../../Images/llagas.jpg';
import DelaCruz from './../../Images/delacruz.jpg';

const LandingPage: React.FC = () => {
    return <>
        <Navigation/>
        <div className='Container'>
            <header>
                <div className='MainSection'>
                    <div className="Text">
                        <h1>SIP SYSTEM</h1>
                        <h3>
                            A web application created for STI College Marikina to efficiently 
                            organize the Student Investigatory Program process
                        </h3>
                        <div>
                            <Button variant='contained'>Learn More</Button>
                        </div>
                    </div>
                    <div className="Image">
                        <img src={HeaderImage} />
                    </div>
                </div>
            </header>
            
            <div>
                <h4>Features</h4>
                <section id='Container_Section'>	
                    <div className='Container_Content_Section'>
                        <div className='Title_Content_Section'>
                            
                            <div>
                                <h4>
                                    Digital SIP Records
                                </h4>
                                <h5>
                                    Goodbye to the traditional paper copies of SIP Forms
                                    and hello to a more modern digital approach to filing,
                                    storing, and managing SIP records.
                                </h5>
                            </div>
                        </div>
                        <div className='Img_Content_Section'>
                            <img
                                src={SectionImage1}
                                alt=''
                            />
                        </div>
                        
                        <div className='Img_Content_Section'>
                            <img
                                src={SectionImage2}
                                alt=''
                            />
                        </div>
                        <div className='Title_Content_Section'>
                            <div>
                                <h4>Easily File a Case</h4>
                                <h5>
                                    Cases are classified into 5 easily idenitifiable types
                                    and filing a case against a student is made easy! All
                                    you have to do is search, select case, then submit!
                                </h5>
                            </div>
                        </div>
                        <div className='Title_Content_Section'>
                            <div>
                                <h4>Organized Student Records</h4>
                                <h5>
                                    Student records are managed and organized accordingly
                                    and if a student does not exist in the database, users
                                    can easily add a record of a student.
                                </h5>
                            </div>
                        </div>
                        <div className='Img_Content_Section'>
                            <img
                                src={SectionImage3}
                                alt=''
                            />
                        </div>
                    </div>
                </section>
            </div>
            <div>
                <h4>Developers</h4>
                <div className='DeveloperContainer'>
                    <div className='DeveloperCard'>
                        <img src={Brandez}/>
                        <div className='Content'>
                            <h5>Dianne Chrystalin Brandez</h5>
                            <h5 className='Position'>Team Leader & Developer</h5>
                        </div>
                    </div>
                    <div className='DeveloperCard'>
                        <img src={Castillo}/>
                        <div className='Content'>
                            <h5>Harold James Castillo</h5>
                            <h5 className='Position'>UI/UX & Front-End Dev</h5>
                        </div>
                    </div>
                    <div className='DeveloperCard'>
                        <img src={Llagas}/>
                        <div className='Content'>
                            <h5>Jon Angelo Llagas</h5>
                            <h5 className='Position'>Back-End Developer</h5>
                        </div>
                    </div>
                    <div className='DeveloperCard'>
                        <img src={DelaCruz}/>
                        <div className='Content'>
                            <h5>Gian Carlo Dela Cruz</h5>
                            <h5 className='Position'>Developer</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default LandingPage