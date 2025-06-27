import React, { useState,useEffect } from 'react'
import Button from '@mui/material/Button'
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../Service/UserService";
import axios from 'axios';

function EditEmployee(){
    const navigate=useNavigate();
    const tempEmpId=localStorage.getItem('tempEmpId');
    const [empData,setEmpData]=useState({
        employeeId:'',
        username:'',
        empName:'',
        emailID:'',
        role:'',
        managerEmpId:'',
        adminEmpId:''
    });

    useEffect(()=>{
            const tempEmpId=localStorage.getItem('tempEmpId');
            fetchEmpDataByEmpId();  
    },[tempEmpId]);

 const fetchEmpDataByEmpId=async()=>{
        const token=localStorage.getItem('token');
        const tempEmpId=localStorage.getItem('tempEmpId');
        console.log(tempEmpId);
        try{
            axios.get(`http://localhost:8091/employee/get/details/${tempEmpId}`,
                {
                    headers:{Authorization:`Bearer ${token}`}
                }
            ).then(res=>{setEmpData(res.data)})
                // setEmpData({
                //     employeeId:response.employeeId,
                //     username:response.username,
                //     empName:response.empName,
                //     emailID:response.emailID,
                //     role:response.role,
                //     managerEmpId:response.managerEmpId,
                //     adminEmpId:response.adminEmpId
                // })
                // console.log(empData);
 
        }
        catch(error){
            console.log(error);
        }
       }
    const handleInputChange=async(e)=>{
     const {name,value}=e.target;
     setEmpData((prevEmpData)=>({
        ...prevEmpData,
        [name]:value
     }));
    };

    const handleSubmitChanges=async(e)=>{
        e.preventDefault();
        try{
            const confirmChange=window.confirm("Are you sure you want to make change to this employee record?");
            if(confirmChange){
                const token=localStorage.getItem('token');
                const tempEmpId=localStorage.getItem('tempEmpId');
                  try{
                        axios.put(`http://localhost:8091/admin/edit/employee/${tempEmpId}`,empData,
                            {
                                headers:{Authorization:`Bearer ${token}`}
                            }
                        ).then((response)=>{console.log(response)
                        })   
                        alert("Changes saved successfully");
                        navigate("/AllEmployees");
                    }

                catch(error){
                    console.log(error);
                }
                // const response= await UserService.editExpenseDataById(expenseID, expenseData, token);
                // console.log(response);
            }
        }
        catch(error){
            console.log(error);
        }
    }

    return(
        <>
        <div>
            <h3>Edit Employee Data</h3>
        </div>
        <form onSubmit={handleSubmitChanges}>
            <div className="divi1">
                <label className='label'>Employee Id</label>
                <input type='number' name="employeeId" value={empData.employeeId} onChange={handleInputChange}/>
            </div>
             <div className="divi1">
                <label className='label'>Employee Name</label>
                <input type='text' name="empName" value={empData.empName} onChange={handleInputChange}/>
            </div>
          <div className="divi1">
                <label className='label'>Email Id</label>
                <input type='email' name="emailID" value={empData.emailID} onChange={handleInputChange}/>
            </div>
            <div className='divi1'>
            <label className='label'>Username</label>
            <input type="text" name="username" value={empData.username} onChange={handleInputChange}/>
            </div>
             <div className='divi1'>
            <label className='label'>Role</label>
            <input type="text" name="role" value={empData.role} onChange={handleInputChange}/>
            </div>
            <div className='divi1'>
            <label className='label'>Manager Employee Id</label>
            <input type="number" name="managerEmpId" value={empData.managerEmpId} onChange={handleInputChange}/>
            </div>
            <div className='divi1'>
            <label className='label'>Admin Employee Id</label>
            <input type="number" name="adminEmpId" value={empData.adminEmpId} onChange={handleInputChange}/>
            </div>
            <Button variant="contained" className="button"onClick={handleSubmitChanges}>Submit Changes</Button>
        </form>
        </>
    )

}

export default EditEmployee;