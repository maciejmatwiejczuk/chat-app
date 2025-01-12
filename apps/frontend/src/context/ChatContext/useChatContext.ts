import { createContext, useContext } from 'react';

export interface ChatInfo {
  user: {
    id: number;
    username: string;
  };
  isContact: boolean;
  invitationId: number | undefined;
}

export const ChatContext = createContext<
  | {
      activeChat: ChatInfo | undefined;
      setActiveChat: React.Dispatch<React.SetStateAction<ChatInfo | undefined>>;
    }
  | undefined
>(undefined);

export function useChatContext() {
  const chatContext = useContext(ChatContext);

  if (chatContext === undefined) {
    throw new Error('ChatProvider is not used anywhere in the code');
  }

  return chatContext;
}
