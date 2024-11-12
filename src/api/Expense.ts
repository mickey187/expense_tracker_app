import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const baseUrl = `${backendUrl}`;
export const createExpenseApi = async(expenseData: any) => {
    
    
    try {
        const response = await axios.post(`${baseUrl}/api/expense`, expenseData, {
          headers: {
            Accept: "application/json",
          },
        });
        return response.data.data;
      } catch (error) {
        console.error("Error creating expense:", error);
        throw error;
      }
}


export const getAllExpenseApi = async(userId: any) => {
   
    
    try {
        const response = await axios.get(`${baseUrl}/api/expense/all-expense/${userId}`, {
          headers: {
            Accept: "application/json",
          },
        });
        return response.data.data;
      } catch (error) {
        console.error("Error fetching expense:", error);
        throw error;
      }
}

export const getTotalExpenseApi = async(userId: any) => {
   
    
    try {
        const response = await axios.get(`${baseUrl}/api/expense/total-expense/${userId}`, {
          headers: {
            Accept: "application/json",
          },
        });
        console.log("response", response);
        
        return response.data.data;
      } catch (error) {
        console.error("Error fetching total income:", error);
        throw error;
      }
  }

  export const getExpenseByMonthApi = async(userId: any) => {
   
    
    try {
        const response = await axios.get(`${baseUrl}/api/expense/by-month/${userId}`, {
          headers: {
            Accept: "application/json",
          },
        });
        console.log("expense", response.data.data);
        
        return response.data.data;
      } catch (error) {
        console.error("Error fetching expense:", error);
        throw error;
      }
  }