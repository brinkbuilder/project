import { useState } from 'react';
import { Backtests } from '../lib/api';

export default function BacktestForm({ onCreated }: { onCreated?: () => void }) {
  const [title, setTitle] = useState('');
  const [symbol, setSymbol] = useState('');
  const [timeframe, setTimeframe] = useState('1h');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [params, setParams] = useState('{}');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { title, symbol, timeframe, from, to, params: JSON.parse(params) };
    await Backtests.create(payload);
    onCreated?.();
  };

  return (
    <form onSubmit={submit} className="grid gap-2">
      <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
      <input placeholder="Symbol (e.g. BTCUSDT)" value={symbol} onChange={e=>setSymbol(e.target.value)} required />
      <select value={timeframe} onChange={e=>setTimeframe(e.target.value)}>
        {['1m','5m','15m','1h','4h','1d'].map(tf=> <option key={tf} value={tf}>{tf}</option>)}
      </select>
      <input type="datetime-local" value={from} onChange={e=>setFrom(e.target.value)} required />
      <input type="datetime-local" value={to} onChange={e=>setTo(e.target.value)} required />
      <textarea placeholder="Strategy params JSON" value={params} onChange={e=>setParams(e.target.value)} required />
      <button type="submit">Run backtest</button>
    </form>
  );
}
