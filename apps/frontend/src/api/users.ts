import { useMutation } from '@tanstack/react-query';
import { CreateUserDto } from '@chat-app/_common/schemas/users';
import axios from '../config/axios.ts';

const ENDPOINT = 'users';

export function useCreateUser() {
  return useMutation({
    mutationFn: (data: CreateUserDto) => axios.post(ENDPOINT, data),
  });
}
