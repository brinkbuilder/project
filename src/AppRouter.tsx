import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './state/auth';
import Login from './pages/login';
import Signup from './pages/signup';
import App from './App';

function Private({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  if (user === null) return <Navigate to="/login" replace />;
  return children;
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/*" element={<Private><App /></Private>} />
    </Routes>
  );
}
