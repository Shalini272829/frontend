import Button from "@mui/material/Button";
import React, { useState } from "react"
import '../Service/style.css'
import UserService from "../Service/UserService";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function RegisterExpense(){
    const navigate=useNavigate();
    const managerEmpId=localStorage.getItem('managerEmpId');
    const adminEmpId=localStorage.getItem('adminEmpId');
    var savedExpenseId;
    const [file,setFile]=useState(null);
    const handleFileChange=(event)=>{
            const files=event.target.files;
            if(files.length>0){
                setFile(files[0]);
            }
            else{
                setFile(null);
            }
        }
    const [registerData,setRegisterData]=useState({
        empId:'',
        empName:'',
        type:'',
        amount:'',
        exp_date:'',
        description:'',
        managerEmpId:managerEmpId,
        adminEmpId:adminEmpId
    });
    const employeeEmailId=localStorage.getItem('employeeEmailId')
    const managerEmailId=localStorage.getItem('managerEmailId');
    const adminEmailId=localStorage.getItem('adminEmailId');
    const notiData={
       employeeEmailId:employeeEmailId,
       managerEmailId:managerEmailId,
       adminEmailId:adminEmailId
    }
    const handleInputChange=(e)=>{
        const {name,value}=e.target;
        setRegisterData({...registerData,[name]:value});
    }

    const handleRegister=async(e)=>{
        const formData=new FormData();
        formData.append('file',file);
        e.preventDefault();
        try{
            const token=localStorage.getItem('token');
            await axios.post("http://localhost:8091/employee/add/expenserequest",registerData,
            {
                 headers:{Authorization:`Bearer ${token}`,
                }
            }).then((response)=>{savedExpenseId=response.data;
                console.log(savedExpenseId);
                localStorage.setItem('expId',savedExpenseId);
            })
            const expId=localStorage.getItem('expId');
            console.log(expId);
            axios.post(`http://localhost:8091/public/fileupload/${expId}`,formData,
                {
                    headers:{"Content-Type":'multipart/form-data'}
                }
            )
            // .then(response=>response.data)
            // .then(console.log(response))

            axios.post("http://localhost:8091/public/mail/send/employee/add/expense",notiData)
            // .then(response=>console.log(response))  
            .then(alert("Expense record submitted")) 

             
        }
        catch(error){
            console.log(error);
        }
            // navigate("/employeePage");  

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
                            <input type="number" name="empId" value={registerData.empId} onChange={handleInputChange} required/> 
                        </div>
                          <div className="divi1">
                            <label className="label">Employee Name</label>
                            <input type="text" name="empName" value={registerData.empName} onChange={handleInputChange} required/> 
                        </div>
                          <div className='divi1'>
                          <label className='label'>Expense Type</label>
                          <select name="type" onSelect={handleInputChange}>
                            <option value="Business Travel">Business Travel</option>
                            <option value="Business Food">Business Food</option>
                            <option value="Business Stay">Business Stay</option>
                            <option value="Others">Others</option>
                          </select>
                          </div>
                          <div className='divi1'>
                          <label className='label'>Expense Amount</label>
                          <input type="number" name="amount" value={registerData.amount} onChange={handleInputChange} required/>
                          </div>
                          <div className='divi1'>
                          <label className='label'>Expense date</label>
                          <input type="date" name="exp_date" value={registerData.exp_date} onChange={handleInputChange} required/>
                          </div>
                          <div className='divi1'>
                          <label className='label'>Description</label>
                          <input type="textarea" name="description" value={registerData.description} onChange={handleInputChange} required/>
                          </div>
                          <div className='divi1'>
                          <label className='label'>Amount proof</label>
                          <input type="file" onChange={handleFileChange} required/>
                          </div>
                          <Button variant="contained" color="secondary"className="button"onClick={handleRegister}>Create</Button>
                      </form>
                      </div>
                  </div>

        </>
    );
}

export default RegisterExpense;