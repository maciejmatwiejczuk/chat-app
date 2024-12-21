import { useState, useEffect } from 'react';
import { socket } from '../../config/socket';
import { v4 as uuid } from 'uuid';
import { TransferredChatMessage } from '@chat-app/_common/types';
import ChatHeader from './ChatHeader/ChatHeader';
import MessageList from './MessageList/MessageList';
import MessageInput from './MessageInput/MessageInput';
import styles from './chat.module.css';
import { useMe } from '../../api/sessions';
import { useParams } from 'react-router-dom';

export interface ChatMessage {
  id: string;
  isMe: boolean;
  message: string;
  date: Date;
}

function Chat() {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    function onConnect() {
      console.log('connected');
    }

    function onDisconnect() {
      console.log('disconnected');
    }

    function onChatMessageEvent(msgObj: TransferredChatMessage) {
      setChatMessages((prev) => [
        ...prev,
        {
          id: uuid(),
          isMe: false,
          message: msgObj.message,
          date: new Date(msgObj.date),
        },
      ]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('chat_message:server', onChatMessageEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('chat_message:server', onChatMessageEvent);
    };
  }, []);

  const { data: me } = useMe();
  const { chatId } = useParams();
  const userId = Number(chatId);

  // if receiver sends message invitation gets deleted

  function onMessageSend() {
    const messageId = uuid();

    if (message) {
      setChatMessages((prev) => [
        ...prev,
        { id: messageId, isMe: true, message, date: new Date() },
      ]);

      const msg = { senderId: me.id, receiverId: Number(userId), message };

      socket.emit('chat_message:client', msg, (date: string) => {
        setChatMessages((prev) => {
          const filtered = prev.filter((message) => message.id !== messageId);
          return [
            ...filtered,
            { id: messageId, isMe: true, message, date: new Date(date) },
          ];
        });
      });
      setMessage('');
    }
  }

  return (
    <div className={styles.container}>
      <ChatHeader />
      <MessageList chatMessages={chatMessages} />
      {/* disable button when senderMessageCount === 3 (only for sender)*/}
      <MessageInput
        message={message}
        setMessage={setMessage}
        onMessageSend={onMessageSend}
      />
    </div>
  );
}

function InvitationInfo({ isSender }) {
  function onReject() {
    //delete contact
  }

  if (isSender) {
    return (
      <div>
        The user you are sending messages to is outside of your contacts. Until
        they accept you as a contact the number of messges you can send is
        limited to 3.
      </div>
    );
  }

  return (
    <div>
      <p>
        [username] is trying to contact you. Send the message to accept them as
        your contact or reject the conversation using button on the left.
      </p>
      <button onClick={onReject}>Reject</button>
    </div>
  );
}

export default Chat;

// uzytkownik wchodzi w czat
//
