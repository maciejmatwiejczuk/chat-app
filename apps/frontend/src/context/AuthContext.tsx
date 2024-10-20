import { createContext, ReactNode, useEffect, useState } from 'react';
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

const AUTH_KEY = 'isAuthenticated';

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const isAuth = localStorage.getItem(AUTH_KEY);

    if (isAuth) {
      return JSON.parse(isAuth);
    } else {
      return false;
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(AUTH_KEY, `${isAuthenticated}`);
  }, [isAuthenticated]);

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
