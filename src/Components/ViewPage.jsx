import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../Service/UserService";
import { Button } from '@mui/material';
import axios from 'axios';

function ViewPage(){
    const navigate=useNavigate();
    const [expenseData, setExpenseData]=useState({});

    useEffect(()=>{
        fetchExpenseDataById()
    },[]);

    const fetchExpenseDataById=async(expenseID)=>{
        const token=localStorage.getItem('token');
       const expenseId=localStorage.getItem('expRequestId');
            try{
                axios.get(`http://localhost:8091/employee/get/expenserequest/${expenseId}`,
                {
                    headers:{Authorization:`Bearer ${token}`}
                }
            ).then((response)=>{
                setExpenseData(response.data)
            })  
            }
        
        catch(error){
            console.log(error);
        }
    }
    return(
        <>
        <div>
            <h3>Expense Data information</h3>
        </div>
        <p>Employee ID:{expenseData.empId}</p>
        <p>Employee Name:{expenseData.empName}</p>
        <p>Expense ID:{expenseData.expRequestId}</p>
        <p>Expense Type:{expenseData.type}</p>
        <p>Expense Date:{expenseData.exp_date}</p>
        <p>Expense Amount:{expenseData.amount}</p>
        <p>Description:{expenseData.description}</p>
        <p>Status:{expenseData.status}</p>
        <p>Submission Date:{expenseData.submissionDate}</p>
        <p>Approved Date:{expenseData.approvedDate}</p>
        {/* <button><Link to={"/employeePage"}></Link>Back</button> */}
        </>
    )
}

export default ViewPage;