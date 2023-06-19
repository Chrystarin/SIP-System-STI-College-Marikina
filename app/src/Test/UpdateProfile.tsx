import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';

import axios from './../Utils/Axios';

interface UpdateProfileProps {
    // define your props here
}
  
const UpdateProfile: React.FC<UpdateProfileProps> = (props) => {

    const navigate = useNavigate();
    const [password, setPassword] = useState<any>();

    const updatePassword = async () => {
        console.log(password)
        try{
            await axios
            .patch(`/users/updatePassword`,{
                password: password
            })
            .then((response: any) => {
                console.log(response);
                alert(response.data.message);
                navigate("/profile");
            });
        }
        catch (error: any){
            console.log(error);
            alert(error.response.data.message);
        }
    }

    return (
        <div>
            <h1>Update Password</h1>
            <TextField 
                id="outlined-basic" 
                label="Password" 
                variant="outlined"
                type="password"
                required
                fullWidth
                onChange={(e)=>setPassword(e.target.value)}
            />
            <button onClick={() => updatePassword()}>Update</button>
        </div>
    );
};

export default UpdateProfile;