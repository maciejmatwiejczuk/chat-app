import { Outlet } from 'react-router-dom';
import ChatList from '../../components/ChatList/index.tsx';
import styles from './styles.module.css';

function ChatPage() {
  return (
    <div className={styles.container}>
      <ChatList />
      <Outlet />
    </div>
  );
}

export default ChatPage;
