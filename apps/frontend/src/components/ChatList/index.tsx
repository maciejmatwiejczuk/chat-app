import { AddressBook, Binoculars } from '@phosphor-icons/react';
import styles from './styles.module.css';
import { useState } from 'react';
import Dropdown from './Dropdown';
import Search from './Search';

const options = [
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
  const [dropdownSelection, setDropdownSelection] = useState(options[0].value);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Chats</h2>
        <div className={styles.dropdownSearchWrapper}>
          <Dropdown options={options} onSelect={setDropdownSelection} />
          <Search />
        </div>
      </div>
      <ul className={styles.list}>
        <ChatListItem name="First Last" lastMessage="Last message" />
        <ChatListItem name="First Last" lastMessage="Last message" />
        <ChatListItem name="First Last" lastMessage="Last message" />
        <ChatListItem name="First Last" lastMessage="Last message" />
        <ChatListItem name="First Last" lastMessage="Last message" />
        <ChatListItem name="First Last" lastMessage="Last message" />
        <ChatListItem name="First Last" lastMessage="Last message" />
        <ChatListItem name="First Last" lastMessage="Last message" />
        <ChatListItem name="First Last" lastMessage="Last message" />
        <ChatListItem name="First Last" lastMessage="Last message" />
        <ChatListItem name="First Last" lastMessage="Last message" />
        <ChatListItem name="First Last" lastMessage="Last message" />
        <ChatListItem name="First Last" lastMessage="Last message" />
      </ul>
    </div>
  );
}

interface ChatListItemProps {
  name: string;
  lastMessage: string;
}

function ChatListItem({ name, lastMessage }: ChatListItemProps) {
  return (
    <li className={styles.listItem}>
      <button type="button">
        <div className={styles.imagePlaceholder}></div>
        <div>
          <h4 className={styles.chatName}>{name}</h4>
          <p className={styles.lastMessage}>{lastMessage}</p>
        </div>
      </button>
    </li>
  );
}

export default ChatList;
