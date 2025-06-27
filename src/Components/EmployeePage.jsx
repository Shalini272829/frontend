import React, { useState,useEffect } from 'react'
import Button from '@mui/material/Button'
import { TableContainer,Table, TableHead,TableBody,TableRow,TableCell,Paper, Icon, IconButton } from '@mui/material';
import '../Service/style.css'
import axios from 'axios';
import Nav from './Nav';
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline'
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
        localStorage.setItem('expRequestId',expRequestId);
        navigate(`/editPage/${expRequestId}`);
    }
    const handleView=async(expenseId)=>{
        localStorage.setItem('expRequestId',expenseId);
        navigate(`/viewPage`);
    }
    const handleFile=async(expRequestId)=>{
        // const filename="images.png"
       await axios.get(`http://localhost:8091/public/filedownload/${expRequestId}`,
            {responseType:'blob'}
        ).then((obj)=>{console.log(obj.data)
        const url=window.URL.createObjectURL(obj.data);
        const link=document.createElement('a');
        link.href=url;
        link.setAttribute('download',"invoicebill.png");
        link.setAttribute('target','__blank');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        })  
    }

    


    const handleDelete=async(expenseId)=>{
        try{
            const confirmDelete=window.confirm("Are you sure you want to delete the expense?");
            if(confirmDelete){
                const token=localStorage.getItem('token');
                axios.delete(`http://localhost:8091/employee/delete/expenserequest/${expenseId}`,
                       {
                             headers:{Authorization:`Bearer ${token}`}
                        }
                ).then(response=>{console.log(response)});
                alert("Expense record deleted");
            navigate("/employeePage");

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
        <TableContainer component={Paper} sx={{height:500, width:1500}}>
        <Table size="large" aria-label='a dense table'  >
            <TableHead className='tablehead' variant="contained" stickyHeader>
                <TableRow >
                    <TableCell>Employee Id</TableCell>
                    <TableCell>Expense Id</TableCell>
                    <TableCell>Employee Name</TableCell>
                    <TableCell>Expense Type</TableCell>
                    <TableCell>Expense Date</TableCell>
                    <TableCell>Expense Amount($)</TableCell>
                    <TableCell>Reimbursement Amount($)</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Manager Status</TableCell>
                    <TableCell>Admin Status</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Submission date</TableCell>
                    <TableCell>Approved date</TableCell>
                    <TableCell sx={{width:'100%'}}>Actions</TableCell>
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
                            <TableCell>{details.reimbursement_amt}</TableCell>
                            <TableCell>{details.description}</TableCell>
                            <TableCell>{details.manager_status}</TableCell>
                            <TableCell>{details.admin_status}</TableCell>
                            <TableCell>{details.status}</TableCell>
                            <TableCell>{details.submissionDate}</TableCell>
                            <TableCell>{details.approvedDate}</TableCell>
                            <TableCell><IconButton disabled={details.status==="Approved"|| details.status==="AutoApproved"} onClick={()=>handleEdit(details.expRequestId)}><EditIcon color='primary'></EditIcon></IconButton>
                        <IconButton onClick={()=>handleDelete(details.expRequestId)}><DeleteIcon color='primary'></DeleteIcon></IconButton>
                    <   IconButton onClick={()=>handleView(details.expRequestId)}><VisibilityIcon color='primary'></VisibilityIcon></IconButton>
                    <   IconButton onClick={()=>handleFile(details.expRequestId)}><DownloadForOfflineIcon color='primary'></DownloadForOfflineIcon></IconButton>
                    </TableCell>
                        </TableRow>
                    })
                }
            </TableBody>
        </Table>
        </TableContainer>

        </div>
        {/* <div>
            <Button variant="contained" color="primary">Analytics</Button>
        </div> */}

        </>
    );
}

export default EmployeePage;
