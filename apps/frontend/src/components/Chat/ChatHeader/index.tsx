import Avatar from '../../common/Avatar';
import styles from './styles.module.css';

function ChatHeader() {
  return (
    <div className={styles.container}>
      <Avatar />
      <div>
        <h3 className={styles.username}>Username</h3>
        <p className={styles.status}>Online</p>
      </div>
    </div>
  );
}

export default ChatHeader;
