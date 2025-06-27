import React, { useState,useEffect } from 'react'
import Button from '@mui/material/Button'
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../Service/UserService";
import axios from 'axios';

function EditPage(){
    const navigate=useNavigate();
    const expenseId=localStorage.getItem('expRequestId');
    const [expenseData,setExpenseData]=useState({
        type:'',
        desciption:'',
        exp_date:'',
        empId:'',
        empName:'',
        status:'',
        managerEmpId:'',
        adminEmpId:'',
        manager_status:'',
        admin_status:'',
        approvedDate:'',
        cutoffDate:'',
        amount:'',
        expRequestId:''
    });
    // const [expenses,setExpenses]=useState([]);

    useEffect(()=>{
        fetchExpenseDataByExpenseId()
    },[expenseId]);

    const fetchExpenseDataByExpenseId=async()=>{
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
            // alert("Changes saved successfully");
            // navigate("employeePage"); 
        }

        catch(error){
            console.log(error);
        }
    }

    const handleInputChange=(e)=>{
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
                const expenseId=localStorage.getItem('expRequestId');
                  try{
                        axios.put(`http://localhost:8091/employee/edit/expenserequest/${expenseId}`,expenseData,
                            {
                                headers:{Authorization:`Bearer ${token}`}
                            }
                        ).then((response)=>{console.log(response)
                        })  
                        alert("Changes saved successfully"); 
                        navigate("/employeePage");
                    }

                catch(error){
                    console.log(error);
                }
                // const response= await UserService.editExpenseDataById(expenseID, expenseData, token);
                // console.log(response);
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
                <input type='number' name="empId" value={expenseData.empId} onChange={handleInputChange}/>
            </div>
            <div className="divi1">
                <label className='label'>Expense Id</label>
                <input type='number' name="expRequestId" value={expenseData.expRequestId} onChange={handleInputChange}/>
            </div>
             <div className="divi1">
                <label className='label'>Employee Name</label>
                <input type='text' name="empName" value={expenseData.empName} onChange={handleInputChange}/>
            </div>
          <div className="divi1">
                <label className='label'>Expense Type</label>
                <input type='text' name="type" value={expenseData.type} onChange={handleInputChange}/>
            </div>
            <div className='divi1'>
            <label className='label'>Expense Amount</label>
            <input type="number" name="amount" value={expenseData.amount} onChange={handleInputChange}/>
            </div>
             <div className='divi1'>
            <label className='label'>Expense Date</label>
            <input type="date" name="exp_date" value={expenseData.exp_date} onChange={handleInputChange}/>
            </div>
            <div className='divi1'>
            <label className='label'>Description</label>
            <input type="textarea" name="description" value={expenseData.description} onChange={handleInputChange}/>
            </div>
            <div className='divi1'>
            <label className='label'>Amount proof</label>
            <input type="file" name="proof" value={expenseData.proof} onChange={handleInputChange}/>
            </div>
            <Button variant="contained" className="button"onClick={handleSubmitChanges}>Submit Changes</Button>
        </form>
        </>
    )

}

export default EditPage;