import { PropsWithChildren, useState } from 'react';
import { ChatInfo, ChatContext } from './useChatContext';

function ChatProvider({ children }: PropsWithChildren) {
  const [activeChat, setActiveChat] = useState<ChatInfo | undefined>(undefined);

  return (
    <ChatContext.Provider value={{ activeChat, setActiveChat }}>
      {children}
    </ChatContext.Provider>
  );
}

export default ChatProvider;
