// Test the new URL building function
console.log('Testing robust URL construction...');

// Test different scenarios
const testUrls = [
  'https://university-backend-vert.vercel.app/api',
  'https://university-backend-vert.vercel.app/api/',
  'https:/university-backend-vert.vercel.app/api',  // Missing slash
  'university-backend-vert.vercel.app/api',         // Missing protocol
  '',                                               // Empty
  null,                                             // Null
];

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

const buildApiUrl = (baseUrl, path) => {
  const cleanBase = cleanApiUrl(baseUrl);
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
};

testUrls.forEach((url, index) => {
  console.log(`\nTest ${index + 1}:`);
  console.log('Input:', url);
  try {
    const result = buildApiUrl(url, '/auth/login');
    console.log('Output:', result);
    console.log('Valid:', result.includes('//auth/login') ? '❌ Double slash!' : '✅ Good');
  } catch (error) {
    console.log('Error:', error.message);
  }
});
