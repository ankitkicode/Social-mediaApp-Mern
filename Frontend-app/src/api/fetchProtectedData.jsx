import axios from 'axios';
import { toast } from 'react-toastify';

const fetchProtectedData = async (url) => {
    const yourAuthToken = localStorage.getItem('token');
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${yourAuthToken}`, // If you need an auth token
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching protected data:', error);
        toast.error('Error fetching protected data');
        return null;
    }
};

export default fetchProtectedData;
