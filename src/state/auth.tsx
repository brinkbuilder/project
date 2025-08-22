import { createContext, useContext, useEffect, useState } from 'react';
import { Auth } from '../lib/api';

type User = { id: string; email: string; firstName?: string; lastName?: string } | null | undefined;

const AuthCtx = createContext<{ user: User; refresh: () => Promise<void>; logout: () => Promise<void> }>({
  user: undefined,
  refresh: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(undefined);
  
  // Check for stored user session on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('travelPro_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('travelPro_user');
      }
    }
  }, []);
  
  const refresh = async () => {
    try { 
      const userData = await Auth.me();
      setUser(userData);
      // Store user data for persistence
      localStorage.setItem('travelPro_user', JSON.stringify(userData));
    } catch { 
      setUser(null);
      localStorage.removeItem('travelPro_user');
    }
  };
  
  const logout = async () => { 
    await Auth.logout(); 
    setUser(null);
    localStorage.removeItem('travelPro_user');
    // Clear any other stored user data
    localStorage.removeItem('travelPro_trips');
    localStorage.removeItem('travelPro_preferences');
  };
  
  useEffect(() => { refresh(); }, []);
  return <AuthCtx.Provider value={{ user, refresh, logout }}>{children}</AuthCtx.Provider>;
}

export function useAuth() { return useContext(AuthCtx); }
