import { ReactElement, useRef, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { ChatMessage } from '../Chat';
import { groupMessagesByTime } from '../../../helpers/chat.helpers';
import { formatDate } from '../../../helpers/date.helpers';
import styles from './message-list.module.css';
import ReceiverInvitationInfo from '../ReceiverInvitationInfo/ReceiverInvitationInfo';
import { useGetContacts } from '../../../api/contacts';

interface MessageListProps {
  chatMessages: ChatMessage[];
  isInvitationSenderMe: boolean;
  doesContactInfoShow: boolean;
  contactData?: { ownerId: number; contactId: number };
}

function MessageList({
  chatMessages,
  isInvitationSenderMe,
  doesContactInfoShow,
  contactData,
}: MessageListProps) {
  const getContactsQuery = useGetContacts(contactData, Boolean(contactData));

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
    isScrolledToBottomRef.current =
      container.scrollHeight - container.clientHeight <= container.scrollTop;
  }

  if (Boolean(contactData) && getContactsQuery.isPending) {
    return <p>loading</p>;
  }

  if (getContactsQuery.isError) {
    return <p>Error loading contact</p>;
  }

  function renderMessages() {
    const chatMessagesMap = chatMessages && groupMessagesByTime(chatMessages);

    const messageGroups: ReactElement<
      MessageGroupProps,
      typeof MessageGroup
    >[] = [];

    for (const [date, messages] of chatMessagesMap) {
      messageGroups.push(
        <MessageGroup key={uuid()} date={date} messages={messages} />
      );
    }

    return messageGroups;
  }

  function renderInvitationInfo() {
    if (doesContactInfoShow) {
      if (isInvitationSenderMe) {
        return (
          <div>
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

  return (
    <div className={styles.container} onScroll={calculateIsScrolledToBottom}>
      {renderInvitationInfo()}
      {chatMessages.length > 0 ? (
        renderMessages()
      ) : (
        // a <p> for know, probably should be some kind of <h_> tag
        <p className={styles.placeholder}>Send your first message!</p>
      )}
      <div ref={listEndRef} />
    </div>
  );
}

interface MessageGroupProps {
  date: Date;
  messages: ChatMessage[];
}

function MessageGroup({ date, messages }: MessageGroupProps) {
  return (
    <div className={styles.messageGroup}>
      <p className={styles.date}>{formatDate(date)}</p>
      {messages.map((msg) => (
        <MessageBubble key={msg.id} isMe={msg.isMe}>
          {msg.message}
        </MessageBubble>
      ))}
    </div>
  );
}

interface MessageBubbleProps {
  isMe: boolean;
  children: string;
  hasTopMargin?: boolean;
}

function MessageBubble({ children, isMe }: MessageBubbleProps) {
  const bubbleStyle = isMe ? styles.sentMessage : styles.receivedMessage;

  return <div className={`${styles.message} ${bubbleStyle}`}>{children}</div>;
}

export default MessageList;
