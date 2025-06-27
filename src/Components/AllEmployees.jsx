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
        const token=localStorage.getItem('token');
        axios.get("http://localhost:8091/admin/get/employeeDetails",
            {
                    headers:{Authorization:`Bearer ${token}`}
            }
        )
        .then(res=>setAllEmpDetails(res.data))
        .catch(err=>console.log(err))
    },[])

    const handleEdit=async(employeeId)=>{
        localStorage.setItem('tempEmpId',employeeId);
        navigate("/editEmployee");
    }

     const handleDelete=async(employeeId)=>{
        const confirmDelete=window.confirm("Are you sure you want to delete the selected employee record");
        if(confirmDelete){
            try{
                const token=localStorage.getItem('token')
                axios.delete(`http://localhost:8091/admin/delete/employee/${employeeId}`,
                    {
                         headers:{Authorization:`Bearer ${token}`}
                    }
                ).then(response=>{console.log(response.data)})
                .catch(error=>console.log(error))
                navigate("/editEmployee");
            }
            catch(error){
            console.log(error)}
        }
    }

    const handleView=async(employeeId)=>{
         localStorage.setItem('tempEmpId',employeeId);
        navigate("/viewEmployee");
    }

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
                            <TableCell>Manager Employee Id</TableCell>
                            <TableCell>Admin Employee Id</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            allEmpDetails.map((details)=>{
                                return <TableRow key={details.employeeId}>
                                    <TableCell>{details.employeeId}</TableCell>
                                    <TableCell>{details.empName}</TableCell>
                                    <TableCell>{details.emailID}</TableCell>
                                    <TableCell>{details.username}</TableCell>
                                    <TableCell>{details.employeeStatus}</TableCell>
                                    <TableCell>{details.role}</TableCell>
                                    <TableCell>{details.managerEmpId}</TableCell>
                                    <TableCell>{details.adminEmpId}</TableCell>
                                    <TableCell><IconButton onClick={()=>handleEdit(details.employeeId)}><EditIcon color='primary'></EditIcon></IconButton>
                        <IconButton onClick={()=>handleDelete(details.employeeId)}><DeleteIcon color='primary'></DeleteIcon></IconButton>
                            <   IconButton onClick={()=>handleView(details.employeeId)}><VisibilityIcon color='primary'></VisibilityIcon></IconButton></TableCell>
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