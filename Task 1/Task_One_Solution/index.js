const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const { simulateLogin, loginLimiter } = require('./controllers/authController');
const { processUsers } = require('./controllers/userController');
const csrfMiddleware = require('./middlewares/csrfMiddleware');
const { generateFibonacci, getNthFibonacci } = require('./utils/fibonacci');

const app = express();
app.use(bodyParser.json());
app.use(session({ secret: 'secure-session', resave: false, saveUninitialized: true }));

// Routes
app.post('/login', csrfMiddleware, loginLimiter, simulateLogin);
app.get('/process-users', processUsers);
app.get('/fibonacci/:n', (req, res) => {
  const n = parseInt(req.params.n);
  res.json({ nthFibonacci: getNthFibonacci(n) });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
