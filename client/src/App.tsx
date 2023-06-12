import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import LandingPage from './Pages/LandingPage/LandingPage';
import Layout from './Layouts/Layout';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route element={<Layout />} >
          {/* <Route path="/" element={<Home/>} /> */}
      </Route>
    </Routes>
  );
};

export default App;