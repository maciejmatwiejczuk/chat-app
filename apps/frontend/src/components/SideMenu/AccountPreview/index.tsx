import { useState } from 'react';
import Avatar from '../../common/Avatar';
import Modal from '../../common/Modal';
import styles from './styles.module.css';

function AccountPreview() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.usernameAvatarWrapper}>
        <Avatar />
        <h3 className={styles.username}>Username</h3>
      </div>
      <button className={styles.logout} onClick={openModal}>
        Log out
      </button>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2 className={styles.modalTitle}>Log out</h2>
          <p className={styles.modalText}>Are you sure you want to log out?</p>
          <div className={styles.buttonWrapper}>
            <button className={styles.buttonNo}>No</button>
            <button className={styles.buttonYes}>Yes</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default AccountPreview;
