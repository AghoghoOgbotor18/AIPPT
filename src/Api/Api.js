import axios from "axios";

//call an axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000", //backend url https://aippt-ee28.onrender.com
    headers:{
        "Content-Type": "application/json" //telling the backend we're sending a json file
    }
})
export default api