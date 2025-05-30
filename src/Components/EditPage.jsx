import React, { useState,useEffect } from 'react'
import Button from '@mui/material/Button'
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../Service/UserService";
import axios from 'axios';

function EditPage(){
    const navigate=useNavigate();
    const {expRequestId}=useParams();
    const [expenseData,setExpenseData]=useState({
    });

    const [expenses,setExpenses]=useState([]);

    useEffect(()=>{
        fetchExpenseDataByExpenseId(expRequestId)
    },[expRequestId]);

    const fetchExpenseDataByExpenseId=async(expRequestId)=>{
        const token=localStorage.getItem('token');
        const expenseId=expRequestId;
        try{
            axios.get(`http://localhost:8091/employee/get/expenserequest`,
                {
                    params:{expRequestId:expRequestId},
                },
                {
                    headers:{Authorization:`Bearer ${token}`}
                }
            ).then((response)=>{
                setExpenseData(response.data)
            })
            console.log(expenseData)
            ;      
        }

        catch(error){
            console.log(error);
        }
    }

    const handleInputChange=async(e)=>{
     const {name,value}=e.target;
     setExpenseData((prevExpenseData)=>({
        ...prevExpenseData,
        [name]:value
     }));
    };

    const handleSubmitChanges=async(e)=>{
        e.preventDefault();
        try{
            const confirmChange=window.confirm("Are you sure you want to make change to this expense report?");
            if(confirmChange){
                const token=localStorage.getItem('token');
                const response= await UserService.editExpenseDataById(expenseID, expenseData, token);
                console.log(response);
                navigate("/employeePage");
            }
        }
        catch(error){
            console.log(error);
        }
    }

    return(
        <>
        <div>
            <h3>Edit Expense Data</h3>
        </div>
        <form onSubmit={handleSubmitChanges}>
            <div className="divi1">
                <label className='label'>Employee Id</label>
                <input type='number' name="employeeId" value={expenseData.empId} onChange={handleInputChange}/>
            </div>
            <div className="divi1">
                <label className='label'>Expense Id</label>
                <input type='number' name="expenseId" value={expenseData.expRequestId} onChange={handleInputChange}/>
            </div>
             <div className="divi1">
                <label className='label'>Employee Name</label>
                <input type='text' name="employeeName" value={expenseData.empName} onChange={handleInputChange}/>
            </div>
          <div className="divi1">
                <label className='label'>Expense Type</label>
                <input type='text' name="expenseType" value={expenseData.type} onChange={handleInputChange}/>
            </div>
            <div className='divi1'>
            <label className='label'>Expense Amount</label>
            <input type="number" namee="expenseAmount" value={expenseData.amount} onChange={handleInputChange}/>
            </div>
             <div className='divi1'>
            <label className='label'>Expense Date</label>
            <input type="date" name="expenseDate" value={expenseData.exp_Date} onChange={handleInputChange}/>
            </div>
            <div className='divi1'>
            <label className='label'>Description</label>
            <input type="textarea" name="description" value={expenseData.description} onChange={handleInputChange}/>
            </div>
            <div className='divi1'>
            <label className='label'>Amount proof</label>
            <input type="file" name="proof" value={expenseData.proof} onChange={handleInputChange}/>
            </div>
            <Button variant="contained" className="button">Submt Changes</Button>
        </form>
        </>
    )

}

export default EditPage;