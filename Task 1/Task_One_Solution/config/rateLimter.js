const axios = require('axios');  
const rateLimit = require('express-rate-limit');  
const crypto = require('crypto');  
const fs = require('fs');  


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: 'Too many login attempts, please try again later.',
});


async function login(username, password) {
  try {
    const csrfToken = generateCSRFToken();  

    const response = await axios.post(
      'https://challenge.sedilink.co.za:12022',
      {
        username,
        password,
        action: 'LOGIN',
        csrfToken,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    if (response.status === 200) {
      console.log('Login successful!');
      const { token, users } = response.data;
      saveUsersEncrypted(users);  
      return token; 
    }
  } catch (error) {
    console.error('Login failed:', error.message);
  }
}

function generateCSRFToken() {
  return crypto.randomBytes(16).toString('hex');
}


function saveUsersEncrypted(users) {
  const secretKey = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);

  let encrypted = cipher.update(JSON.stringify(users), 'utf8', 'hex');
  encrypted += cipher.final('hex');

  fs.writeFileSync('users.json', encrypted, 'utf8');
  console.log('Users saved securely to users.json');
}


login('testuser', 'securepassword');
