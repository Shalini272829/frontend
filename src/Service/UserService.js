import axios from 'axios';

class UserService{

    static BASE_URL="http://localhost:8091";
    
    static async login(username,password){
        try{
            const response=await axios.post(`${UserService.BASE_URL}/public/auth/login`,{username,password});
            return response.data;
            }
        catch(error){
            throw error;
        }
        }

         static async postExpense(registerData,token){
        try{
            const response= await axios.post(`${UserService.BASE_URL}/employee/add/expenserequest`,registerData,
                {
                    headers:{Authorization:`Bearer ${token}`}
                }
            );
            return response.data;
        }
        catch(error){
            throw error;
        }
    }

     static async getExpensesByEmpId(employeeId,token){
        try{
            const response= await axios.get(`${UserService.BASE_URL}/employee/getallExpense/${employeeId}`,
                {
                    headers:{Authorization:`Bearer ${token}`}
                }
            );
            return response.data;
        }
        catch(error){
            throw error;
        }
    }

    // static async getByExpenseId(expenseID,token){
    //     try{
    //         const response= await axios.get(`${UserService.BASE_URL}/employee/get/expenserequest/${expenseID}`,
    //             {
    //             headers: {Authorization:`Bearer ${token}`}
    //             }
    //         );
    //         return response.data;
    //     }
    //     catch(error){
    //         throw error;
    //     }
    // }

     static async getByExpenseId(expenseID,token){
        try{
            const response= await axios.get(`http://localhost:3000/myExpenses`);
            return response;
        }
        catch(error){
            throw error;
        }
    }

    static async editExpenseDataById(expenseID, expenseData, token){
        try{
            const response=await axios.put(`${UserService.BASE_URL}/employee/edit/expenserequest/${expenseID}`,expenseData,
                {
                    headers:{Authorization:`Bearer ${token}`}
                }
            );
            return response.data;
        }
        catch(error){
            throw error;
        }
    }

    static async deleteExpenseById(expenseId,token){
        try{
            const response=await axios.delete(`${UserService.BASE_URL}/employee/delete/expenserequest/${expenseId}`,
                {
                    headers:{Authorization:`Bearer ${token}`}
                }
            );
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


