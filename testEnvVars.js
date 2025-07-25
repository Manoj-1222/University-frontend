// Test environment variable loading
console.log('Testing environment variables...');
console.log('VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
console.log('All env vars:', import.meta.env);

// Test the URL construction
const cleanApiUrl = (baseUrl) => {
  console.log('cleanApiUrl input:', baseUrl);
  if (!baseUrl) return 'http://localhost:5000/api';
  
  // Remove trailing slash if present
  let cleaned = baseUrl.replace(/\/+$/, '');
  console.log('After removing trailing slash:', cleaned);
  
  // Ensure it starts with http:// or https://
  if (!cleaned.startsWith('http://') && !cleaned.startsWith('https://')) {
    cleaned = 'https://' + cleaned.replace(/^\/+/, '');
  }
  console.log('Final cleaned URL:', cleaned);
  
  return cleaned;
};

const buildApiUrl = (baseUrl, path) => {
  const cleanBase = cleanApiUrl(baseUrl);
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const result = `${cleanBase}${cleanPath}`;
  console.log('buildApiUrl result:', result);
  return result;
};

// Test with the actual environment variable
const testUrl = buildApiUrl(import.meta.env.VITE_API_BASE_URL, '/auth/login');
console.log('Final test URL:', testUrl);
console.log('Has double slash?', testUrl.includes('//auth') ? 'YES ❌' : 'NO ✅');
