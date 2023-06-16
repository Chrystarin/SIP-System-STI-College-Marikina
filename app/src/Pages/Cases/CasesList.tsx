import React,{useState} from 'react'
import Button from '@mui/material/Button/Button';
import SearchInput from '../../Components/SearchInput/SearchInput';
import CaseTableView from '../../Components/CaseTableView/CaseTableView';
function CasesList() {
  const [stepper,setStepper] = useState("Active");
    return <>
        <div className=' ContentLayout1'>
            <h2 className='ContentLayout1__Title'>Cases</h2>
            <div className='ContentLayout1__Navigation'>
                <Button variant={stepper==="Active"?"contained":"text"} onClick={()=>{setStepper("Active")}}>Active Cases</Button>
                <Button variant={stepper==="Closed"?"contained":"text"} onClick={()=>{setStepper("Closed")}}>Closed Cases</Button>
            </div>
            <div className='ContentLayout1__Tools'>
                <div className='ContentLayout1__Extended'>
                    <SearchInput/>
                </div>
                <div><Button variant='contained' href='/case/add'>Add Case</Button></div>
            </div>
            {stepper==="Active"?<>
              <CaseTableView/>
            </>:""}
            {stepper==="Closed"?<>
              <CaseTableView/>
            </>:""}
    </div>
  </>
}

export default CasesList