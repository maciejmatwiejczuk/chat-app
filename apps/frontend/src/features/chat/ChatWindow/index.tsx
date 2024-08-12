import { useState } from 'react';
import MessageList from '../MessageList';
import MessageInput from '../MessageInput';
import { ChatMessage } from '../../../App';
import styles from './styles.module.css';
import { socket } from '../../../config/socket';
import { v4 as uuid } from 'uuid';

interface ChatWindowProps {
  chatMessages: Array<ChatMessage>;
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

function ChatWindow({ chatMessages, setChatMessages }: ChatWindowProps) {
  const [message, setMessage] = useState('');

  function onMessageSend() {
    const messageId = uuid();

    if (message) {
      setChatMessages((prev) => [
        ...prev,
        { id: messageId, isMe: true, message, date: new Date().toISOString() },
      ]);
      socket.emit('chatMessageClient', message, (date) => {
        setChatMessages((prev) => {
          const filtered = prev.filter((msg) => msg.id !== messageId);
          return [...filtered, { id: messageId, isMe: true, message, date }];
        });
      });
      setMessage('');
    }
  }

  return (
    <div className={styles.container}>
      <MessageList chatMessages={chatMessages} />
      <MessageInput
        message={message}
        setMessage={setMessage}
        onMessageSend={onMessageSend}
      />
    </div>
  );
}

export default ChatWindow;
