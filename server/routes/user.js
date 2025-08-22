const express = require('express');
const { requireAuth } = require('../middleware/auth');
const { prisma } = require('../prisma');

const router = express.Router();

router.get('/me', requireAuth, async (req, res) => {
  const userId = req.user.id;
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true, email: true } });
  res.json(user);
});

module.exports = router;
