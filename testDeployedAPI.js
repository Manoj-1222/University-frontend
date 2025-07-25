// Test the deployed API
const testAPI = async () => {
  try {
    // Test health endpoint
    console.log('🔄 Testing health endpoint...');
    const healthResponse = await fetch('https://university-backend-vert.vercel.app/api/health');
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData);

    // Test login endpoint
    console.log('\n🔄 Testing login endpoint...');
    const loginResponse = await fetch('https://university-backend-vert.vercel.app/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'testuser@example.com',
        password: 'test123456'
      })
    });

    const loginData = await loginResponse.json();
    console.log('Status:', loginResponse.status);
    console.log('Response:', loginData);

    if (loginResponse.ok) {
      console.log('✅ Login successful!');
      console.log('🎫 Token received:', loginData.token ? 'Yes' : 'No');
    } else {
      console.log('❌ Login failed:', loginData.message);
    }

  } catch (error) {
    console.error('Error testing API:', error);
  }
};

testAPI();
