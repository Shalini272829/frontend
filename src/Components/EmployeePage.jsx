import React, { useState,useEffect } from 'react'
import Button from '@mui/material/Button'
import { TableContainer,Table, TableHead,TableBody,TableRow,TableCell,Paper, Icon, IconButton } from '@mui/material';
import '../Service/style.css'
import axios from 'axios';
import Nav from './Nav';
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useNavigate, useParams,Link } from 'react-router-dom'
import UserService from '../Service/UserService';


function EmployeePage(){
    const {employeeId}=useParams();
    const [empDetails, setEmpDetails]=useState([])
    const navigate=useNavigate();
    useEffect(()=>{
        try{
            const token=localStorage.getItem('token');
            const role=localStorage.getItem('role');
            const employeeId=localStorage.getItem('employeeId');
            console.log(token);
            console.log(role);
            console.log(employeeId);
            axios.get(`http://localhost:8091/employee/getallExpense/${employeeId}`,
                {
                    headers:{Authorization:`Bearer ${token}`}
                }
            ).then((response)=>{
                setEmpDetails(response.data)
            });

            console.log(empDetails)
        }
        catch(error){
            console.log(error);
        }
    },[])

    const handleClick=async()=>{
        navigate("/registerExpense");
    }

    const handleEdit=async(expRequestId)=>{
        navigate(`/editPage/${expRequestId}`);
    }
    const handleView=async(expenseId)=>{
    navigate(`/viewPage/${expenseId}`);
}
    


    const handleDelete=async(expenseId)=>{
        try{
            const confirmDelete=window.confirm("Are you sure you want to delete the expense?");
            if(confirmDelete){
                const token=localStorage.getItem('token');
                await UserService.deleteExpenseById(expenseId, token);

            }
        }
        catch(error){
            console.log("error in deleting expense");
        }
    }
    return(
        <>
        <div>
             <Nav/>
        </div>
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
                    <TableCell>Submission date</TableCell>
                    <TableCell>Approved date</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    empDetails.map((details)=>{
                        return <TableRow key={details.expenseId}>
                            <TableCell>{details.empId}</TableCell>
                            <TableCell>{details.expRequestId}</TableCell>
                            <TableCell>{details.empName}</TableCell>
                            <TableCell>{details.type}</TableCell>
                            <TableCell>{details.exp_date}</TableCell>
                            <TableCell>{details.amount}</TableCell>
                            <TableCell>{details.description}</TableCell>
                            <TableCell>{details.status}</TableCell>
                            <TableCell>{details.submissionDate}</TableCell>
                            <TableCell>{details.approvedDate}</TableCell>
                            <TableCell><IconButton onClick={()=>handleEdit(details.expRequestId)}><EditIcon color='primary'></EditIcon></IconButton>
                        <IconButton onClick={()=>handleDelete(details.expRequestId)}><DeleteIcon color='primary'></DeleteIcon></IconButton>
                    <   IconButton onClick={()=>handleView(details.expRquestId)}><VisibilityIcon color='primary'></VisibilityIcon></IconButton></TableCell>
                        </TableRow>
                    })
                }
            </TableBody>
        </Table>
        </TableContainer>
        </div>
        </>
    );
}

export default EmployeePage;
