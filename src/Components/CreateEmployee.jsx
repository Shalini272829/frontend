import Button from "@mui/material/Button";
import React, { useState } from "react"
import '../Service/style.css'
import UserService from "../Service/UserService";
import axios from 'axios';

function CreateEmployee(){

    const [registerData,setRegisterData]=useState({
        employeeId:'',
        empName:'',
        emailID:'',
        username:'',
        employeeStatus:'',
        role:'',
        managerEmpId:'',
        adminEmpId:''
    });

    const handleInputChange=(e)=>{
        const {name,value}=e.target;
        setRegisterData({...registerData,[name]:value});
    }

    const handleRegister=async(e)=>{
        e.preventDefault();
        try{
            const token=localStorage.getItem('token');
            axios.post(`http://localhost:8091/admin/add/employee`,registerData,
                {
                     headers:{Authorization:`Bearer ${token}`}
                }
            )
            setRegisterData({
                employeeId:'',
                empName:'',
                emailID:'',
                username:'',
                employeeStatus:'',
                role:'',
                managerEmpId:'',
                adminEmpId:''
            });
            alert("Employee created successfully");
            Navigate("/employeePage")
        }
        catch(error){
            console.log(error);
            // alert("error occured while creating the employee");
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
                            <input type="text" name="empName" value={registerData.employeeName} onChange={handleInputChange} required/> 
                        </div>
                          <div className='divi1'>
                          <label className='label'>Email Id</label>
                          <input type="email" name="emailID" value={registerData.emailId} onChange={handleInputChange} required/> 

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
                          <div className='divi1'>
                          <label className='label'>Manager Employee Id</label>
                          <input type="text" name="managerEmpId" value={registerData.managerEmpId} onChange={handleInputChange} required/>
                          </div>
                          <div className='divi1'>
                          <label className='label'>Admin Employee Id</label>
                          <input type="text" name="adminEmpId" value={registerData.adminEmpId} onChange={handleInputChange} required/>
                          </div>
                          
                          <Button variant="contained" color="secondary"className="button"onClick={handleRegister}>Create</Button>
                      </form>
                      </div>
                  </div>

        </>
    );
}

export default CreateEmployee;