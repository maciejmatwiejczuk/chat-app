import { PaperPlaneTilt } from '@phosphor-icons/react';
import styles from './styles.module.css';

function MessageInput() {
  return (
    <div className={styles.container}>
      <input
        className={styles.inputBox}
        type="text"
        placeholder="Write a message"
      />
      <button className={styles.sendButton}>
        <PaperPlaneTilt size={24} weight="fill" color="#fff" />
      </button>
    </div>
  );
}

export default MessageInput;
