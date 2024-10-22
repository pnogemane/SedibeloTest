const axios = require('axios');
const crypto = require('crypto');
const fs = require('fs');
const rateLimit = require('express-rate-limit');
const { encrypt } = require('../services/encryptionService');


const generateCSRFToken = () => crypto.randomBytes(32).toString('hex');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, 
  message: 'Too many login attempts, please try again later.',
});

const simulateLogin = async (req, res) => {
  const csrfToken = req.body.csrfToken;
  const sessionCSRF = req.session.csrfToken;

  if (csrfToken !== sessionCSRF) return res.status(403).send('Invalid CSRF token.');

  try {
    const response = await axios.post('https://challenge.sedilink.co.za:12022', {
      username: req.body.username,
      password: req.body.password,
      action: 'LOGIN',
    });

    const { token, users } = response.data;

    fs.writeFileSync(
      './data/users.json',
      encrypt(JSON.stringify(users)),
      'utf-8'
    );

    req.session.token = token;
    res.send('Login successful');
  } catch (error) {
    res.status(500).send('Login failed');
  }
};

module.exports = { simulateLogin, loginLimiter, generateCSRFToken };
