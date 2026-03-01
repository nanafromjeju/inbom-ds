import React, { useEffect } from 'react';
import styles from './Notification.module.scss';

interface NotificationProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  type?: 'success' | 'error';
}

const Notification = ({
  isOpen,
  onClose,
  message,
  type = 'success',
}: NotificationProps) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.alertOverlay}>
      <div className={`${styles.alertContent} ${styles[type]}`}>
        {type === 'success' ? (
          <img src="/icons/success-icon.svg" alt="Success" />
        ) : (
          <img src="/icons/alert-icon.svg" alt="Error" />
        )}

        <p className={styles.alertMessage}>{message}</p>
      </div>
    </div>
  );
};

export default Notification;
