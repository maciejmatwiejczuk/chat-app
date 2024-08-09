import { useState } from 'react';
import MessageList from '../MessageList';
import MessageInput from '../MessageInput';
import styles from './styles.module.css';
import { socket } from '../../../config/socket';

interface ChatWindowProps {
  chatMessages: Array<string>;
}

function ChatWindow({ chatMessages }: ChatWindowProps) {
  const [message, setMessage] = useState('');

  function onMessageSend() {
    if (message) {
      socket.emit('chat-message', message);
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
