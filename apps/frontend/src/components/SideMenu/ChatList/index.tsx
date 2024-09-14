import { useParams, Link } from 'react-router-dom';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { contacts, users } from '../../../data';
import Avatar from '../../common/Avatar';
import type { OptionValue } from '..';
import styles from './styles.module.css';

interface ChatListProps {
  dropdownSelection: OptionValue;
  searchValue: string;
}

function ChatList({ dropdownSelection, searchValue }: ChatListProps) {
  const { chatId } = useParams();

  function isChatOpen(id: number) {
    return Number(chatId) === id;
  }

  function renderItems() {
    if (dropdownSelection === 'my_contacts') {
      if (searchValue) {
        const foundContacts = contacts.filter((contact) =>
          contact.username.toLowerCase().includes(searchValue.toLowerCase())
        );

        return foundContacts.map((contact) => (
          <ChatListItem
            socketId={contact.socketId}
            name={contact.username}
            lastMessage={contact.last_message}
            isOpen={isChatOpen(contact.socketId)}
          />
        ));
      }

      return contacts.map((contact) => (
        <ChatListItem
          socketId={contact.socketId}
          name={contact.username}
          lastMessage={contact.last_message}
          isOpen={isChatOpen(contact.socketId)}
        />
      ));
    } else {
      if (searchValue) {
        const foundUsers = users
          .filter((user) => !contacts.find((contact) => contact.id === user.id))
          .filter((user) =>
            user.username.toLowerCase().includes(searchValue.toLowerCase())
          );

        return foundUsers.map((contact) => (
          <ChatListItem
            socketId={contact.socketId}
            name={contact.username}
            isOpen={isChatOpen(contact.socketId)}
          />
        ));
      }

      return null;
    }
  }

  return (
    <div className={styles.container}>
      {dropdownSelection === 'find_users' && !searchValue ? (
        <p className={styles.placeholder}>
          Use{' '}
          <MagnifyingGlass weight="bold" className={styles.placeholderIcon} />{' '}
          <span>search</span> above to find users
        </p>
      ) : (
        <ul className={styles.list}>{renderItems()}</ul>
      )}
    </div>
  );
}

interface ChatListItemProps {
  socketId: number;
  name: string;
  lastMessage?: string;
  isOpen: boolean;
}

function ChatListItem({
  socketId,
  name,
  lastMessage,
  isOpen,
}: ChatListItemProps) {
  const listItemStyle = isOpen
    ? `${styles.listItem} ${styles.listItemOpen}`
    : styles.listItem;

  return (
    <li className={listItemStyle}>
      <Link to={`chat/${socketId}`}>
        <Avatar />
        <div>
          <h4 className={styles.chatName}>{name}</h4>
          <p className={styles.lastMessage}>{lastMessage}</p>
        </div>
      </Link>
    </li>
  );
}

export default ChatList;
