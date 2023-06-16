import React,{useState , useEffect} from 'react'
import Button from '@mui/material/Button/Button';
import SearchInput from '../../Components/SearchInput/SearchInput';
import CaseTableView from '../../Components/CaseTableView/CaseTableView';
import axios from './../../Utils/Axios';

function CasesList() {
  const [stepper,setStepper] = useState("Active");
  const [pending, setPending] = useState([])
  const [closed, setClosed] = useState([])
  
  let resolved: any = []
  let noResponse: any = []

    const fetchPendingCases = async () => {
        try{
            await axios
            .get(`/sips`, {
                params: {
                    status: 'pending'
                }
            })
            .then((response: any) => {
                setPending(response.data)
            });
        }
        catch (error: any){
            console.log(error);
            alert(error.message);
        }
    };

    const fetchResolvedCases = async () => {
        try{
            await axios
            .get(`/sips`, {
                params: {
                    status: 'resolved'
                }
            })
            .then((response: any) => {
                resolved = response.data;
            });
        }
        catch (error: any){
            console.log(error);
            alert(error.message);
        }
    };

    const fetchNoResponseCases = async () => {
        try{
            await axios
            .get(`/sips`, {
                params: {
                    status: 'no response'
                }
            })
            .then((response: any) => {
                noResponse = response.data;
            });
        }
        catch (error: any){
            console.log(error);
            alert(error.message);
        }
    };

    const fetchClosedCases = async () => {
        await fetchNoResponseCases();
        await fetchResolvedCases();
        setClosed(resolved.concat(noResponse));
    }


    useEffect (() => {
        fetchPendingCases();
        fetchClosedCases();
    }, []);

    if (!pending || !closed) 
        return <div>Loading...</div>

    return <>
        <div className=' ContentLayout1'>
            <h2 className='ContentLayout1__Title'>SIPs</h2>
            <div className='ContentLayout1__Navigation'>
                <Button variant={stepper==="Active"?"contained":"text"} onClick={()=>{setStepper("Active")}}>Active SIPs</Button>
                <Button variant={stepper==="Closed"?"contained":"text"} onClick={()=>{setStepper("Closed")}}>Closed SIPs</Button>
            </div>
            <div className='ContentLayout1__Tools'>
                <div className='ContentLayout1__Extended'>
                    <SearchInput/>
                </div>
                <div><Button variant='contained' href='/case/add'>Add Case</Button></div>
            </div>
            {stepper==="Active"?<>
              <CaseTableView
                cases={pending}
              />
            </>:""}
            {stepper==="Closed"?<>
              <CaseTableView
              cases={closed}
              />
            </>:""}
    </div>
  </>
}

export default CasesList