import { useMutation } from '@tanstack/react-query';
import { LoginDto } from '@chat-app/_common/schemas/sessions.ts';
import axios from '../config/axios.ts';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.tsx';

const LOGIN_ENDPOINT = 'login';

export function useLogin() {
  const { onLogin } = useContext(AuthContext);

  return useMutation({
    mutationFn: (data: LoginDto) => axios.post(LOGIN_ENDPOINT, data),
    onSuccess: () => onLogin && onLogin(),
  });
}

const LOGOUT_ENDPOINT = 'logout';

export function useLogout() {
  const { onLogout } = useContext(AuthContext);

  return useMutation({
    mutationFn: () => axios.post(LOGOUT_ENDPOINT),
    onSuccess: () => onLogout && onLogout(),
  });
}
