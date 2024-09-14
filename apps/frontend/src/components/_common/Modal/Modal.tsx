import { PropsWithChildren } from 'react';
import { X } from '@phosphor-icons/react';
import styles from './modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function Modal({ isOpen, onClose, children }: PropsWithChildren<ModalProps>) {
  function onOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <>
      {isOpen && (
        <div className={styles.overlay} onClick={onOverlayClick}>
          <div className={styles.content}>
            <div className={styles.closeWrapper}>
              <button className={styles.close} onClick={onClose}>
                <X size={24} weight="bold" />
              </button>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
