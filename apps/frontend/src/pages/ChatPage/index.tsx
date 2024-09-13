import { Outlet } from 'react-router-dom';
import SideMenu from '../../components/SideMenu/index.tsx';
import styles from './styles.module.css';

function ChatPage() {
  return (
    <div className={styles.container}>
      <SideMenu />
      <Outlet />
    </div>
  );
}

export default ChatPage;
