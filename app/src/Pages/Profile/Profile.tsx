import React,{useState, useEffect} from 'react'
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CaseTableView from '../../Components/TableView/CaseTableView';
import axios from './../../Utils/Axios';
import { useParams } from 'react-router-dom';
import {useAuth} from '../../Utils/AuthContext';
import { useNavigate } from 'react-router-dom';

function Profile() {

    const [stepper, setStepper] = useState(1);
    const [user, setUser] = useState<any>();
    const [sips, setSips] = useState<any>();
    const {id} = useParams();
    const {isAuth} = useAuth();
    const navigate = useNavigate();

    const fetchUser = async () => {
        try{
            await axios
            .get(`/users`, {
                params:{
                    employeeId : (!id) ? ((JSON.parse(localStorage.getItem('user') || ''))?.employeeId) : id
                }
            })
            .then((response: any) => {
                console.log(response.data[0])
                setUser(response.data[0])
            });
        }
        catch (error: any){
            console.log(error);
            alert(error.response.data.message);
        }
    }

    const fetchSips = async () => {
        try{
            await axios
            .get(`/sips`, {
                params:{
                    employeeId: (!id) ? ((JSON.parse(localStorage.getItem('user') || ''))?.employeeId) : id
                    // employeeId: 'EMP001'
                }
            })
            .then((response: any) => {
                console.log(response.data);
                const objectsArray = response.data.map((obj: any) => ({
                    ...obj,
                    updatedAt: new Date(obj.updatedAt)
                }));
                setSips(objectsArray.sort((a:any, b:any) => b.updatedAt - a.updatedAt))
            });
        }
        catch (error: any){
            console.log(error);
            alert(error.response.data.message);
        }
    }

    useEffect(() => {
        fetchUser();
        fetchSips();
    }, [])

    if (!user || !sips) return <div>Loading...</div>

    return (
        <div className='ProfileTemplate'>
        <div className='SidePanel'>
            <div className='Sticky'>
            <Avatar className='ProfileImage' />
            <div className='UserInformation'>
                <h5 className='Name'>{user.name.first} {user.name.middle} {user.name.last}</h5>
                <p className='Title'>{(user.role).toUpperCase()}</p>
                <ul>
                <li>
                    <h6>Employee ID</h6>
                    <p>{user.employeeId}</p>
                </li>
                <li>
                    <h6>Status</h6>
                    <p>{(user.status).toUpperCase()}</p>
                </li>
                { user.role === 'admin' ? '' :
                    <li>
                        <h6>Registered Since</h6>
                        <p>{user.createdAt}</p>
                    </li>
                }
                </ul>

                {isAuth((!id) ? ((JSON.parse(localStorage.getItem('user') || ''))?.employeeId) : id) ? 
                    <Button className='Updatebutton' variant='contained' fullWidth onClick={()=>navigate("/update")}> Update Profile</Button>
                :''}
            
            </div>
            </div>
        </div>
        <div className='Profile__Content'>
            <div className='ContentNavigation'>
            <div className='paper ContentNavigation__Container active'>
                <div className='ContentNavigation__Information'>
                <h6>SIP Total</h6>
                <h1>
                    {sips.length}
                </h1>
                </div>
                <div className='ContentNavigation__Footer' onClick={()=>{setStepper(1)}}>
                <p>View List</p>
                <NavigateNextIcon/>

                </div>
            </div>

            </div>
            <div className=' ContentNavigation__Table'>
                <CaseTableView cases={sips}/>
            </div>
        </div>
        </div>
    )
}





export default Profile