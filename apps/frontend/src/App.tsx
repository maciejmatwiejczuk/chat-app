import Chat from './components/chat/index.tsx';
import List from './components/List/index.tsx';
import styles from './app.module.css';

function App() {
  return (
    <div className={styles.container}>
      <List />
      <Chat />
    </div>
  );
}

export default App;
