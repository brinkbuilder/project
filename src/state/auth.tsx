import { createContext, useContext, useEffect, useState } from 'react';
import { Auth } from '../lib/api';

type User = { id: string; email: string } | null | undefined;

const AuthCtx = createContext<{ user: User; refresh: () => Promise<void>; logout: () => Promise<void> }>({
  user: undefined,
  refresh: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(undefined);
  const refresh = async () => {
    try { setUser(await Auth.me()); } catch { setUser(null); }
  };
  const logout = async () => { await Auth.logout(); setUser(null); };
  useEffect(() => { refresh(); }, []);
  return <AuthCtx.Provider value={{ user, refresh, logout }}>{children}</AuthCtx.Provider>;
}

export function useAuth() { return useContext(AuthCtx); }
