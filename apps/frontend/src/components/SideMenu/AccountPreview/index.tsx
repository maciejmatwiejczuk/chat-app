import { useState } from 'react';
import Avatar from '../../common/Avatar';
import Modal from '../../common/Modal';
import Button from '../../common/Button';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

function AccountPreview() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function onModalYesClick() {
    navigate('/sign-in');
  }

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.usernameAvatarWrapper}>
        <Avatar />
        <h3 className={styles.username}>Username</h3>
      </div>
      <Button title="Log out" onClick={openModal} size="small" type="fill" />
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2 className={styles.modalTitle}>Log out</h2>
          <p className={styles.modalText}>Are you sure you want to log out?</p>
          <div className={styles.buttonWrapper}>
            <Button title="No" onClick={closeModal} size="small" type="fill" />
            <Button
              title="Yes"
              onClick={onModalYesClick}
              size="small"
              type="outline"
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

export default AccountPreview;
