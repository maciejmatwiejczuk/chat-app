import { Outlet } from 'react-router-dom';
import SideMenu from '../../components/SideMenu/SideMenu.tsx';
import styles from './chat-page.module.css';
import ChatProvider from '../../context/ChatContext/ChatProvider.tsx';

function ChatPage() {
  return (
    <div className={styles.container}>
      <ChatProvider>
        <SideMenu />
        <Outlet />
      </ChatProvider>
    </div>
  );
}

export default ChatPage;
