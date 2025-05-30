import React, { useState,useEffect } from 'react'
import Button from '@mui/material/Button'
import { TableContainer,Table, TableHead,TableBody,TableRow,TableCell,Paper, Icon, IconButton } from '@mui/material';
import '../Service/style.css'
import axios from 'axios';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useNavigate, Link } from 'react-router-dom'
import UserService from '../Service/UserService';

function AllExpenses(){
    const [allEmpExpDetails, setAllEmpExpDetails]=useState([])
    const navigate=useNavigate();
    useEffect(()=>{
        axios.get("http://localhost:3000/employeeExpenses")
        .then(res=>setAllEmpExpDetails(res.data))
        .catch(err=>console.log(err))
    },[])

    const handleApprove=async(expenseId)=>{
        try{
        const confirmApprove=window.confirm("Are you sure you want to approve the selected record?");
        if(confirmApprove){
            const token=localStorage.getItem('token');
            await UserService.approveExpenseById(expenseId, token);
        }
    }
            catch(error){
            console.log("error in approving expense");
        }
    }

     const handleReject=async(expenseId)=>{
        try{
        const confirmReject=window.confirm("Are you sure you want to reject the selected record?");
        if(confirmReject){
            const token=localStorage.getItem('token');
            await UserService.rejectExpenseById(expenseId, token);
        }
    }
            catch(error){
            console.log("error in rejecting expense");
        }
    }

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
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            allEmpExpDetails.map((details)=>{
                                return <TableRow key={details.expenseId}>
                                    <TableCell>{details.empId}</TableCell>
                                    <TableCell>{details.ExpRequestId}</TableCell>
                                    <TableCell>{details.empName}</TableCell>
                                    <TableCell>{details.type}</TableCell>
                                    <TableCell>{details.exp_date}</TableCell>
                                    <TableCell>{details.Amount}</TableCell>
                                    <TableCell>{details.description}</TableCell>
                                    <TableCell><IconButton onClick={()=>handleApprove(details.expenseId)}><CheckCircleOutlineIcon color='primary'></CheckCircleOutlineIcon></IconButton>
                                <IconButton onClick={()=>handleReject(details.expenseId)}><CancelOutlinedIcon color='primary'></CancelOutlinedIcon></IconButton>
                            <   IconButton onClick={()=>handleView(details.expenseId)}><VisibilityIcon color='primary'></VisibilityIcon></IconButton></TableCell>
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

export default AllExpenses;