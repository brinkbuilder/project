import { useState } from 'react';
import { Auth } from '../lib/api';
import { useAuth } from '../state/auth';

export default function Login() {
  const { refresh } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    try { await Auth.login(email, password); await refresh(); location.href = '/'; }
    catch (e: any) { setErr(e.message || 'Login failed'); }
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto p-4 grid gap-2">
      <h1>Log in</h1>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
      {err && <div style={{color:'red'}}>{err}</div>}
      <button type="submit">Log in</button>
    </form>
  );
}
