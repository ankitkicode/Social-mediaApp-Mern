// src/api/fetchProtectedData.js
import axios from 'axios';
import { toast } from 'react-toastify';

const fetchProtectedData = async (url) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching protected data', error);
        toast.error('Failed to fetch protected data.');
        return null;
    }
};

export default fetchProtectedData;
