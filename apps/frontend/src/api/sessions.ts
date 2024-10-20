import { useMutation } from '@tanstack/react-query';
import { LoginDto } from '@chat-app/_common/schemas/sessions.ts';
import axios from '../config/axios.ts';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.tsx';

const ENDPOINT = 'login';

export function useLogin() {
  const { onLogin } = useContext(AuthContext);

  return useMutation({
    mutationFn: (data: LoginDto) => axios.post(ENDPOINT, data),
    onSuccess: () => onLogin && onLogin(),
  });
}
