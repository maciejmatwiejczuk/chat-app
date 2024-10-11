import { useMutation } from '@tanstack/react-query';
import { LoginDto } from '@chat-app/_common/schemas/sessions.ts';
import axios from '../config/axios.ts';

const ENDPOINT = 'login';

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginDto) => axios.post(ENDPOINT, data),
  });
}
