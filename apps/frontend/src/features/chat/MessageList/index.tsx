import { ChatMessage } from '../../../App';

interface MessageListProps {
  chatMessages: Array<ChatMessage>;
}

function MessageList({ chatMessages }: MessageListProps) {
  return (
    chatMessages && (
      <ul>
        {chatMessages.map((msgObj) => (
          <li>{msgObj.message}</li>
        ))}
      </ul>
    )
  );
}

export default MessageList;
