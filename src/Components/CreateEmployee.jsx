import Button from "@mui/material/Button";
import React, { useState } from "react"
import '../Service/style.css'
import UserService from "../Service/UserService";

function CreateEmployee(){

    const [registerData,setRegisterData]=useState({
        employeeId:'',
        employeeName:'',
        emailId:'',
        username:'',
        employeeStatus:'',
        role:'',
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
                emailId:'',
                username:'',
                employeeStatus:'',
                role:'',
            });
            alert("Employee created successfully");
        }
        catch(error){
            console.log(error);
            alert("error occured while creating the employee");
        }

    }

    
    return(
        <>
          <div className="container">
                      <div className="heading">
                      <h1>Create Employee record</h1>
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
                          <label className='label'>Email Id</label>
                          <input type="email" name="emailId" value={registerData.emailId} onChange={handleInputChange} required/> 

                          </div>
                          <div className='divi1'>
                          <label className='label'>Username</label>
                          <input type="text" name="username" value={registerData.username} onChange={handleInputChange} required/>
                          </div>
                          <div className='divi1'>
                          <label className='label'>Employee Status</label>
                          <input type="text" name="employeeStatus" value={registerData.employeeStatus} onChange={handleInputChange} required/>
                          </div>
                          <div className='divi1'>
                          <label className='label'>Role</label>
                          <input type="text" name="role" value={registerData.role} onChange={handleInputChange} required/>
                          </div>
                          <Button variant="contained" color="secondary"className="button">Create</Button>
                      </form>
                      </div>
                  </div>

        </>
    );
}

export default CreateEmployee;