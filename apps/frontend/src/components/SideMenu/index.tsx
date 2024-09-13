import { useState } from 'react';
import { AddressBook, Binoculars } from '@phosphor-icons/react';
import AccountPreview from './AccountPreview';
import Dropdown from './Dropdown';
import TextInput from '../common/TextInput';
import ChatList from './ChatList';
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

function SideMenu() {
  const [dropdownSelection, setDropdownSelection] = useState<OptionValue>(
    options[0].value
  );
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className={styles.container}>
      <AccountPreview />
      <div className={styles.listContainer}>
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
        <ChatList
          dropdownSelection={dropdownSelection}
          searchValue={searchValue}
        />
      </div>
    </div>
  );
}

export default SideMenu;
