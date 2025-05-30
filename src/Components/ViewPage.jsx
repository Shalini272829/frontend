import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../Service/UserService";
import { Button } from '@mui/material';
import axios from 'axios';

function ViewPage(){
    const navigate=useNavigate();
    const {expenseID}=useParams();
    const [expenseData, setExpenseData]=useState({
        employeeId:'',
        employeeName:'',
        expenseId:'',
        expenseType:'',
        expenseDate:'',
        expenseAmount:'',
        description:'',
        proof:'',
        status:'',
        submissionDate:'',
        approvedDate:''
    });

    const [expenses,setExpenses]=useState([]);

    useEffect(()=>{
        fetchExpenseDataById(expenseID)
    },[]);

    const fetchExpenseDataById=async(expenseID)=>{
        try{
            await axios.get("http://localhost:3000/myExpenses")
            .then(res=>setExpenses(res.data))
            expenses.map((exp)=>{
                if(exp.expenseId==expenseID){
                    const {employeeId, expenseId, employeeName, expenseType,expenseDate, expenseAmount,description,proof,status,submissionDate,approvedDate}=exp;
                    setExpenseData({employeeId, expenseId, employeeName, expenseType, expenseDate, expenseAmount, description,proof,status,submissionDate,approvedDate});
                }
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
        <p>Employee ID:{expenseData.employeeId}</p>
        <p>Employee Name:{expenseData.employeeName}</p>
        <p>Expense ID:{expenseData.expenseId}</p>
        <p>Expense Type:{expenseData.expenseType}</p>
        <p>Expense Date:{expenseData.expenseDate}</p>
        <p>Expense Amount:{expenseData.expenseAmount}</p>
        <p>Description:{expenseData.description}</p>
        <p>Status:{expenseData.status}</p>
        <p>Submission Date:{expenseData.submissionDate}</p>
        <p>Approved Date:{expenseData.approvedDate}</p>
        {/* <button><Link to={"/employeePage"}></Link>Back</button> */}
        </>
    )
}

export default ViewPage;