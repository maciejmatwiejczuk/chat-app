import { useState, useEffect } from 'react';
import { socket } from '../../config/socket';
import { v4 as uuid } from 'uuid';
import { TransferredChatMessage } from '@chat-app/common/types.ts';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import styles from './styles.module.css';

interface ChatMessage {
  id: string;
  isMe: boolean;
  message: string;
  date: Date;
}

function Chat() {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState('');

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

  function onMessageSend() {
    const messageId = uuid();

    if (message) {
      setChatMessages((prev) => [
        ...prev,
        { id: messageId, isMe: true, message, date: new Date() },
      ]);
      socket.emit('chat_message:client', message, (date) => {
        setChatMessages((prev) => {
          const filtered = prev.filter((msg) => msg.id !== messageId);
          return [
            ...filtered,
            { id: messageId, isMe: true, message, date: new Date(date) },
          ];
        });
      });
      setMessage('');
    }
  }

  return (
    <div className={styles.container}>
      <ChatHeader />
      <MessageList chatMessages={chatMessages} />
      <MessageInput
        message={message}
        setMessage={setMessage}
        onMessageSend={onMessageSend}
      />
    </div>
  );
}

export default Chat;
