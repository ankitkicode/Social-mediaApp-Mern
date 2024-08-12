// src/api/axiosInstance.js
import axios from 'axios';
const yourAuthToken = localStorage.getItem('token');
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000', // Replace with your backend URl
    withCredentials: true,
    headers: {
        'Authorization': `Bearer ${yourAuthToken}`, // If you need an auth token
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;