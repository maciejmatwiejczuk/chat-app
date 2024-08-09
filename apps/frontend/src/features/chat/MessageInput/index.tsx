import { PaperPlaneTilt } from '@phosphor-icons/react';
import styles from './styles.module.css';

interface MessageInputProps {
  onMessageSend: () => void;
}

function MessageInput({ onMessageSend }: MessageInputProps) {
  return (
    <div className={styles.container}>
      <input
        className={styles.inputBox}
        type="text"
        placeholder="Write a message"
      />
      <button className={styles.sendButton} onClick={onMessageSend}>
        <PaperPlaneTilt size={24} weight="fill" color="#fff" />
      </button>
    </div>
  );
}

export default MessageInput;
