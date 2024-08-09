import MessageInput from '../MessageInput';
import styles from './styles.module.css';

function ChatWindow() {
  return (
    <div className={styles.container}>
      <MessageInput />
    </div>
  );
}

export default ChatWindow;
