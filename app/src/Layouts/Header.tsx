import React from 'react';

interface HeaderProps {
// define your props here
}
  
const Header: React.FC<HeaderProps> = (props) => {
    return (
        <div>
            <h1>Header</h1>
        </div>
    );
};

export default Header;