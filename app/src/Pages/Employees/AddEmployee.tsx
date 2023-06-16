import React from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
function AddEmployee() {
    return (
        <form className='FormTemplate'>
            <h4 className='Form__Title'>CREATE NEW MODERATOR</h4>
            <div className='Form__Stepper'>
                <button>Moderator Details</button>
                <button>Summary</button>
            </div>
            <div className='Form__Section'>
                <h6 className='Section__Title'>Section Title</h6>
                <div className='Form_Questions wrapperForm_4_2'>
                    <TextField id="outlined-basic" label="First Name" variant="outlined"/>
                    <TextField id="outlined-basic" label="Middle Name" variant="outlined"/>
                    <TextField id="outlined-basic" label="Last Name" variant="outlined"/>
                    <TextField id="outlined-basic" label="Suffix" variant="outlined"/>
                </div>
                <div className='Form_Questions wrapperForm_3'>
                    <TextField id="outlined-basic" label="ID No." variant="outlined" type='number' required/>
                    <TextField id="outlined-basic" label="Email" variant="outlined" type='email' required/>
                    <TextField id="outlined-basic" label="Contact Number" variant="outlined" type='number' required/>
                </div>
            </div>
            <div className='Button__Container'>
                <Button variant='text'>cancel</Button>
                <Button variant='contained'>Submit</Button>
            </div>
        </form>
    )
}

export default AddEmployee