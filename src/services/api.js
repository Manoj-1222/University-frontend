// Clean and normalize the API base URL
const cleanApiUrl = (baseUrl) => {
  if (!baseUrl) return 'http://localhost:5000/api';
  
  // Remove trailing slash if present
  let cleaned = baseUrl.replace(/\/+$/, '');
  
  // Ensure it starts with http:// or https://
  if (!cleaned.startsWith('http://') && !cleaned.startsWith('https://')) {
    cleaned = 'https://' + cleaned.replace(/^\/+/, '');
  }
  
  return cleaned;
};

// Debug environment variables
console.log('🔍 Environment Debug:');
console.log('Raw VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);

const API_BASE_URL = cleanApiUrl(import.meta.env.VITE_API_BASE_URL);
console.log('Cleaned API_BASE_URL:', API_BASE_URL);

// Create authentication header
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Build API URL with proper path joining
const buildApiUrl = (path) => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const finalUrl = `${API_BASE_URL}${cleanPath}`;
  console.log('🔧 buildApiUrl:', { input: path, cleanPath, API_BASE_URL, finalUrl });
  return finalUrl;
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
    const loginUrl = buildApiUrl('/auth/login');
    console.log('🔄 API: Making login request to:', loginUrl);
    return await apiCall(loginUrl, {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },
  
  register: async (userData) => {
    const registerUrl = buildApiUrl('/auth/register');
    console.log('🔄 API: Making register request to:', registerUrl);
    return await apiCall(registerUrl, {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },
  
  getMe: async () => {
    return await apiCall(buildApiUrl('/auth/me'));
  }
};

// Student API
export const studentApi = {
  getProfile: async () => {
    return await apiCall(buildApiUrl('/students/profile'));
  },
  
  updateProfile: async (profileData) => {
    return await apiCall(buildApiUrl('/students/profile'), {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  },
  
  getAttendance: async () => {
    return await apiCall(buildApiUrl('/students/attendance'));
  },
  
  getFees: async () => {
    return await apiCall(buildApiUrl('/students/fees'));
  },
  
  updateFees: async (feeData) => {
    return await apiCall(buildApiUrl('/students/fees'), {
      method: 'PUT',
      body: JSON.stringify(feeData)
    });
  },
  
  getPlacement: async () => {
    return await apiCall(buildApiUrl('/students/placement'));
  },
  
  updatePlacement: async (placementData) => {
    return await apiCall(buildApiUrl('/students/placement'), {
      method: 'PUT',
      body: JSON.stringify(placementData)
    });
  }
};

// University Information API
export const universityApi = {
  getAbout: async () => {
    return await apiCall(buildApiUrl('/university/about'));
  },
  
  getCourses: async () => {
    return await apiCall(buildApiUrl('/university/courses'));
  },
  
  getFaculty: async () => {
    return await apiCall(buildApiUrl('/university/faculty'));
  },
  
  getPlacements: async () => {
    return await apiCall(buildApiUrl('/university/placements'));
  },
  
  getEvents: async () => {
    return await apiCall(buildApiUrl('/university/events'));
  },
  
  getContact: async () => {
    return await apiCall(buildApiUrl('/university/contact'));
  }
};

// Admissions API
export const admissionsApi = {
  submitApplication: async (formData) => {
    try {
      const applyUrl = buildApiUrl('/admissions/apply');
      const response = await fetch(applyUrl, {
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
    return await apiCall(buildApiUrl('/admissions/application'));
  },
  
  getAllApplications: async () => {
    return await apiCall(buildApiUrl('/admissions/all'));
  }
};

// Admin API
export const adminApi = {
  getDashboard: async () => {
    return await apiCall(buildApiUrl('/admin/dashboard'));
  },
  
  getAnalytics: async () => {
    return await apiCall(buildApiUrl('/admin/analytics'));
  }
};