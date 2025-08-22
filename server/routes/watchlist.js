const express = require('express');
const { requireAuth } = require('../middleware/auth');
const { prisma } = require('../prisma');

const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
  const userId = req.user.id;
  const listsRaw = await prisma.watchlist.findMany({ where: { userId }, include: { items: true } });
  const lists = listsRaw.map(w => ({ id: w.id, name: w.name, symbols: w.items.map(i => i.symbol), createdAt: w.createdAt }));
  res.json(lists);
});

router.post('/', requireAuth, async (req, res) => {
  const userId = req.user.id;
  const { name, symbols } = req.body;
  if (!name) return res.status(400).json({ error: 'name required' });
  const watch = await prisma.watchlist.create({ data: { name, userId } });
  const syms = Array.isArray(symbols) ? symbols : [];
  if (syms.length) {
    await prisma.watchlistItem.createMany({ data: syms.map(s => ({ symbol: s, watchlistId: watch.id })) });
  }
  const out = await prisma.watchlist.findUnique({ where: { id: watch.id }, include: { items: true } });
  res.json({ id: out.id, name: out.name, symbols: out.items.map(i => i.symbol), createdAt: out.createdAt });
});

router.delete('/:id', requireAuth, async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const found = await prisma.watchlist.findUnique({ where: { id } });
  if (!found || found.userId !== userId) return res.status(404).json({ error: 'Not found' });
  await prisma.watchlistItem.deleteMany({ where: { watchlistId: id } });
  await prisma.watchlist.delete({ where: { id } });
  res.json({ ok: true });
});

module.exports = router;
