import { useGetContacts } from '../../../api/contacts';
import { useMe } from '../../../api/sessions';
import Loader from '../../_common/Loader/Loader';
import { ContactDto } from '@chat-app/_common/schemas/contacts';
import ChatItem from '../ChatItem/ChatItem';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import styles from './contacts-list.module.css';
import { useChatContext } from '../../../context/ChatContext/useChatContext';

interface ContactsListProps {
  search: string;
}

function ContactsList({ search }: ContactsListProps) {
  const { data: me } = useMe();

  if (!me) {
    throw new Error('Cannot get data of logged in user');
  }

  const getContactsQuery = useGetContacts({
    username: search,
    ownerId: me.id,
  });
  const { lastItemRef, observerRootRef } = useIntersectionObserver<
    HTMLLIElement,
    HTMLDivElement
  >(getContactsQuery);
  const { activeChat, setActiveChat } = useChatContext();

  if (getContactsQuery.isPending) {
    return (
      <div className={styles.loaderWrapper}>
        <Loader size="medium" />
      </div>
    );
  }

  if (getContactsQuery.isError) {
    return <p className={styles.placeholder}>Failed to find users</p>;
  }

  if (getContactsQuery.data.pages[0].length === 0) {
    return (
      <p className={styles.placeholder}>
        No users found matching the searched name
      </p>
    );
  }

  const chatItems = getContactsQuery.data?.pages.map(
    (contacts: ContactDto[]) => {
      return contacts.map((contact: ContactDto, i: number) => {
        if (i === contacts.length - 1) {
          return (
            <ChatItem
              userId={contact.contactId}
              invitationId={contact.invitationId}
              contactId={contact.id}
              username={contact.username}
              isOpen={activeChat?.user.id === contact.contactId}
              onOpen={() =>
                setActiveChat({
                  user: {
                    id: contact.contactId,
                    username: contact.username,
                  },
                  isContact: true,
                  invitationId: contact.invitationId,
                })
              }
              lastMessage={{
                isSenderMe: me.id === contact.lastMessageSenderId,
                message: contact.lastMessage,
              }}
              ref={lastItemRef}
            />
          );
        }

        return (
          <ChatItem
            userId={contact.contactId}
            invitationId={contact.invitationId}
            contactId={contact.id}
            username={contact.username}
            isOpen={activeChat?.user.id === contact.contactId}
            onOpen={() =>
              setActiveChat({
                user: {
                  id: contact.contactId,
                  username: contact.username,
                },
                isContact: true,
                invitationId: contact.invitationId,
              })
            }
            lastMessage={{
              isSenderMe: me.id === contact.lastMessageSenderId,
              message: contact.lastMessage,
            }}
          />
        );
      });
    }
  );

  return (
    <div className={styles.container} ref={observerRootRef}>
      <ul className={styles.list}>{chatItems}</ul>
      <div className={styles.loaderWrapper}>
        {getContactsQuery.isFetchingNextPage && <Loader size="medium" />}
      </div>
    </div>
  );
}

export default ContactsList;
