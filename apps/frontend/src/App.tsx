import { useState, useEffect } from 'react';
import Chat from './features/chat/index.tsx';
import { socket } from './config/socket.ts';
import { v4 as uuid } from 'uuid';

export interface ChatMessage {
  id: string;
  isMe: boolean;
  message: string;
  date: Date;
}

export interface TransferredChatMessage {
  message: string;
  date: string;
}

function App() {
  // const [isConnected, setIsConnected] = useState(socket.connected);
  const [chatMessages, setChatMessages] = useState<Array<ChatMessage>>([]);

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
    socket.on('chatMessageServer', onChatMessageEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('chatMessageServer', onChatMessageEvent);
    };
  }, []);

  return (
    <>
      <Chat chatMessages={chatMessages} setChatMessages={setChatMessages} />
    </>
  );
}

export default App;
