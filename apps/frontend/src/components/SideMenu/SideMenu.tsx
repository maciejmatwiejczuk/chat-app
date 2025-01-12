import { ChangeEvent, useState } from 'react';
import { AddressBook, Binoculars } from '@phosphor-icons/react';
import AccountPreview from './AccountPreview/AccountPreview';
import Dropdown from './Dropdown/Dropdown';
import TextInput from '../_common/TextInput/TextInput';
import ChatList from './ChatList/ChatList';
import styles from './side-menu.module.css';

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

function SideMenu() {
  const [dropdownSelection, setDropdownSelection] = useState<OptionValue>(
    options[0].value
  ); // może kontrolować query
  const [search, setSearch] = useState('');

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  return (
    <div className={styles.container}>
      <AccountPreview />
      <div className={styles.listContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>Chats</h2>
          <div className={styles.dropdownSearchWrapper}>
            <Dropdown options={options} onSelect={setDropdownSelection} />
            <TextInput
              value={search}
              onChange={onChange}
              type="search"
              placeholder="search"
              iconName="MagnifyingGlass"
            />
          </div>
        </div>
        <ChatList dropdownSelection={dropdownSelection} search={search} />
      </div>
    </div>
  );
}

export default SideMenu;
