const generateCSRFToken = require('../controllers/authController').generateCSRFToken;

const csrfMiddleware = (req, res, next) => {
  const token = generateCSRFToken();
  req.session.csrfToken = token;
  res.locals.csrfToken = token;
  next();
};

module.exports = csrfMiddleware;
