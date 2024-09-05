import { useState, useEffect } from 'react';
import { socket } from './config/socket.ts';
import { v4 as uuid } from 'uuid';
import Chat from './components/chat/index.tsx';
import { TransferredChatMessage } from '@chat-app/common/types.ts';

export interface ChatMessage {
  id: string;
  isMe: boolean;
  message: string;
  date: Date;
}

function App() {
  // const [isConnected, setIsConnected] = useState(socket.connected);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    function onConnect() {
      console.log('connected');
    }

    function onDisconnect() {
      console.log('disconnected');
    }

    function onChatMessageEvent(msgObj: TransferredChatMessage) {
      setChatMessages((prev) => [
        ...prev,
        {
          id: uuid(),
          isMe: false,
          message: msgObj.message,
          date: new Date(msgObj.date),
        },
      ]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('chat_message:server', onChatMessageEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('chat_message:server', onChatMessageEvent);
    };
  }, []);

  return (
    <>
      <Chat chatMessages={chatMessages} setChatMessages={setChatMessages} />
    </>
  );
}

export default App;
