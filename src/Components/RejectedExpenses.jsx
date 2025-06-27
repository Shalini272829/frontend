import React, { useState,useEffect } from 'react'
import Button from '@mui/material/Button'
import { TableContainer,Table, TableHead,TableBody,TableRow,TableCell,Paper, Icon, IconButton } from '@mui/material';
import '../Service/style.css'
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useNavigate, Link } from 'react-router-dom'
import UserService from '../Service/UserService';

function RejectedExpenses(){
    const [allRejExpDetails, setAllRejExpDetails]=useState([])
    const navigate=useNavigate();
    useEffect(()=>{
        const token=localStorage.getItem('token')
        const empId=localStorage.getItem('employeeId')
        const isAdmin = UserService.isAdmin();
         const isManager=UserService.isManager();
        if(isManager){
        axios.get(`http://localhost:8091/manager/get/rejected/expenserequests/${empId}`,
              {
                 headers:{Authorization:`Bearer ${token}`}
            })
        .then(res=>setAllRejExpDetails(res.data))
        .catch(err=>console.log(err))
        }
        if(isAdmin){
         axios.get(`http://localhost:8091/admin/get/rejected/expenserequests/${empId}`,
            {
                 headers:{Authorization:`Bearer ${token}`}
            }
        )
        .then(res=>setAllRejExpDetails(res.data))
        .catch(err=>console.log(err))   
    }
    },[])

    const handleView=async(expenseId)=>{
    localStorage.setItem('expRequestId',expenseId)
    navigate(`/viewPage`);
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
                           <TableCell>Manager status</TableCell>
                            <TableCell>Admin status</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Rejected Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            allRejExpDetails.map((details)=>{
                                return <TableRow key={details.expenseId}>
                                    <TableCell>{details.empId}</TableCell>
                                    <TableCell>{details.expRequestId}</TableCell>
                                    <TableCell>{details.empName}</TableCell>
                                    <TableCell>{details.type}</TableCell>
                                    <TableCell>{details.exp_date}</TableCell>
                                    <TableCell>{details.Amount}</TableCell>
                                    <TableCell>{details.description}</TableCell>
                                    <TableCell>{details.manager_status}</TableCell>
                                    <TableCell>{details.admin_status}</TableCell>
                                    <TableCell>{details.status}</TableCell>
                                    <TableCell>{details.approvedDate}</TableCell>
                                    <TableCell><IconButton onClick={()=>handleView(details.expRequestId)}><VisibilityIcon color='primary'></VisibilityIcon></IconButton></TableCell>
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

export default RejectedExpenses;
