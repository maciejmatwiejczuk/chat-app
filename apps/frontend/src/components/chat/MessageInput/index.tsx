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
        onKeyDown={(e) => e.key === 'Enter' && onMessageSend()}
      />
      <button className={styles.sendButton} onClick={onMessageSend}>
        <PaperPlaneTilt size={24} weight="fill" />
      </button>
    </div>
  );
}

export default MessageInput;
