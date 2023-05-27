import React from 'react';

interface FooterProps {
    // define your props here
  }
  
  const Footer: React.FC<FooterProps> = (props) => {
    return (
        <div className="footer">
            <h1>Footer</h1>
        </div>
    );
  };

export default Footer;