// Temporary production fix - hardcoded API URL
const API_BASE_URL = 'https://university-backend-vert.vercel.app/api';

// Build API URL with proper path joining and double-slash prevention
const buildApiUrl = (path) => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  let finalUrl = `${API_BASE_URL}${cleanPath}`;
  
  // Remove any double slashes except for the protocol
  finalUrl = finalUrl.replace(/([^:]\/)\/+/g, '$1');
  
  console.log('🔧 buildApiUrl (hardcoded):', { input: path, cleanPath, API_BASE_URL, finalUrl });
  return finalUrl;
};

// Create authentication header
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Generic API call helper
const apiCall = async (url, options = {}) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
      ...options.headers
    },
    ...options
  };

  try {
    console.log('📡 Making API call to:', url);
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    
    return await response.json();
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

  register: async ({ email, password, name }) => {
    return await apiCall(buildApiUrl('/auth/register'), {
      method: 'POST',
      body: JSON.stringify({ email, password, name })
    });
  },

  getCurrentUser: async () => {
    return await apiCall(buildApiUrl('/auth/me'));
  }
};

// Export for testing
export { buildApiUrl };
