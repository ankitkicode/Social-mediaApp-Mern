import axiosInstance from '../api/axiosinstance';

export const loginUser = async (email, password) => {
    try {
        const response = await axiosInstance.post('/login', { email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createAccount = async (name, username, email, password) => {
    try {
        const response = await axiosInstance.post('register', {
            name,
            username,
            email,
            password
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};