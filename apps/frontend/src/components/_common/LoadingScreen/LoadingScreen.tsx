import Loader from '../Loader/Loader';
import styles from './loading-screen.module.css';

function LoadingScreen() {
  return (
    <div className={styles.container}>
      <div>
        <Loader />
        <p className={styles.label}>Loading...</p>
      </div>
    </div>
  );
}

export default LoadingScreen;
