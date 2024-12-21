import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { CreateUserDto, UserDto } from '@chat-app/_common/schemas/users';
import { api } from '../config/axios.ts';
import { ApiResponse } from '@chat-app/_common/types.ts';

const ENDPOINT = 'users';

export function useCreateUser() {
  return useMutation({
    mutationFn: (data: CreateUserDto) =>
      api.post<CreateUserDto, ApiResponse<UserDto>>(ENDPOINT, data),
  });
}

export function useGetUsers(search?: string) {
  return useInfiniteQuery({
    queryKey: ['users', search],
    queryFn: async ({ pageParam }) => {
      const response = await api.get<ApiResponse<UserDto[]>>(ENDPOINT, {
        params: {
          page: pageParam,
          username: search,
        },
      });

      return response.data.items.users;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _pages, lastPageParam) => {
      return lastPage.length > 0 ? lastPageParam + 1 : undefined;
    },
  });
}
