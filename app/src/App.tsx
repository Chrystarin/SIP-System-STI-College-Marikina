import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from './Utils/ProtectedRoute';

import Profile from './Pages/Profile/Profile';
import LandingPage from './Pages/LandingPage/LandingPage';
import Layout from './Layouts/Layout';

import TestAuth from './Test/Auth';
import TestStudent from './Test/Student';
import TestSchoolYear from './Test/SchoolYear';
import TestSIP from './Test/SIP';
import TestProfile from './Test/Profile';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route element={<Layout />} >
        <Route path="/profile" element={<Profile/>} />
        <Route path="/test/auth" element={<TestAuth/>} />

        <Route element={<ProtectedRoute allowedRoles={['admin', 'teacher', 'moderator']}/>}>
            <Route path="/test/student" element={<TestStudent/>} />
            <Route path="/test/schoolyear" element={<TestSchoolYear/>} />
            <Route path="/test/sip" element={<TestSIP/>} />
            <Route path="/test/profile" element={<TestProfile/>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;