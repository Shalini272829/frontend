import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../Service/UserService";
import { Button } from '@mui/material';
import axios from 'axios';

function ViewEmployee(){
    const navigate=useNavigate();
    const [empData, setEmpData]=useState({});

    useEffect(()=>{
        fetchEmpDataById()
    },[]);

    const fetchEmpDataById=async(empId)=>{
        const token=localStorage.getItem('token');
       const tempEmpId=localStorage.getItem('tempEmpId');
            try{
                axios.get(`http://localhost:8091/employee/get/details/${tempEmpId}`,
                {
                    headers:{Authorization:`Bearer ${token}`}
                }
            ).then((response)=>{
                setEmpData(response.data)
            })  
            }
        
        catch(error){
            console.log(error);
        }
    }
    return(
        <>
        <div>
            <h3>Employee Data information</h3>
        </div>
        <p>Employee ID: {empData.employeeId}</p>
        <p>Employee Name: {empData.empName}</p>
        <p>Username: {empData.username}</p>
        <p>email ID: {empData.emailID}</p>
        <p>Role: {empData.role} </p>
        <p>Manager Employee Id: {empData.managerEmpId}</p>
        <p>Admin Employee Id: {empData.adminEmpId}</p>
        {/* <button><Link to={"/employeePage"}></Link>Back</button> */}
        </>
    )
}

export default ViewEmployee;