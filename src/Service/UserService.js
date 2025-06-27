import axios from 'axios';
import { useNavigate } from 'react-router-dom';

class UserService{
    navigate=useNavigate();
    static BASE_URL="http://localhost:8091";
    
    static async login(username,password){
        try{
            const response=await axios.post(`${UserService.BASE_URL}/public/auth/login`,{username,password});
            if(response.status==401){
                alert("Please enter the correct username and password");
                navigate("/")
            }
            return response.data;
            }
        catch(error){
            throw error;
        }
        }

    static isAuthenticated(){
        const token=localStorage.getItem('token');
        return !!token;
    }
    static isAdmin(){
        const role=localStorage.getItem('role');
        return role==='ADMIN';
    }
        static isManager(){
        const role=localStorage.getItem('role');
        return role==='MANAGER';
    }
    }

    export default UserService;


