import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Profile from './Pages/Profile/Profile';
import LandingPage from './Pages/LandingPage/LandingPage';
import Layout from './Layouts/Layout';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route element={<Layout />} >
        <Route path="/profile" element={<Profile/>} />
      </Route>
    </Routes>
  );
};

export default App;