import { PropsWithChildren, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { ChatContext } from './useChatContext';
import type { ChatInfo, ChatMessage } from './useChatContext';
import { socket } from '../../config/socket';
import { TransferredChatMessage } from '@chat-app/_common/types';

function ChatProvider({ children }: PropsWithChildren) {
  const [activeChat, setActiveChat] = useState<ChatInfo | undefined>(undefined);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

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
    }

    socket.on('chat_message:server', onChatMessage);

    return () => {
      socket.off('chat_message:server');
    };
  }, []);

  return (
    <ChatContext.Provider
      value={{ activeChat, setActiveChat, chatMessages, setChatMessages }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export default ChatProvider;
