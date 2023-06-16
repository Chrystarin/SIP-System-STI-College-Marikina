import React from 'react';
import { Outlet } from 'react-router-dom';

import SideNavigation from './SideNavigation';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
    // define your props here
}
  
const Layout: React.FC<LayoutProps> = (props) => {
    return (
        <div className='Layout'>
            <SideNavigation />
            <Outlet/>
        </div>
    );
};

export default Layout;