import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import type {
  ContactDto,
  ContactsCriteria,
} from '@chat-app/_common/schemas/contacts.ts';
import { api } from '../config/axios';
import { ApiResponse } from '@chat-app/_common/types';

const CONTACTS_ENDPOINT = 'contacts';

export function useGetContacts(criteria?: ContactsCriteria, isEnabled = true) {
  return useInfiniteQuery({
    queryKey: ['contacts', criteria],
    queryFn: async ({ pageParam }) => {
      const response = await api.get<ApiResponse<ContactDto[]>>(
        CONTACTS_ENDPOINT,
        {
          params: {
            page: pageParam,
            ...criteria,
          },
        }
      );

      return response.data.items.contacts;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _pages, lastPageParam) => {
      return lastPage.length > 0 ? lastPageParam + 1 : undefined;
    },
    enabled: isEnabled,
  });
}

export function useDeleteContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) =>
      await api.delete<ApiResponse<ContactDto[]>>(`${CONTACTS_ENDPOINT}/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['contacts'] }),
  });
}
