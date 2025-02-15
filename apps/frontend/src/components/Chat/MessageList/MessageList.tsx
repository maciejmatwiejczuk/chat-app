import { ReactElement, useRef, useEffect, forwardRef } from 'react';
import { v4 as uuid } from 'uuid';
import { groupMessagesByTime } from '../../../helpers/chat.helpers';
import { formatDate } from '../../../helpers/date.helpers';
import styles from './message-list.module.css';
import ReceiverInvitationInfo from '../ReceiverInvitationInfo/ReceiverInvitationInfo';
import { useGetContacts } from '../../../api/contacts';
import { useGetChatMessages } from '../../../api/messages';
import { useChatContext } from '../../../context/ChatContext/useChatContext';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import Loader from '../../_common/Loader/Loader';
import classNames from 'classnames';
import { HandWaving } from '@phosphor-icons/react';

interface MessageListProps {
  myId: number;
  otherUserId: number;
  isInvitationSenderMe: boolean;
  doesContactInfoShow: boolean;
  contactData?: { ownerId: number; contactId: number };
}

function MessageList({
  myId,
  otherUserId,
  isInvitationSenderMe,
  doesContactInfoShow,
  contactData,
}: MessageListProps) {
  const getContactsQuery = useGetContacts(contactData, Boolean(contactData));
  const getChatMessagesQuery = useGetChatMessages(myId, otherUserId);

  const { chatMessages, setChatMessages } = useChatContext();

  useEffect(() => {
    if (getChatMessagesQuery.isSuccess) {
      const messages = getChatMessagesQuery.data.pages
        .flat()
        .reverse()
        .map((msg) => ({
          id: uuid(),
          isMe: msg.senderId === myId,
          message: msg.message,
          date: new Date(msg.date),
        }));

      setChatMessages(messages);
    }
  }, [
    getChatMessagesQuery.isSuccess,
    getChatMessagesQuery.data,
    myId,
    setChatMessages,
  ]);

  const { lastItemRef, observerRootRef } = useIntersectionObserver<
    HTMLDivElement,
    HTMLDivElement
  >(getChatMessagesQuery);

  const listEndRef = useRef<HTMLDivElement>(null);
  const isScrolledToBottomRef = useRef(true);

  useEffect(() => {
    if (isScrolledToBottomRef.current) {
      listEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  function calculateIsScrolledToBottom(
    e: React.UIEvent<HTMLDivElement, UIEvent>
  ) {
    const container = e.target as HTMLDivElement;
    isScrolledToBottomRef.current = -container.scrollTop <= 150;
  }

  if (
    (Boolean(contactData) && getContactsQuery.isPending) ||
    getChatMessagesQuery.isPending
  ) {
    return (
      <div className={styles.loaderErrorContainer}>
        <Loader size="medium" />
      </div>
    );
  }

  if (getContactsQuery.isError || getChatMessagesQuery.isError) {
    return (
      <div className={styles.loaderErrorContainer}>
        <p className={styles.error}>There was an error loading chat</p>
      </div>
    );
  }

  function renderMessages() {
    const chatMessagesMap = chatMessages && groupMessagesByTime(chatMessages);

    const messageGroups: ReactElement[] = [];

    let isOldestGroup = true;
    for (const [date, messages] of chatMessagesMap) {
      messageGroups.push(
        <div className={styles.messageGroup}>
          <p className={styles.date}>{formatDate(date)}</p>
          {messages.map((msg, i) => {
            if (i === 0 && isOldestGroup) {
              return (
                <MessageBubble ref={lastItemRef} key={msg.id} isMe={msg.isMe}>
                  {msg.message}
                </MessageBubble>
              );
            }

            return (
              <MessageBubble key={msg.id} isMe={msg.isMe}>
                {msg.message}
              </MessageBubble>
            );
          })}
        </div>
      );
      isOldestGroup = false;
    }

    return messageGroups.reverse();
  }

  function renderInvitationInfo() {
    if (doesContactInfoShow) {
      if (isInvitationSenderMe) {
        return (
          <div className={styles.invitationInfo}>
            The user you are sending messages to is outside of your contacts.
            Until they accept you as a contact you can send them only one
            message.
          </div>
        );
      } else if (contactData && getContactsQuery.isSuccess) {
        return (
          <ReceiverInvitationInfo
            contactId={getContactsQuery.data.pages[0][0].id}
          />
        );
      }
    } else {
      return null;
    }
  }

  const messageContainerStyle = classNames(styles.messageContainer, {
    [styles.messageContainerEmpty]: chatMessages.length <= 0,
  });

  return (
    <div className={styles.container}>
      {renderInvitationInfo()}
      {getChatMessagesQuery.isFetchingNextPage && (
        <div className={styles.loaderWrapper}>
          <Loader size="medium" />
        </div>
      )}
      <div
        onScroll={calculateIsScrolledToBottom}
        ref={observerRootRef}
        className={messageContainerStyle}
      >
        {chatMessages.length > 0 ? (
          renderMessages()
        ) : (
          <div className={styles.placeholderWrapper}>
            <HandWaving size={64} weight="fill" />
            <p className={styles.placeholder}>Write your first message!</p>
          </div>
        )}
      </div>
      <div ref={listEndRef} />
    </div>
  );
}

interface MessageBubbleProps {
  isMe: boolean;
  children: string;
  hasTopMargin?: boolean;
}

const MessageBubble = forwardRef<HTMLDivElement, MessageBubbleProps>(
  ({ children, isMe }: MessageBubbleProps, ref) => {
    const bubbleStyle = isMe ? styles.sentMessage : styles.receivedMessage;

    return (
      <div className={`${styles.message} ${bubbleStyle}`} ref={ref}>
        {children}
      </div>
    );
  }
);

export default MessageList;
