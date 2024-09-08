import Chat from './components/Chat/index.tsx';
import ChatList from './components/ChatList/index.tsx';
import styles from './app.module.css';

function App() {
  return (
    <div className={styles.container}>
      <ChatList />
      <Chat />
    </div>
  );
}

export default App;
