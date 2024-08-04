// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        // Redirect to login page if not authenticated
        return <Navigate to="/sing-in" replace />;
    }

    return children;
};

export default ProtectedRoute;
