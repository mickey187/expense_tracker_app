import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const baseUrl = `${backendUrl}`;

export const fetchUser = async() => {
   
    
    try {
        const response = await axios.get(`${baseUrl}/api/users/get-user/rand`, {
          headers: {
            Accept: "application/json",
          },
        });
        console.log("balance fx", response.data);
        
        return response;
      } catch (error) {
        console.error("Error fetching balance fx:", error);
        throw error;
      }
  }