import { useState, useEffect } from 'react';
import ChatWindow from './features/chat/ChatWindow';
import { socket } from './config/socket.ts';
import { v4 as uuid } from 'uuid';

export interface ChatMessage {
  id: string;
  isMe: boolean;
  message: string;
  date: string;
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
        { id: uuid(), isMe: false, message: msgObj.message, date: msgObj.date },
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
      <ChatWindow
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </>
  );
}

export default App;
