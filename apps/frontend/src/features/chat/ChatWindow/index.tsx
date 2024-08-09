import MessageList from '../MessageList';
import MessageInput from '../MessageInput';
import styles from './styles.module.css';

interface ChatWindowProps {
  chatMessages: Array<string>;
}

function ChatWindow({ chatMessages }: ChatWindowProps) {
  function onMessageSend() {}

  return (
    <div className={styles.container}>
      <MessageList chatMessages={chatMessages} />
      <MessageInput onMessageSend={onMessageSend} />
    </div>
  );
}

export default ChatWindow;
