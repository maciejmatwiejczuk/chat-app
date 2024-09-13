import { User } from '@phosphor-icons/react';
import styles from './styles.module.css';

function Avatar() {
  return (
    <div className={styles.container}>
      <User size={32} weight="fill" className={styles.icon} />
    </div>
  );
}

export default Avatar;
