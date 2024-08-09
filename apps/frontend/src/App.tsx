import { useState, useEffect } from 'react';
import ChatWindow from './features/chat/ChatWindow';
import { socket } from './config/socket.ts';

function App() {
  // const [isConnected, setIsConnected] = useState(socket.connected);
  const [chatMessages, setChatMessages] = useState<Array<string>>([]);

  useEffect(() => {
    function onChatMessageEvent(msg: string) {
      setChatMessages((prev) => [...prev, msg]);
    }

    socket.on('chat-message', onChatMessageEvent);

    return () => {
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
