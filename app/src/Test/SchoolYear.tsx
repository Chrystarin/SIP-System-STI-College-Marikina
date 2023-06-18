import React, {useState} from 'react';
import axios from './../Utils/Axios';

interface SchoolYearProps {
    // define your props here
}
  
const SchoolYear: React.FC<SchoolYearProps> = (props) => {

    const startSchoolYear = async () => {
        console.log((new Date()).getTime())
        try{
            await axios
            .post(`/schoolyears`, {
                start: (new Date()).getTime()
            })
            .then((response: any) => {
                console.log(response);
                alert(response.data.message);
            });
        }
        catch (error: any){
            console.log(error);
            alert(error.message);
        }
    };

    const endSchoolYear = async () => {
        try{
            await axios
            .patch(`/schoolyears`)
            .then((response: any) => {
                console.log(response);
                alert(response.data.message);
            });
        }
        catch (error: any){
            console.log(error);
            alert(error.message);
        }
    };

    const fetchSchoolYears = async () => {
        try{
            await axios
            .get(`/schoolyears`, {
                params:{
                    schoolYearStart: "2023"
                }
            })
            .then((response: any) => {
                console.log(response);
                alert(response.data.message);
            });
        }
        catch (error: any){
            console.log(error);
            alert(error.message);
        }
    };

    return (
        <div>
            <div>
                <h1>Start School Year</h1>
                <button onClick={() => startSchoolYear()}>Start School Year</button>
            </div>
            <div>
                <h1>End School Year</h1>
                <button onClick={() => endSchoolYear()}>End School Year</button>
            </div>
            <div>
                <h1>School Years</h1>
                <button onClick={() => fetchSchoolYears()}>View School Years</button>
            </div>
        </div>
    );
};
                   
export default SchoolYear;