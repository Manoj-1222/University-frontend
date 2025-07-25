import React, { createContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

// Create context
const AuthContext = createContext();

// Create provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Check if user is already logged in (on page load)
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error('Error parsing stored user data:', e);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    
    setLoading(false);
  }, []);
  
  // Login function
  const login = async (email, password) => {
    try {
      console.log('🟡 AuthContext: Starting login process...');
      setError(null);
      setLoading(true);
      
      console.log('🟡 AuthContext: Calling authApi.login with:', email);
      const response = await authApi.login({ email, password });
      console.log('🟡 AuthContext: Received response:', response);
      
      if (response && response.success && response.token) {
        console.log('🟢 AuthContext: Login successful, saving to localStorage');
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
        console.log('🟢 AuthContext: User state updated:', response.user);
        return true;
      } else {
        const errorMsg = response?.message || 'Login failed';
        console.log('🔴 AuthContext: Login failed:', errorMsg);
        setError(errorMsg);
        return false;
      }
    } catch (err) {
      console.error('🔴 AuthContext: Login error:', err);
      setError('Login failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
      console.log('🟡 AuthContext: Login process completed');
    }
  };
  
  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };
  
  // Register function
  const register = async (userData) => {
    try {
      setError(null);
      setLoading(true);
      const response = await authApi.register(userData);
      
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
        return true;
      } else {
        setError(response.message || 'Registration failed');
        return false;
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Registration failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;