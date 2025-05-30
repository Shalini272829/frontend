import Button from "@mui/material/Button";
import React, { useState } from "react"
import '../Service/style.css'
import UserService from "../Service/UserService";

function RegisterExpense(){

    const [registerData,setRegisterData]=useState({
        employeeId:'',
        employeeName:'',
        expenseType:'',
        expenseAmount:'',
        expenseDate:'',
        description:'',
        proof:''
    });

    const handleInputChange=(e)=>{
        const {name,value}=e.target;
        setRegisterData({...registerData,[name]:value});
    }

    const handleRegister=async(e)=>{
        e.preventDefault();
        try{
            const token=localStorage.getItem('token');
            await UserService.postExpense(registerData,token);
            setRegisterData({
                employeeId:'',
                employeeName:'',
                expenseType:'',
                expenseAmount:'',
                expenseDate:'',
                description:'',
                proof:''
            });
            alert("Expense created successfully");
        }
        catch(error){
            console.log(error);
            alert("error occured while creating the expenses");
        }

    }

    
    return(
        <>
          <div className="container">
                      <div className="heading">
                      <h1>Create Expense record</h1>
                      </div>
                      <div>
                      <form onSubmit={handleRegister}>
                        <div className="divi1">
                            <label className="label">Employee Id</label>
                            <input type="number" name="employeeId" value={registerData.employeeId} onChange={handleInputChange} required/> 
                        </div>
                          <div className="divi1">
                            <label className="label">Employee Name</label>
                            <input type="text" name="employeeName" value={registerData.employeeName} onChange={handleInputChange} required/> 
                        </div>
                          <div className='divi1'>
                          <label className='label'>Expense Type</label>
                          <select onChange={handleInputChange}>
                            <option name="expenseType" value={registerData.expenseType}>Business Travel</option>
                            <option name="expenseType" value={registerData.expenseType}>Business Food</option>
                            <option name="expenseType" value={registerData.expenseType}>Business Stay</option>
                            <option name="expenseType" value={registerData.expenseType}>Others</option>
                          </select>
                          </div>
                          <div className='divi1'>
                          <label className='label'>Expense Amount</label>
                          <input type="number" name="expenseAmount" value={registerData.expenseAmount} onChange={handleInputChange} required/>
                          </div>
                          <div className='divi1'>
                          <label className='label'>Expense date</label>
                          <input type="date" name="expenseDate" value={registerData.expenseDate} onChange={handleInputChange} required/>
                          </div>
                          <div className='divi1'>
                          <label className='label'>Description</label>
                          <input type="textarea" name="description" value={registerData.description} onChange={handleInputChange} required/>
                          </div>
                          <div className='divi1'>
                          <label className='label'>Amount proof</label>
                          <input type="file" name="proof" value={registerData.proof} onChange={handleInputChange} required/>
                          </div>
                          <Button variant="contained" color="secondary"className="button">Create</Button>
                      </form>
                      </div>
                  </div>

        </>
    );
}

export default RegisterExpense;