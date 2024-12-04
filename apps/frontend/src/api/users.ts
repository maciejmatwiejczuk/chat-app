import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { CreateUserDto } from '@chat-app/_common/schemas/users';
import axios from '../config/axios.ts';

const ENDPOINT = 'users';

export function useCreateUser() {
  return useMutation({
    mutationFn: (data: CreateUserDto) => axios.post(ENDPOINT, data),
  });
}

export function useGetUsers(search?: string) {
  return useInfiniteQuery({
    queryKey: ['users', search],
    queryFn: async ({ pageParam }) => {
      const response = await axios.get(ENDPOINT, {
        params: {
          page: pageParam,
          username: search,
        },
      });

      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _pages, lastPageParam) => {
      return lastPage.users.length > 0 ? lastPageParam + 1 : undefined;
    },
  });
}
