interface MessageListProps {
  chatMessages: Array<string>;
}

function MessageList({ chatMessages }: MessageListProps) {
  return (
    chatMessages && (
      <ul>
        {chatMessages.map((msg) => (
          <li>{msg}</li>
        ))}
      </ul>
    )
  );
}

export default MessageList;
