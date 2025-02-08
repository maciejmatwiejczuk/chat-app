import { UserDto } from '@chat-app/_common/schemas/users';
import { useGetUsers } from '../../../api/users';
import Loader from '../../_common/Loader/Loader';
import ChatItem from '../ChatItem/ChatItem';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import styles from './search-users-list.module.css';
import { useChatContext } from '../../../context/ChatContext/useChatContext';

interface SearchUsersListProps {
  search?: string;
}

function SearchUsersList({ search }: SearchUsersListProps) {
  const getUsersQuery = useGetUsers(search);
  const { lastItemRef, observerRootRef } = useIntersectionObserver<
    HTMLLIElement,
    HTMLDivElement
  >(getUsersQuery);
  const { activeChat, changeChat } = useChatContext();

  if (getUsersQuery.isPending) {
    return (
      <div className={styles.loaderWrapper}>
        <Loader size="medium" />
      </div>
    );
  }

  if (getUsersQuery.isError) {
    return <p className={styles.placeholder}>Failed to find users</p>;
  }

  if (getUsersQuery.data.pages[0].length === 0) {
    return (
      <p className={styles.placeholder}>
        No users found matching the searched name
      </p>
    );
  }

  const chatItems = getUsersQuery.data?.pages.map((users: UserDto[]) => {
    return users.map((user: UserDto, i: number) => {
      const isOpen = activeChat?.user.id === user.id;

      if (i === users.length - 1) {
        return (
          <ChatItem
            userId={user.id}
            username={user.username}
            isOpen={isOpen}
            onOpen={() => {
              if (!isOpen) {
                changeChat({
                  user: {
                    id: user.id,
                    username: user.username,
                  },
                  isContact: false,
                  invitationId: undefined,
                });
              }
            }}
            ref={lastItemRef}
          />
        );
      }

      return (
        <ChatItem
          userId={user.id}
          username={user.username}
          isOpen={isOpen}
          onOpen={() => {
            if (!isOpen) {
              changeChat({
                user: {
                  id: user.id,
                  username: user.username,
                },
                isContact: false,
                invitationId: undefined,
              });
            }
          }}
        />
      );
    });
  });

  return (
    <div className={styles.container} ref={observerRootRef}>
      <ul className={styles.list}>{chatItems}</ul>
      <div className={styles.loaderWrapper}>
        {getUsersQuery.isFetchingNextPage && <Loader size="medium" />}
      </div>
    </div>
  );
}

export default SearchUsersList;
