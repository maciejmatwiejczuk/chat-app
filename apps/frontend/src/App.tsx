import { useState, useEffect } from 'react';
import ChatWindow from './features/chat/ChatWindow';
import { socket } from './config/socket.ts';

function App() {
  // const [isConnected, setIsConnected] = useState(socket.connected);
  const [chatMessages, setChatMessages] = useState<Array<string>>([]);

  useEffect(() => {
    function onConnect() {
      console.log('connected');
    }

    function onDisconnect() {
      console.log('disconnected');
    }

    function onChatMessageEvent(msg: string) {
      setChatMessages((prev) => [...prev, msg]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('chat-message', onChatMessageEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('chat-message', onChatMessageEvent);
    };
  }, []);

  return (
    <>
      <ChatWindow chatMessages={chatMessages} />
    </>
  );
}

export default App;
