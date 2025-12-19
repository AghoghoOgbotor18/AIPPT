import axios from "axios";

//call an axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://aippt-ee28.onrender.com", //backend url 
    headers:{
        "Content-Type": "application/json" //telling the backend we're sending a json file
    }
})
export default api