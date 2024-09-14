import { Outlet } from 'react-router-dom';
import SideMenu from '../../components/SideMenu/SideMenu.tsx';
import styles from './chat-page.module.css';

function ChatPage() {
  return (
    <div className={styles.container}>
      <SideMenu />
      <Outlet />
    </div>
  );
}

export default ChatPage;
