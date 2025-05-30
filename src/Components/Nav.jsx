import React from 'react';
import { Link } from 'react-router-dom';
import UserService from '../Service/UserService';
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import '../Service/style.css'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function Navbar() {
    // const isAuthenticated = UserService.isAuthenticated();
    // const isAdmin = UserService.isAdmin();
    // const isManager=UserService.isManager();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const isAuthenticated = true
    const isAdmin = true
    const isManager=false
    var empName=localStorage.getItem('employeeName');


    const navigate=useNavigate();

    const handleClick=async=>{
        navigate("/registerExpense");
    }

    const handleReporteesExpenses=async=>{
        navigate("/allExpenses");
    }
    const handleApprovedExpenses=async=>{
        navigate("/allApprovedExpenses");
    }
    const handleRejectedExpenses=async=>{
        navigate("/allRejectedExpenses");
    }
    const handleReporteesDetails=async=>{
        navigate("/allEmployees");
    }
    const handleLogout=async=>{
        try{
            const confirmLogout=window.confirm("Are you sure you want to logout?");
            if(confirmLogout){
               navigate("/");
            }
        }
        catch(error){
            console.log("error in logging out")
        }
    }


    return (
        <>
        <nav>
        <ul>
        {isAuthenticated && <li><Button variant="contained">My Expenses</Button></li>}
        {isAuthenticated && <li><Button variant="contained" onClick={handleClick}>Register Expense</Button></li>}
        {(isAdmin || isManager) && <li><Button variant="contained" onClick={handleReporteesExpenses}>Reportees Expenses</Button></li>}
        {(isAdmin || isManager) && <li><Button variant="contained" onClick={handleApprovedExpenses}>Approved Expenses</Button></li>}
        {(isAdmin || isManager) && <li><Button variant="contained" onClick={handleRejectedExpenses}>Rejected Expenses</Button></li>}
        {(isAdmin) && <li><Button variant="contained" onClick={handleReporteesDetails}>Reportees Details</Button></li>}
        {/* {isAuthenticated && <li><Button variant="contained" className='right_nav' onClick={handleLogout}>{empName}</Button></li>} */}
        <Button variant='contained' onClick={handleMenuClick} endIcon={<KeyboardArrowDownIcon />} className='dashboard'>
            {empName}        </Button>
          <Menu className='menus'
        id="fade-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem  onClick={handleClose}>Profile</MenuItem>
        <MenuItem  onClick={handleClose}>My account</MenuItem>
        <MenuItem  onClick={handleLogout}>Logout</MenuItem>
      </Menu>

        </ul>
        
        </nav>
        </>
    );
}

export default Navbar;