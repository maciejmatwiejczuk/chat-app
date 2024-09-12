import { useState } from 'react';
import {
  AddressBook,
  Binoculars,
  MagnifyingGlass,
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import { users, contacts } from '../../data';
import TextInput from '../common/TextInput';
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
          />
        ));
      }

      return contacts.map((contact) => (
        <ChatListItem
          socketId={contact.socketId}
          name={contact.username}
          lastMessage={contact.last_message}
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
          <ChatListItem socketId={contact.socketId} name={contact.username} />
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
}

function ChatListItem({ socketId, name, lastMessage }: ChatListItemProps) {
  return (
    <li className={styles.listItem}>
      <Link to={`chat/${socketId}`}>
        <div className={styles.imagePlaceholder}></div>
        <div>
          <h4 className={styles.chatName}>{name}</h4>
          <p className={styles.lastMessage}>{lastMessage}</p>
        </div>
      </Link>
    </li>
  );
}

export default ChatList;
