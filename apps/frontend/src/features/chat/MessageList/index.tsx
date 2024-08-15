import { ReactElement } from 'react';
import { ChatMessage } from '../../../App';
import { groupMessagesByTime } from '../../../helpers/chat.helpers';
import { formatDate } from '../../../helpers/date.helpers';
import { v4 as uuid } from 'uuid';
import styles from './styles.module.css';

interface MessageListProps {
  chatMessages: Array<ChatMessage>;
}

function MessageList({ chatMessages }: MessageListProps) {
  function renderMessages() {
    const chatMessagesMap = chatMessages && groupMessagesByTime(chatMessages);

    const messageGroups: Array<
      ReactElement<MessageGroupProps, typeof MessageGroup>
    > = [];

    for (const [date, messages] of chatMessagesMap) {
      messageGroups.push(
        <MessageGroup key={uuid()} date={date} messages={messages} />
      );
    }

    return messageGroups;
  }

  return (
    <div className={styles.container}>
      {chatMessages.length > 0 ? (
        renderMessages()
      ) : (
        // a <p> for know, probably should be some kind of <h_> tag
        <p className={styles.placeholder}>Write your first message!</p>
      )}
    </div>
  );
}

interface MessageGroupProps {
  date: Date;
  messages: Array<ChatMessage>;
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
