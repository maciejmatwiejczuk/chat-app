import { createContext, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextValue {
  isAuthenticated: boolean;
  onLogin: (() => void) | null;
  onLogout: (() => void) | null;
}

export const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  onLogin: null,
  onLogout: null,
});

export interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  function onLogin() {
    setIsAuthenticated(true);
    navigate('/');
  }

  function onLogout() {
    setIsAuthenticated(false);
    navigate('/sign-in');
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, onLogin, onLogout }}>
      {children}
    </AuthContext.Provider>
  );
}
