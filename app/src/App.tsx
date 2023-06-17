import React,{useState} from 'react';
import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from './Utils/ProtectedRoute';

import Profile from './Pages/Profile/Profile';
import LandingPage from './Pages/LandingPage/LandingPage';

import TestAuth from './Test/Auth';
import TestStudent from './Test/Student';
import TestSchoolYear from './Test/SchoolYear';
import TestSIP from './Test/SIP';

import EmployeesList from './Pages/Employees/EmployeesList';
import AddEmployee from './Pages/Employees/AddEmployee';
import CasesList from './Pages/Cases/CasesList';
import AddCase from './Pages/Cases/AddCase';
import StudentList from './Pages/Students/StudentList';
import Layout from './Layouts/Layout';
import StudentView from './Pages/Students/StudentView';
const App: React.FC = () => {

  return (
    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/test/auth" element={<TestAuth/>} />

        <Route element={<ProtectedRoute allowedRoles={['admin', 'teacher', 'moderator']}/>}>
            <Route element={<Layout active={""}/>} >  
                <Route path="/profile" element={<Profile />} />
                
                <Route path="/test/student" element={<TestStudent/>} />
                <Route path="/test/schoolyear" element={<TestSchoolYear/>} />
                <Route path="/test/sip" element={<TestSIP/>} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['admin', 'moderator']}/>}>
                <Route element={<Layout active={"Employees"}/>} >
                    <Route path="/employees" element={<EmployeesList/>} />
                    <Route path="/employees/:id" element={<Profile />} />
                    <Route element={<ProtectedRoute allowedRoles={['admin']}/>}>
                        <Route path="/employees/add" element={<AddEmployee/>} />
                    </Route>
                </Route>
            </Route>
            
            <Route element={<Layout active={"Cases"}/>} >
                <Route path="/cases" element={<CasesList/>} />
                <Route path="/case/add" element={<AddCase/>} />
            </Route>

            <Route element={<Layout active={"Students"}/>} >
                <Route path="/students" element={<StudentList/>} />
                <Route path="/students/:id" element={<StudentView/>} />
            </Route>
        </Route>
      
    </Routes>
  );
};

export default App;