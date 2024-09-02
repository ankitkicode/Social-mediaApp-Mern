// src/api/axiosInstance.js
import axios from 'axios';
const yourAuthToken = localStorage.getItem('token');
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000', 
    withCredentials: true,
    headers: {
        'Authorization': `Bearer ${yourAuthToken}`, 
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;