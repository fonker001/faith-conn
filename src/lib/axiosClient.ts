import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://faith-connect-backend-v1.onrender.com",
  //withCredentials: true, // needed if backend uses cookies
});




export default api;
