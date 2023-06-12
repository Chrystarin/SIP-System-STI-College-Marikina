import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Layout from './Layouts/Layout';

const App: React.FC = () => {
  return (
    <Routes>
        <Route element={<Layout />} >
            <Route path="/" element={<Home/>} />
        </Route>
    </Routes>
  );
};

export default App;