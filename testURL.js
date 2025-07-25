// Test the API URL construction
console.log('Testing API URL construction...');

// Simulate the environment variable
const API_BASE_URL = 'https://university-backend-vert.vercel.app/api';

// Test URL construction
const loginURL = `${API_BASE_URL}/auth/login`;
console.log('Login URL:', loginURL);

// Check for double slashes
if (loginURL.includes('//') && !loginURL.startsWith('http')) {
  console.log('❌ Double slash detected!');
} else if (loginURL.includes('///')) {
  console.log('❌ Triple slash detected!');
} else {
  console.log('✅ URL looks correct');
}

// Test individual parts
console.log('API_BASE_URL:', API_BASE_URL);
console.log('Path:', '/auth/login');
console.log('Combined:', loginURL);
