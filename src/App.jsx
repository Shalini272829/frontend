// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './Components/LoginPage';
// import Response from './Components/Response';
// import EmployeePage from './Components/EmployeePage';
import RegisterExpense from './Components/RegisterExpense';
import EmployeePage from './Components/EmployeePage';
import Nav from './Components/Nav';
import EditPage from './Components/EditPage';
import ViewPage from './Components/ViewPage';
import AllExpenses from './Components/AllExpenses';
import AllEmployees from './Components/AllEmployees';
import ApprovedExpenses from './Components/ApprovedExpenses';
import RejectedExpenses from './Components/RejectedExpenses';
import CreateEmployee from './Components/CreateEmployee';


function App() {

  return (
    <><BrowserRouter>
       <div className="content">
              {/* <Nav/> */}
         <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route path="/registerExpense" element={<RegisterExpense />} />
          <Route path="/employeePage" element={<EmployeePage/>}/>
          <Route path="/editPage/:expRequestID" element={<EditPage/>}/>
          <Route path="/viewPage/:expenseID" element={<ViewPage/>}/>
          <Route path="/allExpenses" element={<AllExpenses/>}/>
          <Route path="/allEmployees" element={<AllEmployees/>}/>
          <Route path="/allApprovedExpenses" element={<ApprovedExpenses/>}/>
          <Route path="/allRejectedExpenses" element={<RejectedExpenses/>}/>
          <Route path="/createEmployee" element={<CreateEmployee/>}/>
      </Routes>

     </div>
    </BrowserRouter>
  </>
  )
}

export default App;

