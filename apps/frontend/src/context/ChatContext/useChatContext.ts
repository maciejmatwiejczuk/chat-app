import { createContext, useContext } from 'react';

export interface ChatInfo {
  user: {
    id: number;
    username: string;
  };
  isContact: boolean;
  invitationId: number | undefined;
}

export interface ChatMessage {
  id: string;
  isMe: boolean;
  message: string;
  date: Date;
}

export const ChatContext = createContext<
  | {
      activeChat: ChatInfo | undefined;
      setActiveChat: React.Dispatch<React.SetStateAction<ChatInfo | undefined>>;
      chatMessages: ChatMessage[];
      setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
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
