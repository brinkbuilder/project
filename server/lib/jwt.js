const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.warn('[WARN] JWT_SECRET is not set. Set it in your .env file.');
}
const COOKIE_NAME = process.env.COOKIE_NAME || 'auth_token';

function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { signToken, verifyToken, COOKIE_NAME };
