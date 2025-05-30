import React, { useState,useEffect } from 'react'
import Button from '@mui/material/Button'
import { TableContainer,Table, TableHead,TableBody,TableRow,TableCell,Paper, Icon, IconButton } from '@mui/material';
import '../Service/style.css'
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useNavigate, Link } from 'react-router-dom'
import UserService from '../Service/UserService';

function ApprovedExpenses(){
    const [allAppExpDetails, setAllAppExpDetails]=useState([])
    const navigate=useNavigate();
    useEffect(()=>{
        axios.get("http://localhost:3000/approvedExpenses")
        .then(res=>setAllAppExpDetails(res.data))
        .catch(err=>console.log(err))
    },[])

    const handleView=async(expenseId)=>{
    navigate(`/viewPage/${expenseId}`);
}

    return(
        <>
        <div className='tablecontainer'>
                <TableContainer component={Paper} sx={{height:400}}>
                <Table aria-label='simple_table'>
                    <TableHead className='tablehead' variant="contained">
                        <TableRow>
                            <TableCell>Employee Id</TableCell>
                            <TableCell>Expense Id</TableCell>
                            <TableCell>Employee Name</TableCell>
                            <TableCell>Expense Type</TableCell>
                            <TableCell>Expense Date</TableCell>
                            <TableCell>Expense Amount</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            allAppExpDetails.map((details)=>{
                                return <TableRow key={details.expenseId}>
                                    <TableCell>{details.empId}</TableCell>
                                    <TableCell>{details.ExpRequestId}</TableCell>
                                    <TableCell>{details.empName}</TableCell>
                                    <TableCell>{details.type}</TableCell>
                                    <TableCell>{details.exp_date}</TableCell>
                                    <TableCell>{details.Amount}</TableCell>
                                    <TableCell>{details.description}</TableCell>
                                    <TableCell>{details.status}</TableCell>
                                    <TableCell><IconButton onClick={()=>handleView(details.expenseId)}><VisibilityIcon color='primary'></VisibilityIcon></IconButton></TableCell>
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table>
                </TableContainer>
                </div>
        </>
    )
}

export default ApprovedExpenses;