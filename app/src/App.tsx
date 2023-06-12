import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Layout from './Layouts/Layout';

import TestAuth from './Test/Auth';
import TestStudent from './Test/Student';
import TestSchoolYear from './Test/SchoolYear';

const App: React.FC = () => {
  return (
    <Routes>
        <Route element={<Layout />} >
            <Route path="/" element={<Home/>} />
            <Route path="/test/auth" element={<TestAuth/>} />
            <Route path="/test/student" element={<TestStudent/>} />
            <Route path="/test/schoolyear" element={<TestSchoolYear/>} />
        </Route>
    </Routes>
  );
};

export default App;