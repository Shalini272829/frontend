import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button'
import '../Service/style.css'

function PasswordReset(){
    const navigate=useNavigate();
    const username=localStorage.getItem('username');
    const [ResetData, setResetData]=useState({
        username:username,
        currentPassword:'',
        newPassword:'',
        password:''
    })

    const handleInputChange=async(e)=>{
     const {name,value}=e.target;
        setResetData({...ResetData,[name]:value});
     };

     const handleResetPassword=async(e)=>{
        const token=localStorage.getItem('token')
        console.log(ResetData)
        // if(newPassword===confirmPassword)
        try{
            axios.put("http://localhost:8091/employee/password/reset",ResetData,
                 {
                     headers:{Authorization:`Bearer ${token}`}
                }).then(response=>alert(response.data));
        }
        catch(error){
            alert("Password mismatch!!");
        }
        navigate("/employeePage");
     }

    return(
        <>
        <div>
            <h3>Password reset</h3>
        </div>
        <div className="divi1">
        <label>Username: </label>
        <input type="text" name="username" value={ResetData.username} disabled></input>
        </div>
        <div className="divi1">
        <label>Current Password: </label>
        <input type="password" placeholder='Enter your current password' name="currentPassword" onChange={handleInputChange}></input>
        </div>
        <div className="divi1">
        <label>New Password: </label>
        <input type="password" placeholder='Enter your new password' name="newPassword" onChange={handleInputChange}></input>
        </div>
        <div className="divi1">
        <label>Confirm Password: </label>
        <input type="password" placeholder='Again enter your new password' name="password"onChange={handleInputChange}></input>
        </div>
        <Button variant="contained" color="primary" onClick={handleResetPassword}>Reset Password</Button>
        </>
    )

}

export default PasswordReset;