import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  // Check if user is logged in from localStorage
  const userData = localStorage.getItem('user');
  const loginStatus = localStorage.getItem('isLoggedIn');
  return userData && loginStatus === 'true';
};

function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute; 