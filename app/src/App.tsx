import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Profile from './Pages/Profile/Profile';
import LandingPage from './Pages/LandingPage/LandingPage';
import Layout from './Layouts/Layout';

import TestAuth from './Test/Auth';
import TestStudent from './Test/Student';
import TestSchoolYear from './Test/SchoolYear';
import TestSIP from './Test/SIP';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route element={<Layout />} >
        <Route path="/profile" element={<Profile/>} />
        <Route path="/test/auth" element={<TestAuth/>} />
        <Route path="/test/student" element={<TestStudent/>} />
        <Route path="/test/schoolyear" element={<TestSchoolYear/>} />
        <Route path="/test/sip" element={<TestSIP/>} />
      </Route>
    </Routes>
  );
};

export default App;