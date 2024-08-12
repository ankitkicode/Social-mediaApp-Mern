import React, { createContext, useState, useEffect } from 'react';

import axiosInstance from './axiosinstance';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [loginUser, setLoginUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axiosInstance.get('http://localhost:3000/allposts');
                if (response) {
                    setLoginUser(response.data.loggedInUser);
                    // console.log(response.loggedInUser)
                    setData(response.data.posts);
                } else {
                    setError('No data returned');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        getData();
    }, []);

    return (
        <DataContext.Provider value={{ data, isLoading, loginUser, error }}>
            {children}
        </DataContext.Provider>
    );
};

