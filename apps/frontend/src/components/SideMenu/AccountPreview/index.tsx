import Avatar from '../../common/Avatar';
import styles from './styles.module.css';

function AccountPreview() {
  return (
    <div className={styles.container}>
      <div className={styles.usernameAvatarWrapper}>
        <Avatar />
        <h3 className={styles.username}>Username</h3>
      </div>
      <button className={styles.logout}>Log out</button>
    </div>
  );
}

export default AccountPreview;
