import { useInfiniteQuery } from '@tanstack/react-query';
import type {
  Contact,
  ContactsCriteria,
} from '@chat-app/_common/schemas/contacts.ts';
import { api } from '../config/axios';
import { ApiResponse } from '@chat-app/_common/types';

const CONTACTS_ENDPOINT = 'contacts';

export function useGetContacts(criteria?: ContactsCriteria) {
  return useInfiniteQuery({
    queryKey: ['contacts', criteria],
    queryFn: async ({ pageParam }) => {
      const response = await api.get<ApiResponse<Contact[]>>(
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
  });
}
