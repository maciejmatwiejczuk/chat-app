import { PropsWithChildren, useLayoutEffect, useState } from 'react';
import { AuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';
import { api } from '../../config/axios';
import { useQueryClient } from '@tanstack/react-query';

export function AuthProvider({ children }: PropsWithChildren) {
  const [didLogIn, setDidLogIn] = useState(getLocalStorageAuthValue);

  function getLocalStorageAuthValue() {
    return localStorage.getItem('didLogIn') === 'true';
  }

  function confirmAuth() {
    setDidLogIn(true);
    localStorage.setItem('didLogIn', 'true');
  }

  const queryClient = useQueryClient();

  async function invalidateAuth() {
    setDidLogIn(false);
    localStorage.removeItem('didLogIn');
  }

  const navigate = useNavigate();

  useLayoutEffect(() => {
    console.log('RUN');
    console.log(didLogIn);

    if (!didLogIn) {
      return;
    }

    const authInterceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.status === 401) {
          queryClient.clear();
          invalidateAuth();
          navigate('/sign-in', {
            state: { message: 'Your session has expired.' },
          });
        }
      }
    );

    return () => api.interceptors.response.eject(authInterceptor);
  }, [didLogIn, navigate, queryClient]);

  return (
    <AuthContext.Provider
      value={{ confirmAuth, invalidateAuth, getLocalStorageAuthValue }}
    >
      {children}
    </AuthContext.Provider>
  );
}
