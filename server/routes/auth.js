const express = require('express');
const bcrypt = require('bcryptjs');
const { prisma } = require('../prisma');
const { signToken, COOKIE_NAME } = require('../lib/jwt');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return res.status(409).json({ error: 'Email already registered' });
  const hash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({ data: { email, password: hash } });
  const token = signToken({ id: user.id, email: user.email });
  res.cookie(COOKIE_NAME, token, { httpOnly: true, sameSite: 'lax', secure: false, maxAge: 7*24*60*60*1000 });
  return res.json({ id: user.id, email: user.email });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await require('bcryptjs').compare(password, user.password);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = signToken({ id: user.id, email: user.email });
  res.cookie(COOKIE_NAME, token, { httpOnly: true, sameSite: 'lax', secure: false, maxAge: 7*24*60*60*1000 });
  return res.json({ id: user.id, email: user.email });
});

router.post('/logout', async (_req, res) => {
  res.clearCookie(COOKIE_NAME);
  return res.json({ ok: true });
});

module.exports = router;
