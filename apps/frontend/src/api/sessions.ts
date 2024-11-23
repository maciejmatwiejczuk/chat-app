import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { LoginDto } from '@chat-app/_common/schemas/sessions.ts';
import axios from '../config/axios.ts';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

const LOGIN_ENDPOINT = 'login';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginDto) => axios.post(LOGIN_ENDPOINT, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['me'],
        refetchType: 'all',
      });
      navigate('/');
    },
  });
}

const LOGOUT_ENDPOINT = 'logout';

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => axios.post(LOGOUT_ENDPOINT),
    onSuccess: () => {
      queryClient.clear();
      navigate('/sign-in');
    },
  });
}

const ME_ENDPOINT = 'me';

export function useMe() {
  return useQuery({
    queryKey: ['me'],
    queryFn: () => axios.get(ME_ENDPOINT),
    select: (response) => response.data.me,
    staleTime: Infinity,
    retry: (failCount, err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return false;
        }
      }

      const defaultRetry = new QueryClient().getDefaultOptions().queries?.retry;

      return typeof defaultRetry === 'number'
        ? failCount < defaultRetry
        : false;
    },
  });
}
