import { useState } from 'react';
import MessageList from '../MessageList';
import MessageInput from '../MessageInput';
import { ChatMessage } from '../../../App';
import styles from './styles.module.css';
import { socket } from '../../../config/socket';

interface ChatWindowProps {
  chatMessages: Array<ChatMessage>;
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

function ChatWindow({ chatMessages, setChatMessages }: ChatWindowProps) {
  const [message, setMessage] = useState('');

  function onMessageSend() {
    if (message) {
      setChatMessages((prev) => [...prev, { isMe: true, message }]);
      socket.emit('chatMessage', message);
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
