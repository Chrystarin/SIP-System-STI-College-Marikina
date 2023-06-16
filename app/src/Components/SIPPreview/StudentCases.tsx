import React from 'react'
import { Avatar } from '@mui/material'
function StudentCases() {
  return (
    <div className='SIP__Preview'>
      <div className='StudentCase'>
        <h6>Excessive Tardiness / Absences</h6>
        <table>
          <tr>
            <th><p>Issued By</p></th>
            <th><p>Date Issued</p> </th>
            <th><p>Term</p> </th>
            <th><p>Semester</p> </th>
          </tr>
          <tr>
            <td className='TDName'>
              <Avatar className='TDName__Avatar'/>
              <p>Harold James H. Castillo</p>
            </td>
            <td>
              <p>October 25, 2023</p>
            </td>
            <td>
              <p>Prelims</p>
            </td>
            <td>
              <p>Second Semester</p>
            </td>
          </tr>
          <tr>
            <td className='TDName'>
              <Avatar className='TDName__Avatar'/>
              <p>Harold James H. Castillo</p>
            </td>
            <td>
              <p>October 25, 2023</p>
            </td>
            <td>
              <p>Prelims</p>
            </td>
            <td>
              <p>Second Semester</p>
            </td>
          </tr>
        </table>
      </div>
      <div className='StudentCase'>
        <h6>Excessive Tardiness / Absences</h6>
        <table>
          <tr>
            <th><p>Issued By</p></th>
            <th><p>Date Issued</p> </th>
            <th><p>Term</p> </th>
            <th><p>Semester</p> </th>
          </tr>
          <tr>
            <td className='TDName'>
              <Avatar className='TDName__Avatar'/>
              <p>Harold James H. Castillo</p>
            </td>
            <td>
              <p>October 25, 2023</p>
            </td>
            <td>
              <p>Prelims</p>
            </td>
            <td>
              <p>Second Semester</p>
            </td>
          </tr>
          <tr>
            <td className='TDName'>
              <Avatar className='TDName__Avatar'/>
              <p>Harold James H. Castillo</p>
            </td>
            <td>
              <p>October 25, 2023</p>
            </td>
            <td>
              <p>Prelims</p>
            </td>
            <td>
              <p>Second Semester</p>
            </td>
          </tr>
        </table>
      </div>
    </div>
  )
}

export default StudentCases