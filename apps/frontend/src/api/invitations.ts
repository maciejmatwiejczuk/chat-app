import { useQuery } from '@tanstack/react-query';
import type { InvitationDto } from '@chat-app/_common';
import { api } from '../config/axios';
import { ApiResponse } from '@chat-app/_common';

const INVITATIONS_ENDPOINT = 'invitations';

export function useGetInvitationById(id: number | undefined) {
  return useQuery({
    queryKey: ['invitation', id],
    queryFn: async () => {
      const response = await api.get<ApiResponse<InvitationDto>>(
        `${INVITATIONS_ENDPOINT}/${id}`
      );

      return response.data.items.invitation;
    },
    enabled: Boolean(id),
    refetchOnMount: true,
  });
}
