const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const watchlistRouter = require('./routes/watchlist');
const backtestRouter = require('./routes/backtest');

const app = express();
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/watchlists', watchlistRouter);
app.use('/api/backtests', backtestRouter);

app.get('/api/health', (_req, res) => res.json({ ok: true }));

const port = process.env.PORT || 8787;
app.listen(port, () => console.log(`API on :${port}`));

module.exports = { app };
