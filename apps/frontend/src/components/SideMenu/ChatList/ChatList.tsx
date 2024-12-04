import { useParams, Link } from 'react-router-dom';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { contacts } from '../../../data';
import Avatar from '../../_common/Avatar/Avatar';
import type { OptionValue } from '../SideMenu';
import styles from './chat-list.module.css';
import { useGetUsers } from '../../../api/users';
import { forwardRef, useCallback, useRef } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';
import Loader from '../../_common/Loader/Loader';

interface ChatListProps {
  dropdownSelection: OptionValue;
  searchValue: string;
}

function ChatList({ dropdownSelection, searchValue }: ChatListProps) {
  const { chatId } = useParams();

  function isChatOpen(id: number) {
    return Number(chatId) === id;
  }

  const debouncedSearch = useDebounce(searchValue, 500);

  function renderItems() {
    if (dropdownSelection === 'my_contacts') {
      if (debouncedSearch) {
        const foundContacts = contacts.filter((contact) =>
          contact.username.toLowerCase().includes(debouncedSearch.toLowerCase())
        );

        return (
          <div className={styles.container}>
            <ul className={styles.list}>
              {foundContacts.map((contact) => (
                <ChatListItem
                  socketId={contact.socketId}
                  name={contact.username}
                  lastMessage={contact.last_message}
                  isOpen={isChatOpen(contact.socketId)}
                />
              ))}
            </ul>
          </div>
        );
      }

      return (
        <div className={styles.container}>
          <ul className={styles.list}>
            {contacts.map((contact) => (
              <ChatListItem
                socketId={contact.socketId}
                name={contact.username}
                lastMessage={contact.last_message}
                isOpen={isChatOpen(contact.socketId)}
              />
            ))}
          </ul>
        </div>
      );
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

interface SearchUsersListProps {
  searchValue?: string;
}

function SearchUsersList({ searchValue }: SearchUsersListProps) {
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isPending,
    isError,
  } = useGetUsers(searchValue);

  const intObserver = useRef<IntersectionObserver>();
  const observerRootRef = useRef<HTMLDivElement>(null);
  const lastUserRef = useCallback(
    (user: HTMLLIElement) => {
      if (isFetchingNextPage) {
        return;
      }

      if (intObserver.current) {
        intObserver.current.disconnect();
      }

      intObserver.current = new IntersectionObserver(
        (users) => {
          console.log(users);
          if (users[0].isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        },
        {
          root: observerRootRef.current,
        }
      );

      if (user) intObserver.current.observe(user);
    },
    [fetchNextPage, isFetchingNextPage, hasNextPage, observerRootRef]
  );

  const { chatId } = useParams();

  function isChatOpen(id: number) {
    return Number(chatId) === id;
  }

  if (isPending) {
    return (
      <div className={styles.loaderWrapper}>
        <Loader size="medium" />
      </div>
    );
  }

  if (isError) {
    return <p className={styles.placeholder}>Failed to find users</p>;
  }

  if (data.pages[0].users.length === 0) {
    return (
      <p className={styles.placeholder}>
        No users found matching the searched name
      </p>
    );
  }

  const items = data?.pages.map(({ users }) => {
    return users.map((user: { id: number; username: string }, i: number) => {
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
        {isFetchingNextPage && <Loader size="medium" />}
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
