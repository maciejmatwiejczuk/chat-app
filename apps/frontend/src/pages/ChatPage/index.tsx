import Chat from '../../components/Chat/index.tsx';
import ChatList from '../../components/ChatList/index.tsx';
import styles from './styles.module.css';

function ChatPage() {
  return (
    <div className={styles.container}>
      <ChatList />
      <Chat />
    </div>
  );
}

export default ChatPage;
