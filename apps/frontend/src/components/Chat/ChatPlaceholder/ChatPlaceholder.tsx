import { ChatsCircle } from '@phosphor-icons/react';
import styles from './chat-placeholder.module.css';

function ChatPlaceholder() {
  return (
    <div className={styles.container}>
      <ChatsCircle size={192} weight="fill" />
      <p className={styles.placeholderText}>Start chatting now!</p>
    </div>
  );
}

export default ChatPlaceholder;
