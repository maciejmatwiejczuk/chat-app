import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  AddressBook,
  Binoculars,
  MagnifyingGlass,
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import { users, contacts } from '../../data';
import TextInput from '../common/TextInput';
import Avatar from '../common/Avatar';
import styles from './styles.module.css';

export type OptionValue = 'my_contacts' | 'find_users';

export interface Option {
  icon: JSX.Element;
  title: string;
  value: OptionValue;
}

const options: Option[] = [
  {
    icon: <AddressBook size={24} weight="fill" />,
    title: 'My contacts',
    value: 'my_contacts',
  },
  {
    icon: <Binoculars size={24} weight="fill" />,
    title: 'Find users',
    value: 'find_users',
  },
];

function ChatList() {
  const [dropdownSelection, setDropdownSelection] = useState<OptionValue>(
    options[0].value
  );
  const [searchValue, setSearchValue] = useState('');

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
      <div className={styles.header}>
        <h2 className={styles.title}>Chats</h2>
        <div className={styles.dropdownSearchWrapper}>
          <Dropdown options={options} onSelect={setDropdownSelection} />
          <TextInput
            value={searchValue}
            setValue={setSearchValue}
            type="search"
            placeholder="search"
            iconName="MagnifyingGlass"
          />
        </div>
      </div>
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
