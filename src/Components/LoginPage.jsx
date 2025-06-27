import React, { useState } from 'react'
import UserService from '../Service/UserService'
import { useNavigate } from 'react-router-dom'
import '../Service/style.css'
import '../Service/style1.css'

function LoginPage(){

    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState('')

    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const userData=await UserService.login(username,password);
            console.log(userData);
            if(userData.token){
                localStorage.setItem('token',userData.token);
                localStorage.setItem('role',userData.role);
                localStorage.setItem('employeeId',userData.employee.employeeId)
                localStorage.setItem('employeeName',userData.employee.empName)
                localStorage.setItem('managerEmpId',userData.employee.managerEmpId)
                localStorage.setItem('adminEmpId',userData.employee.adminEmpId)
                localStorage.setItem('employeeEmailId',userData.employee.emailID)
                localStorage.setItem('managerEmailId',userData.employee.managerEmailId)
                localStorage.setItem('username',userData.employee.username);
                navigate("/employeePage");
            }
            else{
                setError(userData.message);
                console.log(error)
            }
        }
        catch(error){
            throw error
        }
    }



    return(
        <>
        <div className="bodycont">
        <div className="container">
            <div className="heading">
            <h1>Login</h1>
            </div>
            <div>
            <form onSubmit={handleSubmit}>
                <div className='divi1'>
                <label className='label'>Username</label>
                <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                </div>
                <div className='divi1'>
                <label className='label'>Password</label>
                <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <button>Login</button> 
            </form>
            </div>
        </div>
        </div>
        </>
    )



}

export default LoginPage;

