import { ReactElement } from 'react';
import { ChatMessage } from '../../../App';
import { groupMessagesByTime } from '../../../helpers/chat.helpers';
import { formatDate } from '../../../helpers/date.helpers';
import { v4 as uuid } from 'uuid';

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

  return chatMessages.length > 0 && renderMessages();
}

interface MessageGroupProps {
  date: Date;
  messages: Array<ChatMessage>;
}

function MessageGroup({ date, messages }: MessageGroupProps) {
  return (
    <>
      <p>{formatDate(date)}</p>
      {messages.map((msg) => (
        <li key={msg.id}>{msg.message}</li>
      ))}
    </>
  );
}

export default MessageList;
