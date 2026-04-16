import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/Auth';

/**
 * ProtectedRoute Component
 * Wraps routes that require authentication.
 * Redirects unauthenticated users to the Sign In page.
 */
const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();
    const location = useLocation();

    // If not logged in, redirect to login page but save the current location 
    // so we can redirect them back after they log in
    if (!isLoggedIn) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
