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
    const [reason,setReason]=useState('')
    const isAdmin = UserService.isAdmin();
    const isManager=UserService.isManager();
    const navigate=useNavigate();
    useEffect(()=>{
        const empId=localStorage.getItem('employeeId')
        const token=localStorage.getItem('token');
        if(isManager){
        axios.get(`http://localhost:8091/manager/get/pending/expenserequests/${empId}`,
            {
                 headers:{Authorization:`Bearer ${token}`}
            }
        )
        .then(res=>setAllEmpExpDetails(res.data))
        .catch(err=>console.log(err))
    }
    if(isAdmin){
      axios.get(`http://localhost:8091/admin/get/pending/expenserequests/${empId}`,
            {
                 headers:{Authorization:`Bearer ${token}`}
            }
        )
        .then(res=>setAllEmpExpDetails(res.data))
        .catch(err=>console.log(err))   
    }
    },[])

    const handleExcel=async()=>{
        axios.get()
    }
    const handleApprove=(expRequestId)=>{
        console.log(expRequestId);
        try{
        const confirmApprove=window.confirm("Are you sure you want to approve the selected record?");
        if(confirmApprove && isManager){
            const token=localStorage.getItem('token');
            axios.put(`http://localhost:8091/manager/editstatus/approve/expenserequests/${expRequestId}`,{},
            {
                 headers:{Authorization:`Bearer ${token}`}
            }
        ).then(response=>console.log(response.data))
            .catch(err=>console.log(err))
            alert("The expense request is approved and is pending with admin")
        }
         if(confirmApprove && isAdmin){
            const token=localStorage.getItem('token');
            axios.put(`http://localhost:8091/admin/editStatus/approve/expenserequests/${expRequestId}`,{},
            {
                 headers:{Authorization:`Bearer ${token}`}
            }
        ).then(response=>console.log(response.data))
            .catch(err=>console.log(err))
            alert("The expense request is approved by admin")
        }
        

    }
            catch(error){
            console.log(error);
        }
    }

     const handleReject=async(expenseId)=>{
        try{
        const confirmReject=window.confirm("Are you sure you want to reject the selected record?");
        // const userreason= window.prompt("Please give Reason for rejection");
        // if(userreason){
        //     setReason(userreason);
        // }
        // console.log(reason);
        if(confirmReject && isManager){
            const token=localStorage.getItem('token');
            axios.put(`http://localhost:8091/manager/editstatus/reject/expenserequests/${expenseId}`,{},
                {
                     headers:{Authorization:`Bearer ${token}`},
                }
            ).then(response=>{console.log(response.data)})
            .catch(err=>console.log(err))
            alert("The expense request is rejected and is pending with admin");
        }
         if(confirmReject && isAdmin){
            const token=localStorage.getItem('token');
            axios.put(`http://localhost:8091/admin/editStatus/reject/expenserequests/${expenseId}`,{},
                {
                     headers:{Authorization:`Bearer ${token}`},
                }
            ).then(response=>{console.log(response.data)})
            .catch(err=>console.log(err))
            alert("The expense request is rejected by admin");
        }
    }
            catch(error){
            console.log("error in rejecting expense");
        }
    }

    const handleView=async(expenseId)=>{
    localStorage.setItem('expRequestId',expenseId)
    navigate(`/viewPage`);
}

    return(
        <>
        <div className='tablecontainer'>
                <TableContainer component={Paper}  sx={{height:500, width:1800}}>
                <Table aria-label='simple_table'>
                    <TableHead className='tablehead' variant="contained" stickyHeader>
                        <TableRow>
                            <TableCell>Employee Id</TableCell>
                            <TableCell>Expense Id</TableCell>
                            <TableCell>Employee Name</TableCell>
                            <TableCell>Expense Type</TableCell>
                            <TableCell>Expense Date</TableCell>
                            <TableCell>Expense Amount</TableCell>
                            <TableCell>Submission date</TableCell>
                            <TableCell>Description</TableCell>
                             <TableCell>Manager status</TableCell>
                            <TableCell>Admin status</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            allEmpExpDetails.map((details)=>{
                                return <TableRow key={details.expRequestId}>
                                    <TableCell>{details.empId}</TableCell>
                                    <TableCell>{details.expRequestId}</TableCell>
                                    <TableCell>{details.empName}</TableCell>
                                    <TableCell>{details.type}</TableCell>
                                    <TableCell>{details.exp_date}</TableCell>
                                    <TableCell>{details.amount}</TableCell>
                                    <TableCell>{details.submissionDate}</TableCell>
                                    <TableCell>{details.description}</TableCell>
                                    <TableCell>{details.manager_status}</TableCell>
                                    <TableCell>{details.admin_status}</TableCell>
                                    <TableCell>{details.status}</TableCell>
                                    <TableCell><IconButton onClick={()=>handleApprove(details.expRequestId)}><CheckCircleOutlineIcon color='primary'></CheckCircleOutlineIcon></IconButton>
                                <IconButton onClick={()=>handleReject(details.expRequestId)}><CancelOutlinedIcon color='primary'></CancelOutlinedIcon></IconButton>
                            <   IconButton onClick={()=>handleView(details.expRequestId)}><VisibilityIcon color='primary'></VisibilityIcon></IconButton></TableCell>
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table>
                </TableContainer>
                <Button onClick={handleExcel}>Download Excel</Button>
                </div>
        </>
    )
}

export default AllExpenses;