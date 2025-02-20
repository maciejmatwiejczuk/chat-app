import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { LoginDto } from '@chat-app/_common';
import { api } from '../config/axios.ts';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useAuthContext } from '../context/AuthContext/useAuthContext.ts';
import { UserDto } from '@chat-app/_common';
import { ApiResponse } from '@chat-app/_common';
import { socket } from '../config/socket.ts';

const LOGIN_ENDPOINT = 'login';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { confirmAuth } = useAuthContext();

  return useMutation({
    mutationFn: (data: LoginDto) =>
      api.post<LoginDto, ApiResponse<UserDto>>(LOGIN_ENDPOINT, data),
    onSuccess: async () => {
      confirmAuth();
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
  const { invalidateAuth } = useAuthContext();

  return useMutation({
    mutationFn: () => api.post<never, ApiResponse<never>>(LOGOUT_ENDPOINT),
    onSuccess: () => {
      socket.disconnect();
      queryClient.clear();
      invalidateAuth();
      navigate('/sign-in');
    },
  });
}

const ME_ENDPOINT = 'me';

export function useMe() {
  const { invalidateAuth, getLocalStorageAuthValue } = useAuthContext();

  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      if (!getLocalStorageAuthValue()) {
        return null;
      }

      const response = await api.get<ApiResponse<UserDto>>(ME_ENDPOINT);

      return response.data.items.me;
    },
    staleTime: Infinity,
    retry: (failCount, err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          invalidateAuth();
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
