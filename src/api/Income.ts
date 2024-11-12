import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const baseUrl = `${backendUrl}`;
export const createIncomeApi = async(incomeData: any) => {
    
    
    try {
        const response = await axios.post(`${baseUrl}/api/income`, incomeData, {
          headers: {
            Accept: "application/json",
          },
        });
        return response.data.data;
      } catch (error) {
        console.error("Error creating user:", error);
        throw error;
      }
}

export const getAllIncomeApi = async(userId: any) => {
   
    
    try {
        const response = await axios.get(`${baseUrl}/api/income/all-income/${userId}`, {
          headers: {
            Accept: "application/json",
          },
        });
        return response.data.data;
      } catch (error) {
        console.error("Error creating user:", error);
        throw error;
      }
}

export const getTotalIncomeApi = async(userId: any) => {
   
    
  try {
      const response = await axios.get(`${baseUrl}/api/income/total-income/${userId}`, {
        headers: {
          Accept: "application/json",
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching total income:", error);
      throw error;
    }
}

export const getCurrentBalanceApi = async(userId: any) => {
   
    
  try {
      const response = await axios.get(`${baseUrl}/api/income/current-balance/${userId}`, {
        headers: {
          Accept: "application/json",
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching balance:", error);
      throw error;
    }
}

export const getIncomeByMonthApi = async(userId: any) => {
   
    
  try {
      const response = await axios.get(`${baseUrl}/api/income/by-month/${userId}`, {
        headers: {
          Accept: "application/json",
        },
      });
      console.log("income", response.data.data);
      
      return response.data.data;
    } catch (error) {
      console.error("Error fetching income:", error);
      throw error;
    }
}

export const getCurrentBalanceFxApi = async(userId: any) => {
   
    
  try {
      const response = await axios.get(`${baseUrl}/api/income/current-balance/fx/${userId}`, {
        headers: {
          Accept: "application/json",
        },
      });
      console.log("balance fx", response.data.data);
      
      return response.data.data;
    } catch (error) {
      console.error("Error fetching balance fx:", error);
      throw error;
    }
}

