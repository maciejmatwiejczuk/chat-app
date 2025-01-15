import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../_common/Avatar/Avatar';
import styles from './chat-item.module.css';

interface ChatItemProps {
  userId: number;
  invitationId?: number;
  contactId?: number;
  username: string;
  lastMessage?: {
    isSenderMe: boolean;
    message: string;
  };
  isOpen: boolean;
  onOpen: () => void;
}

const ChatItem = forwardRef<HTMLLIElement, ChatItemProps>(
  ({ userId, username, lastMessage, isOpen, onOpen }: ChatItemProps, ref) => {
    const listItemStyle = isOpen
      ? `${styles.listItem} ${styles.listItemOpen}`
      : styles.listItem;

    return (
      <li className={listItemStyle} ref={ref} key={userId} onClick={onOpen}>
        <Link to={`chat/${userId}`}>
          <Avatar />
          <div>
            <h4 className={styles.chatName}>{username}</h4>
            {lastMessage && (
              <p className={styles.lastMessage}>
                {lastMessage.isSenderMe
                  ? `You: ${lastMessage.message}`
                  : lastMessage.message}
              </p>
            )}
          </div>
        </Link>
      </li>
    );
  }
);

export default ChatItem;
