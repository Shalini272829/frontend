import React, { useState,useEffect } from 'react'
import Button from '@mui/material/Button'
import { TableContainer,Table, TableHead,TableBody,TableRow,TableCell,Paper, Icon, IconButton } from '@mui/material';
import '../Service/style.css'
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useNavigate, Link } from 'react-router-dom'
import UserService from '../Service/UserService';

function AllExpenses(){
    const [allEmpDetails, setAllEmpDetails]=useState([])
    const navigate=useNavigate();
    useEffect(()=>{
        axios.get("http://localhost:3000/employeeDetails")
        .then(res=>setAllEmpDetails(res.data))
        .catch(err=>console.log(err))
    },[])

    const handleCreate=async=>{
        navigate("/createEmployee");
    }

    return(
        <>
        <div className='tablecontainer'>
                <TableContainer component={Paper} sx={{height:400}}>
                <Table aria-label='simple_table'>
                    <TableHead className='tablehead' variant="contained">
                        <TableRow>
                            <TableCell>Employee Id</TableCell>
                            <TableCell>Employee Name</TableCell>
                            <TableCell>Email Id</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Employee Status</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            allEmpDetails.map((details)=>{
                                return <TableRow key={details.expenseId}>
                                    <TableCell>{details.empId}</TableCell>
                                    <TableCell>{details.empName}</TableCell>
                                    <TableCell>{details.emailId}</TableCell>
                                    <TableCell>{details.username}</TableCell>
                                    <TableCell>{details.employeeStatus}</TableCell>
                                    <TableCell>{details.role}</TableCell>
                                    <TableCell><IconButton onClick={()=>handleEdit(details.expenseId)}><EditIcon color='primary'></EditIcon></IconButton>
                        <IconButton onClick={()=>handleDelete(details.expenseId)}><DeleteIcon color='primary'></DeleteIcon></IconButton>
                            <   IconButton onClick={()=>handleView(details.expenseId)}><VisibilityIcon color='primary'></VisibilityIcon></IconButton></TableCell>
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table>
                </TableContainer>
                </div>
                <Button variant="outlined" onClick={handleCreate} startIcon={<AddCircleIcon color="primary" ></AddCircleIcon>}>Create Employee</Button>
        </>
    )
}

export default AllExpenses;