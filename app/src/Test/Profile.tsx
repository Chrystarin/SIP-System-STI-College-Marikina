import React, { useState, useContext } from 'react';
import axios from '../Utils/Axios';
import { useAuth } from './../Utils/AuthContext';

interface ProfileProps {
    // define your props here
  }
  
const Profile: React.FC<ProfileProps> = (props) => {

    const { user } = useAuth();

    return (
        <div>
            <p>
                {JSON.stringify(user)}
            </p>
        </div>
        
    );
};

export default Profile;