import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
    // define your props here
}
  
const Layout: React.FC<LayoutProps> = (props) => {
    return (
        <div>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Layout;