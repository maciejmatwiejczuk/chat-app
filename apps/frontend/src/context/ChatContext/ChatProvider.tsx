import { PropsWithChildren, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { ChatContext } from './useChatContext';
import type { ChatInfo, ChatMessage } from './useChatContext';
import { socket } from '../../config/socket';
import { TransferredChatMessage } from '@chat-app/_common/types';
import { useQueryClient } from '@tanstack/react-query';

function ChatProvider({ children }: PropsWithChildren) {
  function changeChat(chat: ChatInfo) {
    setActiveChat(chat);
    setChatMessages([]);
  }

  const [activeChat, setActiveChat] = useState<ChatInfo | undefined>(undefined);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const queryClient = useQueryClient();

  useEffect(() => {
    function onChatMessage(msg: TransferredChatMessage) {
      setChatMessages((prev) => [
        ...prev,
        {
          id: uuid(),
          isMe: false,
          message: msg.message,
          date: new Date(msg.date),
        },
      ]);
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    }

    socket.on('chat_message:server', onChatMessage);

    return () => {
      socket.off('chat_message:server');
    };
  }, [queryClient]);

  return (
    <ChatContext.Provider
      value={{
        activeChat,
        setActiveChat,
        changeChat,
        chatMessages,
        setChatMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export default ChatProvider;
