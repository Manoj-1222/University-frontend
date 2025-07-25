const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create authentication header
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Generic API call helper
const apiCall = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
        ...options.headers
      },
      ...options
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || `HTTP ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Authentication API
export const authApi = {
  login: async ({ email, password }) => {
    console.log('🔄 API: Making login request to:', `${API_BASE_URL}/auth/login`);
    return await apiCall(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },
  
  register: async (userData) => {
    console.log('🔄 API: Making register request to:', `${API_BASE_URL}/auth/register`);
    return await apiCall(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },
  
  getMe: async () => {
    return await apiCall(`${API_BASE_URL}/auth/me`);
  }
};

// Student API
export const studentApi = {
  getProfile: async () => {
    return await apiCall(`${API_BASE_URL}/students/profile`);
  },
  
  updateProfile: async (profileData) => {
    return await apiCall(`${API_BASE_URL}/students/profile`, {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  },
  
  getAttendance: async () => {
    return await apiCall(`${API_BASE_URL}/students/attendance`);
  },
  
  getFees: async () => {
    return await apiCall(`${API_BASE_URL}/students/fees`);
  },
  
  updateFees: async (feeData) => {
    return await apiCall(`${API_BASE_URL}/students/fees`, {
      method: 'PUT',
      body: JSON.stringify(feeData)
    });
  },
  
  getPlacement: async () => {
    return await apiCall(`${API_BASE_URL}/students/placement`);
  },
  
  updatePlacement: async (placementData) => {
    return await apiCall(`${API_BASE_URL}/students/placement`, {
      method: 'PUT',
      body: JSON.stringify(placementData)
    });
  }
};

// University Information API
export const universityApi = {
  getAbout: async () => {
    return await apiCall(`${API_BASE_URL}/university/about`);
  },
  
  getCourses: async () => {
    return await apiCall(`${API_BASE_URL}/university/courses`);
  },
  
  getFaculty: async () => {
    return await apiCall(`${API_BASE_URL}/university/faculty`);
  },
  
  getPlacements: async () => {
    return await apiCall(`${API_BASE_URL}/university/placements`);
  },
  
  getEvents: async () => {
    return await apiCall(`${API_BASE_URL}/university/events`);
  },
  
  getContact: async () => {
    return await apiCall(`${API_BASE_URL}/university/contact`);
  }
};

// Admissions API
export const admissionsApi = {
  submitApplication: async (formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admissions/apply`, {
        method: 'POST',
        headers: {
          ...getAuthHeader()
          // Don't set Content-Type for FormData, let browser set it
        },
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error('Admission API Error:', error);
      throw error;
    }
  },
  
  getApplication: async () => {
    return await apiCall(`${API_BASE_URL}/admissions/application`);
  },
  
  getAllApplications: async () => {
    return await apiCall(`${API_BASE_URL}/admissions/all`);
  }
};

// Admin API
export const adminApi = {
  getDashboard: async () => {
    return await apiCall(`${API_BASE_URL}/admin/dashboard`);
  },
  
  getAnalytics: async () => {
    return await apiCall(`${API_BASE_URL}/admin/analytics`);
  }
};