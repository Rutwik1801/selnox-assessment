import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Heading from './Heading';
import OptionsDropDown from './OptionsDropDown';
import parse from "html-react-parser"
import Loader from './Loader';

const tableHeaders=["Name","DOB","Start Date","End Date","Description"]

const tableCellStyles={
  color:"#7E98BA",fontFamily:"Montserrat",fontWeight:500,fontSize:"13px"
}
const tableHeaderCellStyles={
  color:"#263857",fontFamily:"Montserrat",fontWeight:500,fontSize:"16px",minWidth:"150px"
}

function EmployeeTable() {

    const [rows,setRows]=useState([])
    const [loading,setLoading]=useState(false)

const getData=async()=>{
    setLoading(true)
    const res=await fetch('https://sweede.app/DeliveryBoy/Get-Employee/');
    const data= await res.json();
    const modifiedData=[]
     data.forEach(employee => {
        const modifiedEmployeeData={
            id:employee.id,
            name:`${employee.FirstName} ${employee.LastName}`,
            dob:employee.DOB,
            startDate:employee.StartDate,
            endDate:employee.EndDate,
            description:employee.Description

        }
        modifiedData.push(modifiedEmployeeData)

    });
    setRows(modifiedData)
   setLoading(false)
}

useEffect(()=>{
  getData();
  },[])

// DELETE--
const handleEmployeeDelete=async (employeeId)=>{
   const res=await fetch(`https://sweede.app/DeliveryBoy/delete-Employee/${employeeId}`,{
    method:"DELETE"
   })
   getData()
}

    return (        
        <div style={{padding:"50px"}}>
             <Heading title="Employee List" alignment="left" />
            {loading===true?<Loader />:
            <div>
        <TableContainer component={Paper} sx={{borderRadius:"16px"}}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{borderBottom:"3px solid #D5D5D5"}}>
              <TableRow sx={{height:"100px"}}>

                {tableHeaders.map((header)=>{
                    return(
                        <TableCell  sx={tableHeaderCellStyles}>{header}</TableCell>
                    );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                return(
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" sx={tableCellStyles}>
                    {row.name}
                  </TableCell>
                  <TableCell sx={tableCellStyles} >{row.dob}</TableCell>
                  <TableCell sx={tableCellStyles}>{row.startDate}</TableCell>
                  <TableCell sx={tableCellStyles} >{row.endDate}</TableCell>
                  <TableCell sx={tableCellStyles}>{parse(row.description)}</TableCell>
                  <TableCell sx={tableCellStyles}><OptionsDropDown employeeId={row.id} handleEmployeeDelete={handleEmployeeDelete}/></TableCell>
                </TableRow>
              )}
              )}
            </TableBody>
          </Table>
        </TableContainer>
            </div>
            }

        </div>
      );
}

export default EmployeeTable





