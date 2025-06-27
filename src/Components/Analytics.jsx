import React, { useState,useEffect } from "react";
import {Chart as ChartJS} from "chart.js/auto";
import {Bar, Doughnut, Line} from "react-chartjs-2";
import axios from 'axios';
import '../Service/style.css'
import CanvasJSReact from '@canvasjs/react-charts';
import { TableContainer,Table, TableHead,TableBody,TableRow,TableCell,Paper, Icon, IconButton } from '@mui/material';


function Analytics(){

    const CanvasJSChart = CanvasJSReact.CanvasJSChart;
    const [approvalData,setApprovalData]=useState([]);
    const [expenseCategories, setExpenseCategories]=useState([]);
    const [monthlyData, setMonthlyData]=useState([])
    const [yearlyData, setYearlyData]=useState([])
    const [topExpenses,setTopExpenses]=useState([])

    useEffect(()=>{
        const token=localStorage.getItem('token')
        const empId=localStorage.getItem('employeeId')
        axios.get(`http://localhost:8091/employee/approvalanalytics/${empId}`,
            {
                    headers:{Authorization:`Bearer ${token}`}
                }
        ).then(response=>{setApprovalData(response.data)});

        axios.get(`http://localhost:8091/employee/categoryanalytics/${empId}`,
           {
                    headers:{Authorization:`Bearer ${token}`}
                } )
        .then(response=>{setExpenseCategories(response.data)})

         axios.get(`http://localhost:8091/employee/monthlyanalytics/${empId}/2025`,
            {
                    headers:{Authorization:`Bearer ${token}`}
            }
         )
        .then(response=>{setMonthlyData(response.data)})

         axios.get(`http://localhost:8091/employee/topexpenses/${empId}`,
            {
                    headers:{Authorization:`Bearer ${token}`}
            }
         )
        .then(response=>{setTopExpenses(response.data)})
     
    },[])

    return(
        <>
        <div className="left_cont">
        <div>
        <h1>Approval analysis</h1>

        <div className="box1"> 
            <Doughnut data={{
                labels:approvalData.map((data)=>data.label),
                datasets:[
                    {
                        label:"Count",
                        data:approvalData.map((data)=>data.value),
                        backgroundColor:[
                           " rgb(35, 170, 35)",
                            "rgb(216, 27, 27)",
                            "rgb(236, 122, 29)",
                            "rgb(27, 93, 216)"
                        ],
                        borderRadius:1,
                    },
                ],

            }}
            />
        </div>
        <h4>Expense by categories</h4>
        <div className="box2">
<           Doughnut data={{
                labels:expenseCategories.map((data)=>data.label),
                datasets:[
                    {
                        label:"Count",
                        data:expenseCategories.map((data)=>data.value),
                        backgroundColor:[
                           " rgb(170, 77, 134)",
                            "rgb(182, 9, 32)",
                            "rgb(6, 80, 12)",
                            "rgb(91, 129, 199)"
                        ],
                        borderRadius:1,
                    },
                ],

            }}
            />
        </div>
        </div>
  <h4>Monthly Analysis</h4>
         <div className="bar_container">
            <Bar data={{
                labels:monthlyData.map((data)=>data.label),
                datasets:[
                    {
                        label:"Count",
                        data:monthlyData.map((data)=>data.value),
                        backgroundColor:[
                           " rgb(170, 77, 134)",
                            "rgb(182, 9, 32)",
                            "rgb(6, 80, 12)",
                            "rgb(91, 129, 199)"
                        ],
                        borderRadius:2,
                    },
                ],

            }}
            width={400} height={300}
            />
        </div>
        </div>

         {/* <div className="bar_container">
            <CanvasJSChart options={{animationEnabled:true,
        title:{
            text:"Yearly report"
        },
        data:[
            {
                type:"spline",
                dataPoints:
                [
                    // {x:2020,y:5000},
                    // {x:2021,y:4000},
                    // {x:2022,y:300},
                    // {x:2023,y:6000},
                    // {x:2024,y:5600},
                    // {x:2025,y:10000}
                    dp
                ]
            }
        ]
    }}
            />
        </div> */}
        <div className="right_cont">
        <div className="topexp">
            <h1>Top Expenses by amount</h1>
            <TableContainer component={Paper} sx={{height:400, width:500}}>
        <Table size="large" aria-label='a dense table'  >
            <TableHead className='tablehead' variant="contained" stickyHeader>
                <TableRow >
                    <TableCell>Expense Id</TableCell>
                    <TableCell>Expense Type</TableCell>
                    <TableCell>Expense Amount($)</TableCell>
                    <TableCell>Reimbursement Amount($)</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    topExpenses.map((details)=>{
                        return <TableRow>
                            <TableCell>{details.expRequestId}</TableCell>
                            <TableCell>{details.type}</TableCell>
                            <TableCell>{details.amount}</TableCell>
                            <TableCell>{details.reimbursement_amt}</TableCell>
                        </TableRow>
                    })
                }
            </TableBody>
        </Table>
        </TableContainer>

        </div>
        </div>
        </>
    )
}

export default Analytics;