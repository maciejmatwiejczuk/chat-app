import { useState, useEffect } from 'react';
import { socket } from '../../config/socket';
import { v4 as uuid } from 'uuid';
import ChatHeader from './ChatHeader/ChatHeader';
import MessageList from './MessageList/MessageList';
import MessageInput from './MessageInput/MessageInput';
import styles from './chat.module.css';
import { useMe } from '../../api/sessions';
import { useGetInvitationById } from '../../api/invitations';
import { useQueryClient } from '@tanstack/react-query';
import { InvitationDto } from '@chat-app/_common';
import { useChatContext } from '../../context/ChatContext/useChatContext';
import { Navigate } from 'react-router-dom';
import Loader from '../_common/Loader/Loader';

export interface ChatMessage {
  id: string;
  isMe: boolean;
  message: string;
  date: Date;
}

function Chat() {
  const { data: me } = useMe();

  if (!me) {
    throw new Error('Cannot get data of logged in user');
  }

  const { activeChat, setActiveChat, setChatMessages } = useChatContext();

  const invitationQuery = useGetInvitationById(activeChat?.invitationId);
  const queryClient = useQueryClient();

  const [message, setMessage] = useState('');

  useEffect(() => {
    function onConnect() {
      console.log('connected');
    }

    function onDisconnect() {
      console.log('disconnected');
    }

    function onInvitationSent(invitation: InvitationDto) {
      console.log('[Chat.tsx]: Event invitation_sent received');

      setActiveChat((prev) => {
        if (!prev) {
          return undefined;
        }

        return {
          ...prev,
          isContact: true,
          invitationId: invitation.id,
        };
      });
      queryClient.setQueryData(['invitation', invitation.id], invitation);
    }

    function onInvitationAccepted() {
      console.log('[Chat.tsx]: Event invitation_accepted received');

      setActiveChat((prev) => {
        if (!prev) {
          return undefined;
        }

        return {
          ...prev,
          isContact: true,
          invitationId: undefined,
        };
      });
      queryClient.resetQueries({ queryKey: ['invitation'] });
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('invitation_sent', onInvitationSent);
    socket.on('invitation_accepted', onInvitationAccepted);

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('invitation_sent');
      socket.off('invitation_accepted');
    };
  }, [queryClient, setActiveChat]);

  function onMessageSend() {
    const messageId = uuid();

    if (message) {
      const msg = {
        senderId: me!.id,
        receiverId: activeChat!.user.id,
        message,
      };

      socket.emit('chat_message:client', msg, (date: string) => {
        setChatMessages((prev) => {
          const filtered = prev.filter((message) => message.id !== messageId);
          return [
            ...filtered,
            { id: messageId, isMe: true, message, date: new Date(date) },
          ];
        });
        queryClient.invalidateQueries({ queryKey: ['contacts'] });
      });
      setMessage('');
    }
  }

  if (!activeChat) {
    return <Navigate to="/" />;
  }

  if (invitationQuery.isFetching) {
    return (
      <div className={styles.loaderErrorContainer}>
        <Loader size="medium" />
      </div>
    );
  }

  if (invitationQuery.isError) {
    return (
      <div className={styles.loaderErrorContainer}>
        <p className={styles.error}>There was an error loading chat</p>
      </div>
    );
  }

  if (invitationQuery.isSuccess) {
    console.log('invitation retrieved successfully');
  }

  const isInvitationSenderMe = activeChat.isContact
    ? invitationQuery.data?.senderId === me.id
    : true;
  const doesInvitationInfoShow = activeChat.isContact
    ? Boolean(activeChat.invitationId)
    : true;
  const contactData = activeChat.isContact
    ? { ownerId: me.id, contactId: activeChat.user.id }
    : undefined;

  return (
    <div className={styles.container}>
      <ChatHeader username={activeChat.user.username} />
      <MessageList
        myId={me.id}
        otherUserId={activeChat.user.id}
        isInvitationSenderMe={isInvitationSenderMe}
        doesContactInfoShow={doesInvitationInfoShow}
        contactData={contactData}
      />
      <MessageInput
        message={message}
        setMessage={setMessage}
        onMessageSend={onMessageSend}
        isDisabled={invitationQuery.data?.senderId === me.id}
      />
    </div>
  );
}

export default Chat;
