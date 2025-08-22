const express = require('express');
const { requireAuth } = require('../middleware/auth');
const { prisma } = require('../prisma');

const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
  const userId = req.user.id;
  const items = await prisma.backtest.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  res.json(items);
});

router.post('/', requireAuth, async (req, res) => {
  const userId = req.user.id;
  const { title, symbol, timeframe, params, from, to } = req.body;
  if (!title || !symbol || !timeframe || !from || !to) return res.status(400).json({ error: 'Missing fields' });
  // TODO: integrate your deterministic backtest engine that uses only user-provided params.
  const results = { roi: 0, trades: [], equity: [] };
  const created = await prisma.backtest.create({
    data: {
      title, symbol, timeframe,
      paramsJson: JSON.stringify(params ?? {}),
      from: new Date(from), to: new Date(to),
      resultsJson: JSON.stringify(results),
      userId
    }
  });
  res.json(created);
});

module.exports = router;
