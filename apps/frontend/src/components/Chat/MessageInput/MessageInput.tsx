import { PaperPlaneTilt } from '@phosphor-icons/react';
import styles from './message-input.module.css';

interface MessageInputProps {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  onMessageSend: () => void;
  isDisabled?: boolean | undefined;
}

function MessageInput({
  message,
  setMessage,
  onMessageSend,
  isDisabled,
}: MessageInputProps) {
  function onEnterDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!isDisabled && e.key === 'Enter') {
      onMessageSend();
    }
  }

  return (
    <div className={styles.container}>
      <input
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        className={styles.inputBox}
        type="text"
        placeholder="Write a message"
        onKeyDown={onEnterDown}
      />
      <button
        className={styles.sendButton}
        onClick={onMessageSend}
        disabled={isDisabled}
      >
        <PaperPlaneTilt size={24} weight="fill" />
      </button>
    </div>
  );
}

export default MessageInput;
