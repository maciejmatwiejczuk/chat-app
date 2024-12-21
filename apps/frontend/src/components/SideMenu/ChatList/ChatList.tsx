import { useParams, Link } from 'react-router-dom';
import { MagnifyingGlass } from '@phosphor-icons/react';
import Avatar from '../../_common/Avatar/Avatar';
import type { OptionValue } from '../SideMenu';
import styles from './chat-list.module.css';
import { useGetUsers } from '../../../api/users';
import { forwardRef, useCallback, useRef } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';
import Loader from '../../_common/Loader/Loader';
import { useGetContacts } from '../../../api/contacts';
import { useMe } from '../../../api/sessions';
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import { Contact } from '@chat-app/_common/schemas/contacts';

interface ChatListProps {
  dropdownSelection: OptionValue;
  searchValue: string;
}

function ChatList({ dropdownSelection, searchValue }: ChatListProps) {
  const debouncedSearch = useDebounce(searchValue, 500);

  function renderItems() {
    if (dropdownSelection === 'my_contacts') {
      return <ContactsList searchValue={debouncedSearch} />;
    } else {
      if (debouncedSearch) {
        return <SearchUsersList searchValue={debouncedSearch} />;
      }

      return (
        <p className={styles.placeholder}>
          Use{' '}
          <MagnifyingGlass weight="bold" className={styles.placeholderIcon} />{' '}
          <span>search</span> above to find users
        </p>
      );
    }
  }

  return renderItems();
}

interface ContactsListProps {
  searchValue?: string;
}

function ContactsList({ searchValue }: ContactsListProps) {
  const { data: me } = useMe();
  const getContactsQuery = useGetContacts({
    username: searchValue,
    ownerId: me.id,
  });

  return <InfiniteChatList query={getContactsQuery} />;
}

interface SearchUsersListProps {
  searchValue?: string;
}

function SearchUsersList({ searchValue }: SearchUsersListProps) {
  const getUsersQuery = useGetUsers(searchValue);

  return <InfiniteChatList query={getUsersQuery} />;
}

interface InfiniteChatListProps {
  query: UseInfiniteQueryResult<InfiniteData<Contact[]>>;
}

function InfiniteChatList({ query }: InfiniteChatListProps) {
  const intObserver = useRef<IntersectionObserver>();
  const observerRootRef = useRef<HTMLDivElement>(null);
  const lastUserRef = useCallback(
    (item: HTMLLIElement) => {
      if (query.isFetchingNextPage) {
        return;
      }

      if (intObserver.current) {
        intObserver.current.disconnect();
      }

      intObserver.current = new IntersectionObserver(
        (items) => {
          if (items[0].isIntersecting && query.hasNextPage) {
            query.fetchNextPage();
          }
        },
        {
          root: observerRootRef.current,
        }
      );

      if (item) intObserver.current.observe(item);
    },
    [query]
  );

  const { chatId } = useParams();

  function isChatOpen(id: number) {
    return Number(chatId) === id;
  }

  if (query.isPending) {
    return (
      <div className={styles.loaderWrapper}>
        <Loader size="medium" />
      </div>
    );
  }

  if (query.isError) {
    return <p className={styles.placeholder}>Failed to find users</p>;
  }

  if (query.data.pages[0].length === 0) {
    return (
      <p className={styles.placeholder}>
        No users found matching the searched name
      </p>
    );
  }

  const items = query.data?.pages.map((users: Contact[]) => {
    return users.map((user: Contact, i: number) => {
      if (i === users.length - 1) {
        return (
          <ChatListItem
            socketId={user.id}
            name={user.username}
            isOpen={isChatOpen(user.id)}
            ref={lastUserRef}
          />
        );
      }

      return (
        <ChatListItem
          socketId={user.id}
          name={user.username}
          isOpen={isChatOpen(user.id)}
        />
      );
    });
  });

  return (
    <div className={styles.container} ref={observerRootRef}>
      <ul className={styles.list}>{items}</ul>
      <div className={styles.loaderWrapper}>
        {query.isFetchingNextPage && <Loader size="medium" />}
      </div>
    </div>
  );
}

interface ChatListItemProps {
  socketId: number;
  name: string;
  lastMessage?: string;
  isOpen: boolean;
}

const ChatListItem = forwardRef<HTMLLIElement, ChatListItemProps>(
  ({ socketId, name, lastMessage, isOpen }: ChatListItemProps, ref) => {
    const listItemStyle = isOpen
      ? `${styles.listItem} ${styles.listItemOpen}`
      : styles.listItem;

    return (
      <li className={listItemStyle} ref={ref} key={socketId}>
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
);

export default ChatList;
