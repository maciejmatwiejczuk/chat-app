import { PaperPlaneTilt } from '@phosphor-icons/react';
import styles from './styles.module.css';

interface MessageInputProps {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  onMessageSend: () => void;
}

function MessageInput({
  message,
  setMessage,
  onMessageSend,
}: MessageInputProps) {
  return (
    <div className={styles.container}>
      <input
        onChange={(e) => setMessage(e.target.value)}
        value={message}
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
