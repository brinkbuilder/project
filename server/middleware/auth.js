const { verifyToken, COOKIE_NAME } = require('../lib/jwt');

function requireAuth(req, res, next) {
  const token = req.cookies[COOKIE_NAME];
  if (!token) return res.status(401).json({ error: 'Unauthenticated' });
  try {
    const decoded = verifyToken(token);
    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = { requireAuth };
