import type { MessageDto } from '@chat-app/_common/schemas/messages';
import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from '../config/axios';
import { ApiResponse } from '@chat-app/_common/types';

const MESSAGES_ENDPOINT = 'messages/chat';

export function useGetChatMessages(firstUserId: number, secondUserId: number) {
  return useInfiniteQuery({
    queryKey: ['messages', firstUserId, secondUserId],
    queryFn: async ({ pageParam }) => {
      const response = await api.get<ApiResponse<MessageDto[]>>(
        MESSAGES_ENDPOINT,
        {
          params: {
            page: pageParam,
            firstUserId,
            secondUserId,
          },
        }
      );

      return response.data.items.messages;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _pages, lastPageParam) => {
      return lastPage.length > 0 ? lastPageParam + 1 : undefined;
    },
  });
}
