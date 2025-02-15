import Avatar from '../../_common/Avatar/Avatar';
import styles from './chat-header.module.css';

interface ChatHeaderProps {
  username: string;
}

function ChatHeader({ username }: ChatHeaderProps) {
  return (
    <div className={styles.container}>
      <Avatar />
      <div>
        <h3 className={styles.username}>{username}</h3>
      </div>
    </div>
  );
}

export default ChatHeader;
