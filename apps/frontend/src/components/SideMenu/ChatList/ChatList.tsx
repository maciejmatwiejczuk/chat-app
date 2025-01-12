import { MagnifyingGlass } from '@phosphor-icons/react';
import type { OptionValue } from '../SideMenu';
import styles from './chat-list.module.css';
import { useDebounce } from '../../../hooks/useDebounce';
import ContactsList from '../ContactsList/ContactsList';
import SearchUsersList from '../SearchUsersList/SearchUsersList';

interface ChatListProps {
  dropdownSelection: OptionValue;
  search: string;
}

function ChatList({ dropdownSelection, search }: ChatListProps) {
  const debouncedSearch = useDebounce(search, 500);

  if (dropdownSelection === 'my_contacts') {
    return <ContactsList search={debouncedSearch} />;
  } else {
    if (debouncedSearch) {
      return <SearchUsersList search={debouncedSearch} />;
    }

    return (
      <p className={styles.placeholder}>
        Use <MagnifyingGlass weight="bold" className={styles.placeholderIcon} />{' '}
        <span>search</span> above to find users
      </p>
    );
  }
}

export default ChatList;
